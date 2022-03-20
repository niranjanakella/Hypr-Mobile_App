import React, { useEffect, useLayoutEffect } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    Keyboard,
    FlatList,
    ScrollView,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import * as NavigationService from '../../../navigation/NavigationService';
import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import {
    setProductType,
    setVariant,
    getFlashProduct,
    getBestSellingProduct,
    getSeasonTopProduct,
    getTrendingProduct,
    getCategory,
    setProductDetails,
    getTopPickOnProduct,
    getCartList,
    getProductByCategoryId,
    getProductByKeyword,
    getAllProducts
} from '../../../actions/marketPlace';
import { setTabType } from '../../../actions/auth';
import { calculatePrice } from '../../../utils/CalculatePrice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Placeholder } from '../../../components/placeholder';

const testImage = "https://homepages.cae.wisc.edu/~ece533/images/airplane.png";
const MarketHome = (props) => {
    const [state, setState] = React.useState({
        image: testImage,
        searchValue: "",
        currentPage:1,
        refreshing:false
    })
    useLayoutEffect(() => {

        props.dispatch(getAllProducts(state.currentPage))
        
        
        const subscribe = props.navigation.addListener('focus', () => {
            props.dispatch(setTabType("market"))
        })
        return () => {
            subscribe
        }
    }, [])
    const renderCategory = ({ item, index }) => {
        if (item.t_CategoryTypes === 0) {
            return (
                <View
                    style={{
                        //width: "33%",
                        marginVertical: constants.vh(15),
                        marginHorizontal: constants.vw(5),

                    }}
                >
                    <Components.CategoryCardMain
                        onPress={() => props.dispatch(getProductByCategoryId(item._id, item.f_catname))}
                        title={item.f_catname}
                        image={item.f_img}
                    />
                </View>
            )
        }
    }
    const renderAllProducts = ({ item, index }) => {
        
        
            return (
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                    <Components.CategoryCard
                        image={{ uri: item.productImage }}
                        title={item.productNameEn}
                        off={`${props.auth.currency_symbol} ${calculatePrice(item.sellPrice)}`}
                        originalPrice={`${props.auth.currency_symbol} ${calculatePrice(item.sellPrice)}`}
                        onPress={() => { props.dispatch(setVariant(item))}}                                                                                    
                    />
                </View>                 

            )       
    }
    
    const loadMore = async (allProducts) => { 
        
        await props.dispatch(getAllProducts(state.currentPage + 1,allProducts)).then(async()=>{

            return new Promise(function (resolve) {
                
                resolve(setState( (prevState) => ({...prevState,refreshing:false})))
            });
            
       })            
    }

    const renderEmptyComponent = ()=>(
        <Placeholder/>
    )

    const renderFooter = ()=>(
        state.refreshing ?
        <Placeholder/>
        : null
    )
    

    const setProduct = (type) => {
        const payload = {
            productType: type
        }
        props.dispatch(setProductType(payload))
    }
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={constants.Colors.primary} />
            <SafeAreaView
                style={styles.container}
            >
                <Components.HeaderWithSearch
                    showDrawer={true}
                    isCartCount={true}
                    onPressInput={() => { NavigationService.navigate(constants.ScreensName.SearchProduct.name, null) }}
                    cartCount={props.market.cartList.length}
                    onPressCart={() => { NavigationService.navigate(constants.ScreensName.Cart.name, null) }}
                    onPressDrawer={() => { props.navigation.toggleDrawer() }}
                    onPressWishlist={() => NavigationService.navigate(constants.ScreensName.WishList.name, null)}
                />
                <TouchableOpacity
                    onPress={() => { NavigationService.navigate(constants.ScreensName.SearchProduct.name, null) }}
                    style={{
                        marginTop: constants.vh(10),
                        paddingVertical: constants.vh(10),
                        borderWidth: 0.5,
                        borderColor: "grey",
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        marginHorizontal: 15,
                        flexDirection:'row'
                    }}
                >   
                    <FontAwesome
                        name={'search'}
                        size={20}
                        color={constants.Colors.blue_primary}
                    />
                    <Text style={{ color: "grey" }}>  Search Products</Text>
                </TouchableOpacity>
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: constants.Colors.white
                    }}
                >
                    {/* {
                        props.market.categoryList.length > 0 &&
                        <>
                            <View
                                style={styles.viewAllContainer}
                            >
                                <Text style={styles.text16bold}>Category</Text>
                            </View>
                            <View
                                style={{
                                    paddingHorizontal: 15,
                                    marginTop: constants.vh(10)
                                }}
                            >
                                <FlatList
                                    data={props.market.categoryList}
                                    renderItem={renderCategory}
                                    keyExtractor={(item, index) => index.toString()}
                                    initialNumToRender={5}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </>
                    } */}


                
                        <>
                            
                            <View style={{ marginTop: constants.vh(15),flex:1 }}>
                                <FlatList
                                    numColumns={2}
                                    data={props.market.allProducts}
                                    ListEmptyComponent={renderEmptyComponent}
                                    refreshing={state.refreshing}
                                    onRefresh={()=>{
                                        props.dispatch(getAllProducts(1)).then( async()=>{
                                            await setState( (prevState) => ({...prevState,currentPage:1}));
                                        })
                                    
                                    }}
                                    renderItem={renderAllProducts}                                    
                                    keyExtractor={(item, index) => index}                                           
                                    // extraData={props.market.allProducts}


                                    style={{height:constants.height_dim_percent * 80,flexGrow:0}}
                                    contentContainerStyle={{paddingBottom:constants.height_dim_percent * 20,flexGrow:0}}
                                    onEndReachedThreshold={0.1} // so when you are at 5 pixel from the bottom react run onEndReached function
                                    onEndReached={async ({distanceFromEnd}) => {                                                             
                                        
                                        if (distanceFromEnd > 0 ) 
                                        {   
                                            
                                            await setState( (prevState) => ({...prevState,currentPage:prevState.currentPage + 1}));
                                            await setState( (prevState) => ({...prevState,refreshing:true}));
                                            await loadMore(props.market.allProducts);
                                        }
                                    }}                             
                                    ListFooterComponent={renderFooter}
                                />
                            </View>
                        </>
               



                    {/* <Components.ViewAllCard
                        title="Recently Viewed Products"
                        buttonTitle="View all"
                        onPress={() => setProduct("Recently Viewed Products")}
                    />


                    <View style={{ marginTop: constants.vh(10) }}>
                        <FlatList
                            horizontal={true}
                            data={state.categoryArray}
                            renderItem={renderRecentlyViewed}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View> */}

                </ScrollView>
                <Components.ProgressView
                    isProgress={props.auth.isLoading}
                    title="Loading..."
                />
            </SafeAreaView>
        </>
    )
}
function mapStateToProps(state) {
    const { auth, market } = state
    return {
        auth,
        market
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketHome)