import React, { useEffect } from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

import constants from '../../../constants';
import Components from '../../../components';
import * as NavigationService from '../../../navigation/NavigationService';
import { styles } from './styles';
import {
    getCartList,
    decreaseCartItem,
    increaseCartItem,
    removeCartItem
} from '../../../actions/marketPlace';
import { calculatePrice } from '../../../utils/CalculatePrice';

const HEIGHT = Dimensions.get("window").height
const imageUri = "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
const Cart = (props) => {
    const [state, setState] = React.useState({
        totalPrice: 0,
    })
    useEffect(() => {
        props.dispatch(getCartList())
    }, [])

    const renderCart = ({ item, index }) => {
        return (
            <View style={{
                marginVertical: 5
            }}>
                <Components.CartCard
                    image={item.f_ProductImg1}
                    count={item.f_itemQuantity}
                    originalPrice={`${item.f_itemQuantity} × ${props.auth.currency_symbol} ${calculatePrice(item.f_ProductPrice)}`}
                    price={`${props.auth.currency_symbol} ${calculatePrice(item.f_totalAmount)}`}
                    title={item.f_variantName}
                    onPressDecrease={() => { handleDecreaseItemCart(item) }}
                    onPressDelete={() => { handleRemoveItemCart(item) }}
                    onPressIncrease={() => { handleIncreaseItemCart(item) }}
                    textDecorationLine="none"
                    variant={item.f_variantName}
                />
            </View>
        )
    }
    const handleDecreaseItemCart = (item) => {
        if (item.f_itemQuantity === 1) {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Product Cart can not be less than 1.",
                type: "error",
                position: "top"
            });
            return 1;
        }
        const payload = {
            id: item._id
        }
        props.dispatch(decreaseCartItem(payload))
    }
    const handleIncreaseItemCart = (item) => {
        const payload = {
            id: item._id
        }
        props.dispatch(increaseCartItem(payload))
    }
    const handleRemoveItemCart = (item) => {
        const payload = {
            id: item._id
        }
        props.dispatch(removeCartItem(payload))
    }
    const renderEmpty = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: HEIGHT - 40
            }}>
                <MaterialIcons
                    name="remove-shopping-cart"
                    size={200}
                    color="#EAE9E9"
                />
                <Text style={{
                    fontSize: 18,
                    color: "#EAE9E9"
                }}>Your cart is empty.</Text>
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={constants.Colors.primary} />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Cart"
                    
                />
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <FlatList
                        data={props.market.cartList}
                        renderItem={renderCart}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={renderEmpty}
                    />
                </View>
                {
                    props.market.cartList.length > 0 &&
                    <View style={{ paddingHorizontal: 15 }}>
                        <Components.PrimaryButton
                            
                            title={`Checkout ${props.auth.currency_symbol} ${calculatePrice(props.market.totalPayingAmount)}`}
                            onPress={() => {
                                NavigationService.navigate(constants.ScreensName.Address.name, null)
                            }}
                        />
                    </View>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);