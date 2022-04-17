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
    getFlashProduct,
    getBestSellingProduct,
    getSeasonTopProduct,
    getTrendingProduct,
    getCategory,
    setProductDetails,
    getTopPickOnProduct,
    getCartList,
    getProductByCategoryId,
    getProductByKeyword
} from '../../../actions/marketPlace';
import { setTabType } from '../../../actions/auth';
import { calculatePrice } from '../../../utils/CalculatePrice';

const testImage = "https://homepages.cae.wisc.edu/~ece533/images/airplane.png";
const MarketHome = (props) => {
    const [state, setState] = React.useState({
        image: testImage,
        searchValue: ""
    })
    useLayoutEffect(() => {

        props.dispatch(getCartList())
        props.dispatch(getFlashProduct())
        props.dispatch(getBestSellingProduct())
        props.dispatch(getSeasonTopProduct())
        props.dispatch(getTrendingProduct())
        props.dispatch(getTopPickOnProduct())
        props.dispatch(getCategory())
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
    const renderFlashSale = ({ item, index }) => {
        if (index < 4) {
            return (
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                    <Components.CategoryCard
                        image={{ uri: item.f_img1 }}
                        title={item.f_productname}
                        off={`${props.auth.currency_symbol} ${calculatePrice(item.f_product_offer_price)}`}
                        originalPrice={`${props.auth.currency_symbol} ${calculatePrice(item.f_product_price)}`}
                        onPress={() => { props.dispatch(setProductDetails(item))}}                            

                            
                            
                    />
                </View>
            )
        }
    }
    const renderTopPick = ({ item, index }) => {
        if (index < 4) {
            return (
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                    <Components.CategoryCard
                        image={{ uri: item.f_img1 }}
                        title={item.f_productname}
                        off={`${props.auth.currency_symbol} ${calculatePrice(item.f_product_offer_price)}`}
                        originalPrice={`${props.auth.currency_symbol} ${calculatePrice(item.f_product_price)}`}
                        onPress={() => props.dispatch(setProductDetails(item))}
                    />
                </View>
            )
        }
    }
    const renderBestSelling = ({ item, index }) => {
        if (index < 4) {
            return (
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                    <Components.CategoryCard
                        image={{ uri: item.f_img1 }}
                        title={item.f_productname}
                        off={`${props.auth.currency_symbol} ${calculatePrice(item.f_product_offer_price)}`}
                        originalPrice={`${calculatePrice(item.f_product_price)}`}
                        onPress={() => props.dispatch(setProductDetails(item))}
                    />
                </View>
            )
        }
    }
    const renderSeasonTopPick = ({ item, index }) => {
        if (index < 4) {
            return (
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                    <Components.CategoryCard
                        image={{ uri: item.f_img1 }}
                        title={item.f_productname}
                        off={`${props.auth.currency_symbol} ${calculatePrice(item.f_product_offer_price)}`}
                        originalPrice={`${props.auth.currency_symbol} ${calculatePrice(item.f_product_price)}`}
                        onPress={() => props.dispatch(setProductDetails(item))}
                    />
                </View>
            )
        }
    }
    const renderTrendingOffers = ({ item, index }) => {
        if (index < 4) {
            return (
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                    <Components.CategoryCard
                        image={{ uri: item.f_img1 }}
                        title={item.f_productname}
                        off={`${props.auth.currency_symbol} ${calculatePrice(item.f_product_offer_price)}`}
                        originalPrice={`${props.auth.currency_symbol} ${calculatePrice(item.f_product_price)}`}
                        onPress={() => props.dispatch(setProductDetails(item))}
                    />
                </View>
            )
        }
    }
    const renderRecentlyViewed = ({ item, index }) => {
        if (index < 4) {
            return (
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                    <Components.CategoryCard
                        image={{ uri: item.image }}
                        title={item.f_productname}
                        off={`${props.auth.currency_symbol} ${calculatePrice(item.discount)}`}
                        onPress={() => props.dispatch(setProductDetails(item))}
                    />
                </View>
            )
        }
    }

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
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        marginHorizontal: 15,
                    }}
                >
                    <Text style={{ color: "grey" }}>Search Products</Text>
                </TouchableOpacity>
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: constants.Colors.white
                    }}
                >
                    {
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
                    }


                    {
                        props.market.flashSale.length > 0 &&
                        <>
                            <Components.ViewAllCard
                                title="Flash Sale"
                                time={45600}
                                
                                buttonTitle="View all"
                                onPress={() => setProduct("Flash Sale")}
                            />
                            <View style={{ marginTop: constants.vh(10) }}>
                                <FlatList
                                    horizontal={true}
                                    data={props.market.flashSale}
                                    renderItem={renderFlashSale}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </>
                    }


                    {
                        props.market.topPickOnProduct.length > 0 &&
                        <>
                            <Components.ViewAllCard
                                title="Top Picks on"
                                time={3600}
                                buttonTitle="View all"
                                onPress={() => setProduct("Top Picks on")}
                            />

                            <View style={{ marginTop: constants.vh(10) }}>
                                <FlatList
                                    horizontal={true}
                                    data={props.market.topPickOnProduct}
                                    renderItem={renderTopPick}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </>
                    }


                    {
                        props.market.bestSelling.length > 0 &&
                        <>
                            <Components.ViewAllCard
                                title="Best selling Products"
                                buttonTitle="View all"
                                onPress={() => setProduct("Best selling Products")}
                            />

                            <View style={{ marginTop: constants.vh(10) }}>
                                <FlatList
                                    horizontal={true}
                                    data={props.market.bestSelling}
                                    renderItem={renderBestSelling}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </>
                    }

                    {
                        props.market.seasonTopPick.length > 0 &&
                        <>
                            <Components.ViewAllCard
                                title="Season's top picks"
                                buttonTitle="View all"
                                onPress={() => setProduct("Season's top picks")}
                            />

                            <View style={{ marginTop: constants.vh(10) }}>
                                <FlatList
                                    horizontal={true}
                                    data={props.market.seasonTopPick}
                                    renderItem={renderSeasonTopPick}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </>
                    }

                    {
                        props.market.trendingProducts.length > 0 &&
                        <>
                            <Components.ViewAllCard
                                title="Trending offers"
                                buttonTitle="View all"
                                onPress={() => setProduct("Trending offers")}
                            />

                            <View style={{ marginTop: constants.vh(10) }}>
                                <FlatList
                                    horizontal={true}
                                    data={props.market.trendingProducts}
                                    renderItem={renderTrendingOffers}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </>
                    }


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
                    title="Hypr"
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