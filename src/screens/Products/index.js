import React, { useEffect, createRef, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionSheet from "react-native-actions-sheet";

import constants from '../../constants';
import Components from '../../components';
import * as NavigationService from '../../navigation/NavigationService';
import { styles } from './styles';
import {
    getAllProducts,
    sortAllProducts,
} from '../../actions/products';
import { setProductDetails } from '../../actions/marketPlace';
import { calculatePrice } from '../../utils/CalculatePrice';

const Products = (props) => {
    const actionSheetRef = createRef();
    const actionSheetRefFilter = createRef();
    let actionSheet;
    useEffect(() => {
        const payload = {
            pagecount: 0
        }
        props.dispatch(getAllProducts(payload))
    }, [])
    const [state, setState] = useState({
        pagecount: 0
    })
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
    const handleRefresh = () => {
        setState({
            ...state,
            pagecount: 0
        })
        const payload = {
            pagecount: 0
        }
        props.dispatch(getAllProducts(payload))
    }
    const handleOnReached = () => {
        const payload = {
            pagecount: state.pagecount + 1
        }
        props.dispatch(getAllProducts(payload))
        setState({
            ...state,
            pagecount: state.pagecount + 1
        })
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.HeaderWithSearch
                    showDrawer={false}
                    isCartCount={true}
                    onPressInput={() => { NavigationService.navigate(constants.ScreensName.SearchProduct.name, null) }}
                    cartCount={props.market.cartList.length}
                    onPressCart={() => { NavigationService.navigate(constants.ScreensName.Cart.name, null) }}
                    onPressDrawer={() => { props.navigation.goBack() }}
                    onPressWishlist={() => NavigationService.navigate(constants.ScreensName.WishList.name, null)}
                />
                <View style={{ flex: 1 }}>
                    <FlatList
                        horizontal={false}
                        numColumns={2}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={props.products.products}
                        renderItem={renderProductList}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={props.auth.isLoading}
                        onRefresh={handleRefresh}
                        onEndReached={handleOnReached}
                        onEndReachedThreshold={0.5}
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

            <Components.ProgressView
                isProgress={props.auth.isLoading}
                title="Hypr"
            />
        </>
    )
}

function mapStateToProps(state) {
    let { auth, market, products } = state;
    return {
        auth,
        market,
        products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);