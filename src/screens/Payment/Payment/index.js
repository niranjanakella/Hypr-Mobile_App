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

const Payment = (props) => {
    const [userid,setUserId] = useState("")
    useEffect(()=>{
     
        getUserIdFromStorage().then(id=>{
            setUserId(id)
        })
        console.warn(props.route.params.cart)
       
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
