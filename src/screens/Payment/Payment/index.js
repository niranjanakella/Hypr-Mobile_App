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
import {getUserIdFromStorage} from '../../../utils/asyncstorage';
import {placeOrder,getCartList} from '../../../actions/marketPlace';
import base64 from 'react-native-base64';
import StripeCheckout from 'react-native-stripe-checkout-webview';

let   stripeAPI =  { STRIPE_PUBLIC_KEY: 'pk_test_51KnhTJGAX1ovFy7T69BpTV76q40QV7DyAf5tByH9atqDmS5beGItM2pghqHLagZ0KF5NpU5nlP0WjAKGZnq9m8Gs00Q39c6UTV'  };



const Payment = (props) => {
    const [userid,setUserId] = useState("")
    useEffect(()=>{
     
        getUserIdFromStorage().then(id=>{
            setUserId(id)
        })
        
       
    })
    const [visible, setVisiblity] = useState(true);

    const handleNavigationStateChange=(navState)=>{
const {url,title} = navState;
console.log("navState",navState);
if(title === "Payment Success | Paypal"){
    console.log("url",url);
    let spliturl = url.split('?');
      console.log("spliturl",spliturl);
      let splitotherhalf = spliturl[1].split('&');
      console.log("splitotherhalf",splitotherhalf);
      let paymentId = splitotherhalf[0].replace("paymentId=","");
      let token = splitotherhalf[1].replace("token=","");
      let lastValue = url.split('/')
      console.log("lastValue",lastValue);
      const payload={
        paymentMode:"Paypal"
      }
      setTimeout(() => {
        props.dispatch(placeOrder(payload))
      }, 2000);
}
if(title === "Payment Cancelled | Paypal"){
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
                    paddingHorizontal: 15
                }}>
                    {/* <Components.PrimaryHeader
                onPress={() => props.navigation.goBack()}
                title="Payment"
                />
                   */}
                </View>
                
                
                {props.route.params.modeOfPayment == 'Paypal' ?(
                    // PAYPAL PAYMENT
                    <View style={{ 
                        height: Dimensions.get('window').height, 
                        width: Dimensions.get('window').width,
                        overflow:'hidden',
                        flex:1
                        }}>
                        <WebView
                            scalesPageToFit={true}
                            //source={{ uri: `${getConfig().accesspoint}${constants.EndPoint.PAYMENT_CHECKOUT}/${props.auth.totalPayingAmount}/${userid}` }}
                            source={{ uri: `${getConfig().accesspoint}${constants.EndPoint.PAYMENT_CHECKOUT}/10/${userid}/${base64.encode(JSON.stringify(props.route.params.cart))}`}}
                            onNavigationStateChange={handleNavigationStateChange}
                            startInLoadingState={true}
                            renderLoading={() => <Components.ProgressView 
                                                        isProgress={true}
                                                        title={constants.AppConstant.Bando}
                                                />}

                        />
                    </View>
                    )
                    :
                    // STRIPE 
                        (
                        <StripeCheckout
                                stripePublicKey={stripeAPI.STRIPE_PUBLIC_KEY}
                                checkoutSessionInput={{
                                sessionId: props.route.params.checkoutSessionId,
                                }}
                                onSuccess={({ checkoutSessionId }) => {
                                console.log(`Stripe checkout session succeeded. session id: ${checkoutSessionId}.`);
                                }}
                                onCancel={() => {
                                console.log(`Stripe checkout session cancelled.`);
                            }}
                        />
                        )

                }
           
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
)(Payment)
