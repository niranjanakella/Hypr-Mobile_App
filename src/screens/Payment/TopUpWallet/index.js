import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';
import constants from '../../../constants';
import Components from '../../../components';
import getConfig from '../../../utils/config';
import { getUserIdFromStorage } from '../../../utils/asyncstorage';
import { placeOrder } from '../../../actions/marketPlace';

const TopUpWallet = (props) => {
    const [userid, setUserId] = useState("")
    useEffect(() => {
        getUserIdFromStorage().then(id => {
            setUserId(id)
        })
        console.log("props.route.params", props.route.params.amount);
    })
    const [visible, setVisiblity] = useState(true);

    const handleNavigationStateChange = (navState) => {
        const { url, title } = navState;
        console.log("navState", navState);
        if (title === "Payment Success | Paypal") {
            setTimeout(() => {
                props.navigation.goBack()
            }, 2000);
        }
        if (title === "Payment Cancelled | Paypal") {
            setTimeout(() => {
                props.navigation.goBack()
            }, 2000);
        }
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: constants.Colors.white
            }}>
                <View style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                    overflow: 'hidden',
                    flex: 1
                }}>
                    <WebView
                        scalesPageToFit={true}
                        //source={{ uri: `${getConfig().accesspoint}${constants.EndPoint.PAYMENT_CHECKOUT}/${props.auth.totalPayingAmount}/${userid}` }}
                        source={{ uri: `${getConfig().accesspoint}${constants.EndPoint.PAYMENT_CHECKOUT}/${props.route.params.amount}/${userid}` }}
                        onNavigationStateChange={handleNavigationStateChange}
                        startInLoadingState={true}
                        renderLoading={() => <Components.ProgressView
                            isProgress={true}
                            title={constants.AppConstant.Bando}
                        />}

                    />
                </View>
            </SafeAreaView>
        </>
    )
}


function mapStateToProps(state) {
    const { auth } = state
    return {
        auth
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
)(TopUpWallet)
