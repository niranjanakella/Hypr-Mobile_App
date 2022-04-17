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

import constants from '../../../constants';
import Components from '../../../components';
import * as NavigationService from '../../../navigation/NavigationService';
import { styles } from './styles';
import {
    orderSummary,
    orderDetails
} from '../../../actions/marketPlace';
import { calculatePrice } from '../../../utils/CalculatePrice';

const HEIGHT = Dimensions.get("window").height
const OrderSummary = (props) => {
    useEffect(() => {
        props.dispatch(orderSummary())
    }, [])

    const renderOrderSummary = ({ item, index }) => {
        return (
            <View style={{
                marginVertical: 5
            }}>
                <Components.OrderCard
                    image={item.f_ProductImg1}
                    title={item.f_ServiceName ? item.f_ServiceName : "Product Name"}
                    price={`${props.auth.currency_symbol} ${calculatePrice(item.f_OfferPrice)}`}
                    status={item.f_orderStatus}
                    //orderId={item.f_displayOrderId}
                    onPressDetail={() => {
                        handleOrderDetails(item)
                    }}
                />
            </View>
        )
    }
    const handleOrderDetails = (item) => {
        props.dispatch(orderDetails(item))
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
                }}>No Order found.</Text>
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={constants.Colors.primary} />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Order Summary"
                />
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <FlatList
                        data={props.route.params.order_type === "All" ? props.market.OrderSummary
                            :
                            props.route.params.order_type === "Active Orders" ?
                                props.market.activeOrderSummary
                                :
                                props.route.params.order_type === "Delivered Order" ?
                                    props.market.Delivered
                                    :
                                    props.route.params.order_type === "Cancelled Order" ?
                                        props.market.cancelledOrderSummary
                                        :
                                        props.market.OrderSummary
                        }
                        renderItem={renderOrderSummary}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={renderEmpty}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);