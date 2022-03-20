import React from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as EmailValidator from 'email-validator';
import Toast from 'react-native-toast-message';
import * as NavigationService from '../../navigation/NavigationService';
import constants from '../../constants';
import Components from '../../components';
import { styles } from './styles';
import { resendOTP, verifyOtp } from '../../actions/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import FacebookLogin from '../../utils/Facebook/FacebookLogin'
//import GoogleLogin from '../../utils/Google/GoogleLogin';

const VerifyOtp = (props) => {
    const [state, setState] = React.useState({
        otp: null,
    })

    const handleVerifyOtp =  () => {               
        const payload = {
            "otp": state.otp
        }
        
        props.dispatch(verifyOtp(payload))
    }
    const handleResetOtp = () =>{
        let generateOtp = Math.floor(Math.random() * 99999) + 10000;
        
        const payload = {
            "otp": generateOtp
        }
        
        props.dispatch(resendOTP(payload))
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />

            <SafeAreaView style={styles.secondryContainer}>
                <View style={{
                    paddingHorizontal: 15
                }}>
                    <AntDesign
                        onPress={() => props.navigation.goBack()}
                        name="arrowleft"
                        style={{top:constants.height_dim_percent * 2}}
                        size={30}
                    />
                </View>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    extraHeight={140}
                >
                    <View style={styles.dataContainer}>                      
                        <Text style={styles.loginText}></Text>
                        <Text style={styles.loginText}></Text>
                        
                        <View style={styles.title_container} >
                            <Text style={styles.otp}>One Time Pin</Text>
                            <Text style={styles.otp_desc}>
                                Your one time pin has been sent to your email {'\n'}
                                <Text style={[styles.otp_desc,{color:constants.Colors.blue_primary}]}>  developer01000@ </Text>
                            </Text>
                        </View>     

                        <Components.OTPTextView
                            inputCount={5}
                            handleTextChange={(otp) => {                                
                                setState({
                                    ...state,
                                    otp: otp
                                })
                            }}
                            
                            tintColor={constants.Colors.blue_primary}
                            textInputStyle={{
                                width: 40,
                                height: 50,
                                borderWidth: 1,
                                borderRadius: 10,
                                backgroundColor:constants.Colors.mute,
                                borderColor: constants.Colors.primary
                            }}
                        />
                    </View>

                </KeyboardAwareScrollView>
                <Components.ProgressView
                    isProgress={props.auth.isLoading}
                    title="Hypr"
                />
                <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                    <Components.PrimaryButton
                        onPress={handleVerifyOtp}
                        title="VERIFY"
                    />
                </View>

                <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                    <Components.PrimaryOutlineButton
                        onPress={handleResetOtp}
                        title="RESEND OTP"
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
)(VerifyOtp)