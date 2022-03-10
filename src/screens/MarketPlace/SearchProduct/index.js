import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import {
    getProductByKeyword,
    setProductDetails,
    clearSearchList
} from '../../../actions/marketPlace'

const SearchProduct = (props) => {
    const [state, setState] = useState({
        searchValue: ""
    })
    const handleGetProduct = () => {
        props.dispatch(getProductByKeyword(state.searchValue))
    }
    const renderSearchProductList = ({ item, index }) => {
        return (
            <View style={{
                paddingHorizontal: 15,
                paddingVertical: constants.vh(5)
            }}>
                <Components.SearchProductCard
                    title={item.f_productname}
                    image={{ uri: item.f_img1 }}
                    onPress={() => props.dispatch(setProductDetails(item))}
                />
            </View>
        )
    }
    const handleBackutton = () => {
        props.navigation.goBack();
        props.dispatch(clearSearchList())
    }
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={constants.Colors.primary} />
            <SafeAreaView style={styles.container}>
                <Components.HeaderWithSearch
                    showDrawer={false}
                    showinput={true}
                    isCartCount={true}
                    autoFocus={true}
                    cartCount={props.market.cartList.length}
                    onPressCart={() => { NavigationService.navigate(constants.ScreensName.Cart.name, null) }}
                    onPressDrawer={() => { handleBackutton() }}
                    onPressWishlist={() => NavigationService.navigate(constants.ScreensName.WishList.name, null)}
                    onChangeText={(searchValue) => { setState({ ...state, searchValue }) }}
                    onSubmitEditing={handleGetProduct}
                />
                <View style={{
                    flex: 1
                }}>
                    <FlatList
                        data={props.market.searchProductList}
                        renderItem={renderSearchProductList}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <Components.ProgressView
                    isProgress={props.auth.isLoading}
                    title="Hypr"
                />
            </SafeAreaView>
        </>
    )
}

function mapStateToProps(state) {
    let { auth, market } = state;
    return {
        auth,
        market
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);