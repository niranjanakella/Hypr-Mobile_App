import React, { useEffect } from 'react';
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
import { login, setSocialMediaData, todayCurrencyRate } from '../../actions/auth';
import FacebookLogin from '../../utils/Facebook/FacebookLogin'
import GoogleLogin from '../../utils/Google/GoogleLogin';

const LogIn = (props) => {
    const [state, setState] = React.useState({
        hidePassword: true,
        email: '',
        emailErr: false,
        emailErrMsg: "",
        password: '',
        passwordErr: false,
        passwordErrMsg: "",
        social_id: null,
        social_type: ""
    })
    const handlePasswordShow = () => {
        setState({
            ...state,
            hidePassword: !state.hidePassword
        })
    }
    const handleSignIn = () => {
        Keyboard.dismiss()
        if (state.email.length === 0) {
            setState({
                ...state,
                emailErr: true,
                emailErrMsg: "Please enter email."
            })
            return 1;
        }
        if (!EmailValidator.validate(state.email.toLowerCase())) {
            setState({
                ...state,
                emailErr: true,
                emailErrMsg: "Please enter valid email."
            })
            return 1;
        }
        if (state.password.length === 0) {
            setState({
                ...state,
                passwordErr: true,
                passwordErrMsg: "Please enter password."
            })
            return 1;
        }
        const payload = {
            "email": state.email.toLowerCase(),
            "password": state.password
        }
        
        props.dispatch(login(payload))

    }
    const handleSignWithFacebook = (fbData) => {
        console.log('fbdata', fbData);
        if (fbData.hasOwnProperty('id')) {
            setState({
                ...state,
                social_id: fbData.id,
                social_type: "facebook"
            })
            const payload = {
                social_id: fbData.id,
                social_type: "facebook"
            }
            const payloadForSetData = {
                firstName: fbData.first_name,
                lastName: fbData.last_name,
                email: "",
                social_type: "facebook",
                id: fbData.id
            }
            // props.dispatch(setSocialMediaData(payloadForSetData))
            props.dispatch(login(payload))
        }
    }
    const handleSignInWithGoogle = (result) => {
        console.log("result google", result);
        setState({
            ...state,
            social_id: result.user.id,
            social_type: "google"
        })
        const payload = {
            social_id: result.user.id,
            social_type: "google"
        }
        const payloadForSetData = {
            firstName: result.user.givenName,
            lastName: result.user.familyName,
            email: result.user.email,
            social_type: "google",
            id: result.user.id
        }
        // props.dispatch(setSocialMediaData(payloadForSetData))
        props.dispatch(login(payload))
    }
    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            <SafeAreaView style={styles.secondryContainer}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    extraHeight={140}
                >
                    <View style={styles.dataContainer}>
                        <Image
                            source={constants.Images.logo}
                            style={{
                                width: constants.vw(150),
                                height: constants.vw(150),
                                resizeMode: "contain"
                            }}
                        />
                        <Text style={styles.loginText}></Text>
                        <Text style={styles.loginText}></Text>

                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Email"
                                keyboardType="email-address"
                                isError={state.emailErr}
                                error={state.emailErrMsg}
                                onChangeText={(email) => {
                                    setState({
                                        ...state,
                                        email: email,
                                        emailErr: false,
                                        emailErrMsg: ""
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Password"
                                isError={state.passwordErr}
                                error={state.passwordErrMsg}
                                showSecure={true}
                                isSecure={state.hidePassword}
                                onIconpress={handlePasswordShow}
                                onChangeText={(password) => {
                                    setState({
                                        ...state,
                                        password: password,
                                        passwordErr: false,
                                        passwordErrMsg: ""
                                    })
                                }}
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                NavigationService.navigate(constants.ScreensName.ForgotPassword.name, null)
                            }}
                            style={styles.forgotPasswordContainer}>
                            <Text style={{
                                color: constants.Colors.linkText
                            }}>Forgot Password?</Text>

                        </TouchableOpacity>

                        <View style={[styles.inputContainer, { width: "100%" }]}>
                            <Components.PrimaryButton
                                onPress={handleSignIn}
                                title="SIGN IN"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "500",
                                color: constants.Colors.placeholder
                            }}>or continue with</Text>
                        </View>

                        <View style={styles.socialMediaContainer}>
                            <FacebookLogin
                                handleOnPress={(fbData) => { handleSignWithFacebook(fbData) }}
                            />

                            <GoogleLogin
                                webClientId='408585678188-uq09l9rv6e9ps5qv3341p0edf7g9n6in.apps.googleusercontent.com'
                                offlineAccess={false}
                                forceConsentPrompt={true}
                                handleOnPress={(result) => { handleSignInWithGoogle(result) }}
                            />
                            <AntDesign
                                name="linkedin-square"
                                color={"rgb(0,116,172)"}
                                size={35}
                            />
                        </View>

                        <View style={styles.signupTextContainer}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "500",
                                color: constants.Colors.placeholder
                            }}>Don't have an account?</Text>
                            <Text>{" "}</Text>
                            <Text
                                onPress={() => { NavigationService.navigate(constants.ScreensName.SignUp.name, null) }}
                                style={{
                                    fontSize: 18,
                                    fontWeight: "500",
                                    color: constants.Colors.linkText
                                }}
                            >Sign up</Text>
                        </View>

                    </View>

                </KeyboardAwareScrollView>
                <Components.ProgressView
                    isProgress={props.auth.isLoading}
                    title="Hypr"
                />
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
)(LogIn)