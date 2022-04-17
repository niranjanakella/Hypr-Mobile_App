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
import { changePassword } from '../../actions/auth';

const ChangePassword = (props) => {
    const [state, setState] = React.useState({
        hidePassword: true,
        password: '',
        passwordErr: false,
        passwordErrMsg: "",
        oldPassword: "",
        oldPasswordErr: false,
        oldPasswordErrMsg: "",
        hideOldPassword: true
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
    const handleChangePassword = () => {
        Keyboard.dismiss()

        if (state.password.length === 0) {
            setState({
                ...state,
                passwordErr: true,
                passwordErrMsg: "Please enter password."
            })
            return 1;
        }
        const payload = {
            "newPassword": state.password,
            "oldPassword": state.oldPassword
        }
        props.dispatch(changePassword(payload))
    }

    return (
        <>
            <StatusBar backgroundColor={constants.Colors.primary} barStyle="dark-content" />
            <SafeAreaView style={styles.secondryContainer}>
            <Components.PrimaryHeader
                onPress={() => props.navigation.goBack()}
                title="Change Password"
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
                                placeholder=" Old Password"
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
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder=" New Password"
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

                    </View>
                </KeyboardAwareScrollView>
                <View style={{ width: "100%", paddingHorizontal: 15 }}>
                    <Components.PrimaryButton
                        onPress={handleChangePassword}
                        title="CHANGE PASSWORD"
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
)(ChangePassword)