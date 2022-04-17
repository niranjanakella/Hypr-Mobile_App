import React, { useEffect, useLayoutEffect, createRef } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    Keyboard,
    FlatList,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionSheet from "react-native-actions-sheet";

import * as NavigationService from '../../navigation/NavigationService';
import constants from '../../constants';
import Components from '../../components';
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
} from '../../actions/marketPlace';
import { setTabType } from '../../actions/auth';
import { calculatePrice } from '../../utils/CalculatePrice'; import {
    getAllProducts,
    sortAllProducts,
} from '../../actions/products';

const testImage = "https://homepages.cae.wisc.edu/~ece533/images/airplane.png";
const DigitalHome = (props) => {
    const [state, setState] = React.useState({
        image: testImage,
        searchValue: ""
    })
    const actionSheetRef = createRef();
    const actionSheetRefFilter = createRef();
    useLayoutEffect(() => {
        props.dispatch(getCartList())
        props.dispatch(getCategory())
        props.dispatch(getAllProducts())
        const subscribe = props.navigation.addListener('focus', () => {
            props.dispatch(setTabType("market"))
        })
        return () => {
            subscribe
        }
    }, [])

    const renderCategory = ({ item, index }) => {
        if (item.t_CategoryTypes === 1) {
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
    const handleActionSheet = (value) => {
        actionSheetRef.current?.setModalVisible(value);
    }
    const handleActionSheetFilter = (value) => {
        actionSheetRefFilter.current?.setModalVisible(value);
    }
    const renderProductList = ({ item, index }) => {
        return (
            <View
                style={{
                    width: "42%",
                    marginHorizontal: constants.vw(15),
                    marginVertical: constants.vh(5)
                }}
            >
                <Components.CategoryCard
                    image={{ uri: item.f_img1 }}
                    off={`${props.auth.currency_symbol} ${calculatePrice(item.f_product_offer_price)}`}
                    originalPrice={`${props.auth.currency_symbol} ${calculatePrice(item.f_product_price)}`}
                    title={item.f_productname}
                    onPress={() => props.dispatch(setProductDetails(item))}
                />
            </View>
        )
    }
    const sortProducts = (value) => {
        handleActionSheet(false)
        props.dispatch(sortAllProducts(value))
    }

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={constants.Colors.primary} />
            <SafeAreaView
                style={styles.container}
            >

                <Components.HeaderWithSearch
                    showDrawer={false}
                    isCartCount={true}
                    onPressInput={() => { NavigationService.navigate(constants.ScreensName.SearchProduct.name, null) }}
                    cartCount={props.market.cartList.length}
                    onPressCart={() => { NavigationService.navigate(constants.ScreensName.Cart.name, null) }}
                    onPressDrawer={() => { props.navigation.goBack() }}
                    onPressWishlist={() => NavigationService.navigate(constants.ScreensName.WishList.name, null)}
                />
                <View
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

                    <View style={{ flex: 1 }}>
                        <View
                            style={styles.viewAllContainer}
                        >
                            <Text style={styles.text16bold}>Products</Text>
                        </View>
                        <FlatList
                            horizontal={false}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={props.products.products}
                            renderItem={renderProductList}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View
                        style={styles.filterAndSortContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.filter}
                            onPress={() => { handleActionSheet(true) }}
                        >
                            <MaterialIcons
                                name="filter-list"
                                size={40}
                                color={constants.Colors.white}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.filter}
                        //onPress={() => { handleActionSheetFilter(true) }}
                        >
                            <MaterialIcons
                                name="filter-alt"
                                size={40}
                                color={constants.Colors.white}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                <Components.ProgressView
                    isProgress={props.auth.isLoading}
                    title="Hypr"
                />
            </SafeAreaView>
            <ActionSheet ref={actionSheetRef}>
                <View style={{
                    paddingTop: 20,
                    paddingBottom: 10
                }}>
                    <View style={{
                        borderBottomWidth: 1,
                    }}>
                        <Components.BottomSheet
                            title="A-Z"
                            onPress={() => sortProducts("atoz")}
                        />
                        <Components.BottomSheet
                            title="Z-A"
                            onPress={() => sortProducts("ztoa")}
                        />
                        <Components.BottomSheet
                            title="Price : highest to low"
                            onPress={() => sortProducts("hightolow")}
                        />
                        <Components.BottomSheet
                            title="Price : lowest to high"
                            onPress={() => sortProducts("lowtohigh")}
                        />
                    </View>
                    <Components.BottomSheet
                        title="Reset"
                        onPress={() => sortProducts("reset")}
                    />
                </View>
            </ActionSheet>

            <ActionSheet ref={actionSheetRefFilter}>
                <View style={{
                    paddingTop: 20,
                    paddingBottom: 10
                }}>
                    <View style={{
                        borderBottomWidth: 1,
                    }}>
                        <Components.BottomSheet
                            title="A-Z F"
                        //onPress={handleOpenCamera}
                        />
                        <Components.BottomSheet
                            title="Z-A"
                        //onPress={handleOpenLibrary}
                        />
                        <Components.BottomSheet
                            title="Price: highest to low."
                        //onPress={handleOpenCamera}
                        />
                        <Components.BottomSheet
                            title="Price lowest to high."
                        //onPress={handleOpenLibrary}
                        />
                    </View>
                    <Components.BottomSheet
                        title="Cancel"
                        onPress={() => { handleActionSheet(false) }}
                    />
                </View>
            </ActionSheet>

        </>
    )
}
function mapStateToProps(state) {
    const { auth, market, products } = state
    return {
        auth,
        market,
        products
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
)(DigitalHome)