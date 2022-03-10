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
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as EmailValidator from 'email-validator';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';

import constants from '../../constants';
import Components from '../../components';
import { styles } from './styles';
import { forgotPassword } from '../../actions/auth';

const ForgotPassword = (props) => {
    const [state, setState] = React.useState({
        hidePassword: true,
        password: '',
        passwordErr: false,
        passwordErrMsg: "",
        oldPassword: "",
        oldPasswordErr: false,
        oldPasswordErrMsg: "",
        hideOldPassword: true,
        email: "",
        emailErr: false,
        emailErrMsg: ""
    })
    const handlePasswordShow = () => {
        setState({
            ...state,
            hidePassword: !state.hidePassword
        })
    }
    const handleOldPasswordShow = () => {
        setState({
            ...state,
            hideOldPassword: !state.hideOldPassword
        })
    }
    const handleForgotPassword = () => {
        Keyboard.dismiss()

        if (state.email.length === 0) {
            setState({
                ...state,
                passwordErr: true,
                passwordErrMsg: "Please enter email."
            })
            return 1;
        }
        if (!EmailValidator.validate(state.email)) {
            setState({
                ...state,
                passwordErr: true,
                passwordErrMsg: "Please enter valid email."
            })
            return 1;
        }
        const payload = {
            "email": state.email
        }
        props.dispatch(forgotPassword(payload))
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={styles.secondryContainer}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Reset Password"
                />
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

                        {/* <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Old Password"
                                isError={state.oldPasswordErr}
                                error={state.oldPasswordErrMsg}
                                showSecure={true}
                                isSecure={state.hideOldPassword}
                                onIconpress={handleOldPasswordShow}
                                onChangeText={(password) => {
                                    setState({
                                        ...state,
                                        oldPassword: password,
                                        oldPasswordErr: false,
                                        oldPasswordErrMsg: ""
                                    })
                                }}
                            />
                        </View> */}
                        {/* <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="New Password"
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
                        </View> */}

                    </View>
                </KeyboardAwareScrollView>
                <View style={{ width: "100%", paddingHorizontal: 15 }}>
                    <Components.PrimaryButton
                        onPress={handleForgotPassword}
                        title="FORGOT PASSWORD"
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
)(ForgotPassword)