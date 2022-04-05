import {
    StyleSheet,
    Platform,
    Dimensions,
    StatusBar
} from 'react-native';

import constants from '../../../constants';
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;

export const STATUSBAR_HEIGHT = Platform.select({
    ios: isIPhoneX() ? 34 : 0,  //44 & 20
    android: 0,   //StatusBar.currentHeight
    default: 0
})

const iPhoneX = Dimensions.get('window').height >= 812


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.primary_bg_color
    },
    secondryContainer: {
        flex: 1,
        backgroundColor: constants.Colors.primary_bg_color
    },
    viewAllContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        backgroundColor: "#fff",
        marginTop: constants.vh(10),
        paddingHorizontal: constants.vw(10),
        paddingVertical: constants.vh(10),
        // borderWidth: 1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    headerContainer: {
        backgroundColor: constants.Colors.primary,
        paddingHorizontal: 10,
        //paddingVertical: 10
    },
    text16bold: {
        fontSize: 16,
        fontWeight: "bold"
    },
    text14400: {
        fontSize: 14,
        fontWeight: "400",
        color: constants.Colors.placeholder
    },
    viewallButton: {
        width: "30%"
    },
    timerContainer: {
        marginStart: constants.vw(10)
    },
    secondryviewAllContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    }

})