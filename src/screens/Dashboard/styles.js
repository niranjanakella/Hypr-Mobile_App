import {
    StyleSheet,
    Platform,
    Dimensions,
    StatusBar
} from 'react-native';

import constants from '../../constants';
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
        backgroundColor: constants.Colors.white
    },
    secondryContainer: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    dataContainer: {
        //alignItems: "center",
        paddingHorizontal: 15,
        marginVertical: constants.vh(10)
    },
    loginText: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: constants.vh(10)
    },
    inputContainer: {
        marginTop: constants.vh(20)
    },
    imageProfile: {
        width: constants.vw(150),
        height: constants.vw(150),
        borderRadius: constants.vw(150 / 2),
        resizeMode: "cover"
    },
    profileNameContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    divider: {
        width: "100%",
        height: 2,
        backgroundColor: "#000"
    },
    followerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: constants.vh(30)
    },
    text16bold: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    hyperBalanceShow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    cardWidth: {
        width: "45%",
        marginHorizontal: 10,
    },
    cardMainContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    }


})