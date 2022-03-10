import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
} from 'react-native-fbsdk';
import Toast from 'react-native-toast-message';

import constants from '../../../constants';
import components from '../../../components';


class FacebookLogin extends Component {

    constructor(props) {
        super(props);
        this.state = { userInfo: null };
    }

    getData = () => {
        console.log('userInfo===>', this.state.userInfo)
        this.props.handleOnPress(this.state.userInfo)
    }
    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id,name,first_name,last_name',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, user) => {
                if (error) {
                    this.setState({ userInfo: error }, () => this.getData())
                    console.log('login info has error: ' + error);

                } else {
                    this.setState({ userInfo: user }, () => this.getData());
                    console.log('result:', user);
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };

    loginWithFacebook = () => {
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(['public_profile']).then(
            login => {
                if (login.isCancelled) {
                    Toast.showWithGravity('Login cancelled', Toast.LONG, Toast.TOP);
                    this.setState({ userInfo: "Login cancelled" }, () => this.getData())
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        const accessToken = data.accessToken.toString();
                        this.getInfoFromToken(accessToken);
                    });
                }
            },
            error => {
                this.setState({ userInfo: error }, () => this.getData())
                Toast.showWithGravity(JSON.stringify(error), Toast.LONG, Toast.TOP);
                console.log('Login fail with error: ' + error);
            },
        );

    };

    state = { userInfo: {} };

    render() {
        //const { t } = this.props;
        return (
            <View style={styles.container}>
                <components.ButtonWithIcon
                    onPress={this.loginWithFacebook}
                    iconName={'facebook-square'}
                    iconColor={"rgb(65,135,227)"}
                    iconSize={35}
                //title={this.props.t('signInWithFacebook')}
                />
            </View>
        );
    }
}

export default FacebookLogin;
//export default withTranslation()(FacebookLogin)

const styles = StyleSheet.create({
    container: {

    },
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