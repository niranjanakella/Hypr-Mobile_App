import {
    StyleSheet,
    Platform,
    Dimensions,
    StatusBar
} from 'react-native';
import { concat } from 'react-native-reanimated';

import constants from '../../constants';
import { height_dim_percent, width_dim_percent } from '../../constants/Dimension';
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: constants.Colors.white
    },
    secondryContainer: {
        marginTop: height_dim_percent * 20,
        backgroundColor: 'transparent'
    },
    dataContainer: {
        
        
        backgroundColor:constants.Colors.white,
        borderWidth:1,
        borderColor:constants.Colors.fade,
        elevation:45,
        width:width_dim_percent * 100,
        height:height_dim_percent * 90,        
        borderRadius:45,
        paddingHorizontal: 15,
        marginTop: constants.vh(1),
    },
    loginText: {
        fontSize: 25,        
        marginTop: constants.vh(50),
        left:constants.width_dim_percent * 1,
        color:constants.Colors.secondry,
        fontFamily:"GothamBold"
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
        alignSelf:'center',
        width: "60%",
        marginTop: constants.vh(30)
    },
    signupTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf:'center',
        marginTop: constants.vh(40)
    }
})