import React, { useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Alert,
    Modal,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import constants from '../../constants';
import Components from '../../components';
import * as NavigationService from '../../navigation/NavigationService';
import {
    logout,
    getUser,
    todayCurrencyRate,
    getCurrencyDetailsFromLocalStorage,
    setTabType,
    getNetworkList
} from '../../actions/auth';
import { styles } from './styles';
import { orderSummary } from '../../actions/marketPlace';
import { getSupportHistory } from '../../actions/chat';
import { calculatePrice } from '../../utils/CalculatePrice';

const Dashboard = (props) => {

    useEffect(() => {
        props.dispatch(getCurrencyDetailsFromLocalStorage())
        props.dispatch(todayCurrencyRate())
        props.dispatch(getNetworkList())
        props.dispatch(orderSummary())
        props.dispatch(getSupportHistory())
        const subscribe = props.navigation.addListener('focus', () => {
            props.dispatch(getUser())
            props.dispatch(setTabType("dashboard"))
        })
        return () => {
            subscribe
        }
    }, [])

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>

                <Components.HeaderWithDrawer
                    onPressDrawer={() => { props.navigation.toggleDrawer() }}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.dataContainer, { flex: 1, width: "100%" }]
                    }>

                    <View style={styles.cardMainContainer}>
                        <View style={styles.cardWidth}>
                            <Components.Dashboard
                                //onPress={() => { handleDashboard(item) }}
                                title2={`${props.auth.currency_symbol} ${calculatePrice(props.auth.userData.f_wallet)}`}
                                isTitle1={true}
                                title1={"Hypr Wallet"}
                                isTitle2={true}
                                iconName={"euro"}
                                iconSize={30}
                                fontawesome={true}
                                materialcommunityicons={false}
                            />
                        </View>
                        <View style={styles.cardWidth}>
                            <Components.Dashboard
                                //onPress={() => { handleDashboard(item) }}
                                title2={`${props.auth.currency_symbol} ${calculatePrice(500)}`}
                                isTitle1={true}
                                title1={"Total Commission"}
                                isTitle2={true}
                                iconName={"euro"}
                                iconSize={30}
                                fontawesome={true}
                                materialcommunityicons={false}
                            />
                        </View>
                    </View>

                    <View style={styles.cardMainContainer}>
                        <View style={styles.cardWidth}>
                            <Components.Dashboard
                                onPress={() => {
                                    NavigationService.navigate(constants.ScreensName.Network.name, null)
                                }}
                                title2={props.auth.networkList.length}
                                isTitle1={true}
                                title1={"Friends/Pals"}
                                isTitle2={true}
                                iconName={"users"}
                                iconSize={30}
                                fontawesome={true}
                                materialcommunityicons={false}
                            />
                        </View>
                        <View style={styles.cardWidth}>
                            <Components.Dashboard
                                //onPress={() => { handleDashboard(item) }}
                                title2={21}
                                isTitle1={true}
                                title1={"Referals"}
                                isTitle2={true}
                                iconName={"share-alt"}
                                iconSize={30}
                                fontawesome={true}
                                materialcommunityicons={false}
                            />
                        </View>
                    </View>

                    <View style={styles.cardMainContainer}>
                        <View style={styles.cardWidth}>
                            <Components.Dashboard
                                onPress={() => {
                                    NavigationService.navigate(constants.ScreensName.OrderSummary.name, { order_type: "All" })
                                }}
                                title2={props.market.OrderSummary.length}
                                isTitle1={true}
                                title1={"Orders"}
                                isTitle2={true}
                                iconName={"shopping-bag"}
                                iconSize={30}
                                fontawesome={true}
                                materialcommunityicons={false}
                            />
                        </View>
                        <View style={styles.cardWidth}>
                            <Components.Dashboard
                                onPress={() => {
                                    NavigationService.navigate(constants.ScreensName.OrderSummary.name, { order_type: "Active Orders" })
                                }}
                                title2={props.market.activeOrderSummary.length}
                                isTitle1={true}
                                title1={"Active Orders"}
                                isTitle2={true}
                                iconName={"shopping-cart"}
                                iconSize={30}
                                fontawesome={true}
                                materialcommunityicons={false}
                            />
                        </View>
                    </View>

                    <View style={styles.cardMainContainer}>
                        <View style={styles.cardWidth}>
                            <Components.Dashboard
                                onPress={() => {
                                    NavigationService.navigate(constants.ScreensName.OrderSummary.name, { order_type: "Delivered Order" })
                                }}
                                title2={props.market.deliveredOrderSummary.length}
                                isTitle1={true}
                                title1={"Delivered Orders"}
                                isTitle2={true}
                                iconName={"truck"}
                                iconSize={30}
                                fontawesome={true}
                                materialcommunityicons={false}
                            />
                        </View>
                        <View style={styles.cardWidth}>
                            <Components.Dashboard
                                onPress={() => {
                                    NavigationService.navigate(constants.ScreensName.OrderSummary.name, { order_type: "Cancelled Order" })
                                }}
                                title2={props.market.cancelledOrderSummary.length}
                                isTitle1={true}
                                title1={"Cancelled Orders"}
                                isTitle2={true}
                                iconName={"cancel"}
                                iconSize={30}
                                fontawesome={false}
                                materialcommunityicons={true}
                            />
                        </View>
                    </View>

                    <View style={styles.cardMainContainer}>
                        <View style={styles.cardWidth}>
                            <Components.Dashboard
                                onPress={() => {
                                    NavigationService.navigate(constants.ScreensName.ChatSupport.name, { chat_type: "all" })
                                }}
                                title2={props.chat.chatSupportHistory.length}
                                isTitle1={true}
                                title1={"Complaints"}
                                isTitle2={true}
                                iconName={"wechat"}
                                iconSize={30}
                                fontawesome={true}
                                materialcommunityicons={false}
                            />
                        </View>
                        <View style={styles.cardWidth}>
                            <Components.Dashboard

                                onPress={() => NavigationService.navigate(constants.ScreensName.ChatHistory.name, { chat_type: "active" })}
                                title2={props.chat.activeChatHistory.length}
                                isTitle1={true}
                                title1={"Active Complaints"}
                                isTitle2={true}
                                iconName={"chat-processing"}
                                iconSize={30}
                                fontawesome={false}
                                materialcommunityicons={true}
                            />
                        </View>
                    </View>

                    <View style={styles.cardMainContainer}>
                        <View style={styles.cardWidth}>
                            <Components.Dashboard

                                onPress={() => NavigationService.navigate(constants.ScreensName.ChatHistory.name, { chat_type: "close" })}
                                title2={props.chat.closeChatHistory.length}
                                isTitle1={true}
                                title1={"Close Complaints"}
                                isTitle2={true}
                                iconName={"chat-remove"}
                                iconSize={30}
                                fontawesome={false}
                                materialcommunityicons={true}
                            />
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
            <Components.ProgressView
                isProgress={props.auth.isLoading}
                title="Hypr"
            />
        </>
    )
}
function mapStateToProps(state) {
    const { auth, market, chat } = state
    return {
        auth,
        market,
        chat
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
)(Dashboard)