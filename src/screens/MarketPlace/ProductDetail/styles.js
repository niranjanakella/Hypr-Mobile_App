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
        backgroundColor: constants.Colors.white
    },
    secondryContainer: {
        flex: 1,
        backgroundColor: constants.Colors.white,
        paddingHorizontal: 15,
    },
    headerContainer: {
        backgroundColor: constants.Colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    sliderContainer: {
        width: "100%",
    },
    ProductNamePriceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    ProductNameContainer: {
        width: "50%"
    },
    text16500: {
        fontSize: 18,
        fontWeight: "bold",
        color: constants.Colors.primary
    },
    text14500: {
        fontSize: 14,
        fontWeight: "500",
        color:"#339FFF"
    },
    variantContainer: {
        marginTop: constants.vh(10)
    },
    variantStyle: {
        paddingHorizontal: constants.vw(15),
        paddingVertical: constants.vh(7),
        //borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: constants.vw(5),
        //borderColor: "grey",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginVertical:5
    },
    offerContainer: {
        padding: constants.vw(10),
        //borderWidth: 1,
        borderRadius: 20,
        marginTop: constants.vh(20),
        borderColor: "grey"
    },
    offerDetailContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: constants.vh(4)
    },
    dot: {
        width: constants.vw(10),
        height: constants.vw(10),
        borderRadius: constants.vw(5),
        backgroundColor: constants.Colors.secondry
    },
    text30bold: {
        fontSize: 25,
        color: "#000"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center",
        width: "98%",
        alignSelf:"center"
    },
    titleContainer: {
        marginTop: constants.vh(20),
    },
    pincodeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    textNotAvailable: {
        color: "red"
    }

})