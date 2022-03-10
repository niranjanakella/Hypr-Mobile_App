
import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import PropTypes from "prop-types";
import Toast from 'react-native-simple-toast';

import components from '../../../components';
import constants from '../../../constants';

export default class GoogleLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            loggedIn: false,
        }
    }
    componentDidMount() {
        GoogleSignin.configure({
            webClientId: this.props.webClientId,
            offlineAccess: this.props.offlineAccess,
            hostedDomain: this.props.hostedDomain,
            forceConsentPrompt: this.props.forceConsentPrompt,
        });
    }

    _signIn = async () => {
        console.log("trying to login");
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            this.setState({ userInfo: userInfo, loggedIn: true });
            this.getDataFromGoogle();

        } catch (error) {
            console.log("google login error", error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Toast.showWithGravity('user cancelled the login', Toast.LONG, Toast.TOP);
                this.setState({ userInfo: "user cancelled the login flow" }, () => this.getDataFromGoogle())
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Toast.showWithGravity('Sign in is in progress already', Toast.LONG, Toast.TOP);
                this.setState({ userInfo: "Sign in is in progress already" }, () => this.getDataFromGoogle())
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Toast.showWithGravity('play services not available or outdated', Toast.LONG, Toast.TOP);
                this.setState({ userInfo: "play services not available or outdated" }, () => this.getDataFromGoogle())
                // play services not available or outdated
            } else {
                this.setState({ userInfo: "some other error happened" }, () => this.getDataFromGoogle())
                // some other error happened
            }
        }
    };

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
                this.setState({ loggedIn: false },);
            } else {
                // some other error
                this.setState({ loggedIn: false });
            }
        }
    };

    getDataFromGoogle = () => {
        this.props.handleOnPress(this.state.userInfo)
    }

    render() {
        const {
            webClientId,
            offlineAccess,
            hostedDomain,
            forceConsentPrompt,
            ...GoogleSigninProps
        } = this.props;
        return (
            <View>
                {/* <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn}
                    disabled={this.state.isSigninInProgress} 
                    {...GoogleSigninProps}
                    /> */}
                <TouchableOpacity
                    onPress={this._signIn}
                    activeOpacity={1}
                >
                    <Image
                        source={constants.Images.google}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
                {/* <components.ButtonWithIcon
                    onPress={this._signIn}
                    iconName={'google'}
                    //iconColor={constants.Colors.black}
                    iconSize={20}
                /> */}
            </View>
        );
    }
}
GoogleLogin.propTypes = {
    webClientId: PropTypes.string,
    offlineAccess: PropTypes.bool,
    hostedDomain: PropTypes.string,
    forceConsentPrompt: PropTypes.bool
};

GoogleLogin.defaultProps = {
    webClientId: "",
    offlineAccess: true,
    hostedDomain: "",
    forceConsentPrompt: true
};



const styles = StyleSheet.create({
    regular: {
        fontSize: constants.vw(14),
        fontFamily: constants.Fonts.SF_PRO_REGULAR
    },
    button: {
        borderColor: constants.Colors.buttonBorderColor,
        borderWidth: constants.vw(0.5),
        paddingVertical: constants.vh(15)
    },
})