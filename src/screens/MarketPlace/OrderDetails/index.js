import React, { useEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Clipboard, { useClipboard } from '@react-native-community/clipboard';
import moment from 'moment';

import constants from '../../../constants';
import Components from '../../../components';
import * as NavigationService from '../../../navigation/NavigationService';
import { styles } from './styles';
import { calculatePrice } from '../../../utils/CalculatePrice';

const HEIGHT = Dimensions.get("window").height
const OrderDetails = (props) => {
    const [state, setState] = React.useState({
        totalPrice: 0,
    })
    useEffect(() => {
    }, [])

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={constants.Colors.primary} />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Order Details"
                />
                <View>
                    <Image
                        source={{ uri: props.market.OrderDetails.f_ProductImg1 }}
                        style={{
                            width: "100%",
                            height: constants.vh(200)
                        }}
                    />
                </View>

                <ScrollView style={{
                    paddingHorizontal: 15,
                    flex: 1
                }}>
                    <View style={styles.productNameContainer}>
                        <View style={{ width: "70%" }}>
                            <Text style={[styles.text18bold]}>{props.market.OrderDetails.f_ServiceName ? props.market.OrderDetails.f_ServiceName : "Product Name"}</Text>
                        </View>
                        <View>
                            <Text style={[styles.priceText, {
                                textDecorationLine: "line-through",
                                color: constants.Colors.secondry
                            }]}>{props.auth.currency_symbol} {calculatePrice(props.market.OrderDetails.f_ProductPrice)}</Text>
                            <Text style={styles.priceText}>{props.auth.currency_symbol} {calculatePrice(props.market.OrderDetails.f_OfferPrice)}</Text>
                        </View>
                    </View>

                    <View style={styles.productNameContainer}>
                        <Text style={styles.text18bold}>Order Status</Text>
                        <Text style={[{ textTransform: "capitalize" }, styles.priceText]}>{props.market.OrderDetails.f_orderStatus}</Text>
                    </View>

                    <View style={styles.productNameContainer}>
                        <Text style={styles.text18bold}>Payment Status</Text>
                        <Text style={[{ textTransform: "capitalize" }, styles.priceText]}>{props.market.OrderDetails.f_paymentStatus}</Text>
                    </View>

                    <View style={styles.addressContainer}>
                        <Text style={styles.text18bold}>Shipping Address</Text>
                        <Text>{props.market.OrderDetails.f_billingAddress} {props.market.OrderDetails.f_billingCity}</Text>
                        <Text>{props.market.OrderDetails.f_billingAddress} {props.market.OrderDetails.f_billingCountry}</Text>
                    </View>

                    <View style={styles.productNameContainer}>
                        <Text style={styles.text18bold}>Order ID</Text>
                        <Text style={styles.priceText}>{props.market.OrderDetails.f_displayOrderId}</Text>

                    </View>
                    <View style={styles.productNameContainer}>
                        <Text style={styles.text18bold}>TimeStamp</Text>
                        <Text style={[styles.priceText]}>{moment(props.market.OrderDetails.f_orderDate).format("DD/MM/YYYY hh:mm:ss A")}</Text>
                    </View>

                    <Text></Text>
                </ScrollView>
                <View style={{
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: props.market.OrderDetails.f_orderStatus !== "Cancelled" ? "space-between" : "center"
                }}>
                    {
                        props.market.OrderDetails.f_orderStatus !== "Cancelled" &&
                        props.market.OrderDetails.f_orderStatus !== "Rejected" &&
                        props.market.OrderDetails.f_orderStatus !== "Delivered" &&
                        <View style={{ width: "49%" }}>
                            <Components.PrimaryButton
                                title="CANCEL ORDER"
                                onPress={() => NavigationService.navigate(constants.ScreensName.CancelOrder.name, { productName: props.market.OrderDetails.f_ServiceName, productId: props.market.OrderDetails._id })}
                            />
                        </View>
                    }

                    <View style={{ width: "49%" }}>
                        <Components.PrimaryButton
                            title="LET'S SHOP"
                            onPress={() => NavigationService.navigate(constants.ScreensName.Dashboard.name, null)}
                        />
                    </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);