import React from 'react';
import {
    SafeAreaView,
    View,
    Image,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import constants from '../../constants';
import Components from '../../components';

const SplashScreen = (props) => {
    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Image
                    resizeMode="cover"
                    style={styles.splashImage}
                    source={constants.Images.splash_screen_background}
                    blurRadius={2}
                />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white,
        justifyContent: "center",
        alignItems: "center"
    },
    splashImage: {
        width: constants.width_dim_percent * 100,
        height: constants.height_dim_percent * 100,
    },
})

function mapStateToProps(state) {
    const { login } = state
    return {
        login

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
)(SplashScreen);