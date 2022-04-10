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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import constants from '../../../constants';
import Components from '../../../components';
import * as NavigationService from '../../../navigation/NavigationService';
import { styles } from './styles';
import {
    getCartList,
    decreaseCartItem,
    increaseCartItem,
    removeCartItem,
    placeOrder,
    payOrder
} from '../../../actions/marketPlace';
import { calculatePrice } from '../../../utils/CalculatePrice';
import Fonts from '../../../constants/Fonts';

const HEIGHT = Dimensions.get("window").height
const imageUri = "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
const OrderScreen = (props) => {
    const [state, setState] = React.useState({
        totalPrice: 0,
        modeOfPayment:'',
        cashOnDelivery:true
    })
    useEffect(() => {
        props.dispatch(getCartList())
        console.warn(props.market.cartList)
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
                    price={`$${calculatePrice(item.f_totalAmount)}`}
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
    const handlePlaceOrder = () => {

        let payload = {
            paymentMode: 'Paypal'
        }
        let addAbleAmount = props.market.totalPayingAmount - props.auth.userData.f_wallet

        
        NavigationService.navigate(constants.ScreensName.Payment.name, {amount:addAbleAmount , cart:props.route.params.cart})
        // props.dispatch(payOrder(payload));
        // if (props.auth.userData.f_wallet > props.market.totalPayingAmount) {
        //     const payload = {
        //         paymentMode: "Wallet"
        //     }
        //     props.dispatch(placeOrder(payload))
        // } else {
        //     let addAbleAmount = props.market.totalPayingAmount - props.auth.userData.f_wallet
        //     NavigationService.navigate(constants.ScreensName.Payment.name, addAbleAmount)
        // }
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
                }}>Your Order is empty.</Text>
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={constants.Colors.primary} />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Order"
                />
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <FlatList
                        data={props.route.params.cart}
                        renderItem={renderCart}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={renderEmpty}
                    />
                </View>

                

                {/* <View style={styles.deliveryDetails}>
                    <View>
                        <View style={{flexDirection:'row',bottom:constants.height_dim_percent * 3,width:constants.width_dim_percent * 97}}>                            
                            <Text style={[styles.deliveryDetailsText, { fontFamily:Fonts.GothamBold,fontSize: 14, textTransform: "capitalize", fontWeight:'600'}]}>Delivery</Text>
                            <View style={{                                   
                                    marginLeft:"auto",
                                   justifyContent:'flex-end'
                                   }}>
                                <TouchableOpacity
                                    // onPress={handleChangeAddress}
                                    style={{                                        
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-between',                                                       
                                            maxWidth:constants.width_dim_percent * 50,
                                            flexDirection:'row',

                                    }} >
                                <Ionicons
                                        name="location"
                                        size={20}
                                        color={constants.Colors.blue_primary}
                                    />
                                    <Text style={[{color:constants.Colors.dark_text,fontSize:18,fontFamily:Fonts.GothamLight,flexWrap:'wrap',overflow:'hidden',maxWidth: '80%'}]} numberOfLines={1}  >                                                    
                                        {props.auth.shipping_address[0].address}                                                                                
                                    </Text>                              
                                    <AntDesign
                                        name="right"
                                        size={20}
                                        color={constants.Colors.fade}
                                    />                                
                                </TouchableOpacity>
                            </View>    
                        </View>                        
                    </View>
                </View> */}


                <View style={styles.modeOfPayment}>
                    <View>
                        <View style={{flexDirection:'row',bottom:constants.height_dim_percent * 3,width:constants.width_dim_percent * 97}}>                            
                            <Text style={[styles.modeOfPaymentText, { fontFamily:Fonts.GothamBold,fontSize: 14,  fontWeight:'600'}]}>Mode of Payment</Text>                            
                        </View>                        

                        <Components.ModeOfPaymentCard
                            showSelect={true}
                            isSelected={state.cashOnDelivery}
                            onPress={()=>{

                            }}
                            title={"Paypal"}
                        />
                    </View>
                </View>




                {
                    props.market.cartList.length > 0 &&
                    <View style={{ paddingHorizontal: 15 }}>
                        <Components.PrimaryButton

                            title={`PAY ${props.auth.currency_symbol} ${calculatePrice(props.market.totalPayingAmount)}`}
                            onPress={() => {
                                handlePlaceOrder()
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);