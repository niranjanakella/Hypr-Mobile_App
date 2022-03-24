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
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
const SplashScreen = (props) => {
    return (
        <>
             <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            {/* <LinearGradient
                        start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                        colors={[constants.Colors.gradient.contrast_1, constants.Colors.gradient.contrast_3]}
                        style={[styles.linearGradient]}>                            */}
                 {/* <Image
                        resizeMode="center"                        
                        source={constants.Images.logo}
                        blurRadius={2}
                /> */}
              
            {/* </LinearGradient>  */}
              
                <SafeAreaView style={styles.container}>
                    <Image
                        resizeMode="cover"
                        style={styles.splashImage}
                        source={constants.Images.splash_screen_background}
                        blurRadius={2}
                    />
                      <Animatable.Image
                        animation="fadeIn"
                        resizeMode="center"                        
                        source={constants.Images.logo}
                        style={styles.logo}
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
    logo:{
        position:'absolute',
        width: constants.width_dim_percent * 120,
        height: constants.height_dim_percent * 120,
    },
    linearGradient: {
        
        justifyContent: "center",
        alignItems: "center"
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