import React from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import * as NavigationService from '../../../navigation/NavigationService';
import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import { setProductDetails } from '../../../actions/marketPlace';
import { calculatePrice } from '../../../utils/CalculatePrice';

const HEIGHT = Dimensions.get("window").height
const ProductList = (props) => {
    const [state, setState] = React.useState({})
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
                    onPress={() => { props.dispatch(setProductDetails(item)) }}
                />
            </View>
        )
    }
    const renderEmpty = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: HEIGHT - 200
            }}>
                <MaterialIcons
                    name="broken-image"
                    size={100}
                    color="#EAE9E9"
                />
                <Text style={{
                    fontSize: 18,
                    color: "#EAE9E9"
                }}>No products available for {props.market.productType}.</Text>
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.secondryContainer}>

                    <Components.HeaderWithSearch
                        isCartCount={true}
                        cartCount={props.market.cartList.length}
                        onPressCart={() => NavigationService.navigate(constants.ScreensName.Cart.name, null)}
                        onPressDrawer={() => { props.navigation.goBack() }}
                        onPressWishlist={() => NavigationService.navigate(constants.ScreensName.WishList.name, null)}
                        onPressInput={() => { NavigationService.navigate(constants.ScreensName.SearchProduct.name, null) }}
                    />
                    <View style={{ flex: 1 }}>
                        <FlatList
                            horizontal={false}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={props.market.productList}
                            renderItem={renderProductList}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={renderEmpty}
                        />
                    </View>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);