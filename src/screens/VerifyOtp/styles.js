import {
    StyleSheet,
    Platform,
    Dimensions,
    StatusBar
} from 'react-native';

import constants from '../../constants';
import Fonts from '../../constants/Fonts';
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
        alignItems: "center",
        paddingHorizontal: 15,
        marginTop: constants.vh(40)
    },
    loginText: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: constants.vh(10)
    },
    inputContainer: {
        marginTop: constants.vh(20)
    },
    forgotPasswordContainer: {
        alignSelf: "flex-end",
        marginTop: constants.vh(20)
    },
    socialMediaContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "60%",
        marginTop: constants.vh(30)
    },
    signupTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: constants.vh(40)
    },
    title_container:{               
        alignContent:'center',
        alignSelf:'center'
    },
    otp: { 
        textAlign: "center", 
        fontSize: 20,
        color:constants.Colors.dark_text ,        
        fontFamily:Fonts.GothamBold
    },
    otp_desc: { 
      textAlign: "center", 
      fontSize: 18,      
      fontFamily:'Btha',
      color:constants.Colors.dark_text,      
    },
})