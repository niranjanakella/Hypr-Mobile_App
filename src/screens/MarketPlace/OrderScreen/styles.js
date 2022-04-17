import {
    StyleSheet,
    Platform,
    Dimensions,
    StatusBar
} from 'react-native';

import constants from '../../../constants';
import Fonts from '../../../constants/Fonts';
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
        backgroundColor: constants.Colors.white,
        paddingHorizontal: 15,
    },
    deliveryDetails:{
        flexDirection: "row",
        justifyContent: "space-between",    
        bottom:constants.height_dim_percent * 5,    
        backgroundColor: constants.Colors.white,        
        paddingHorizontal:constants.width_dim_percent  * 2,
        paddingVertical:constants.height_dim_percent  * 5,
        alignItems: "center"
    },
    deliveryDetailsText:{
        fontSize: 18,
        fontWeight: "bold",
        fontFamily:Fonts.GothamBold,
        color: constants.Colors.dark_text
    },
    modeOfPayment:{
        flexDirection: "row",
        justifyContent: "space-between",    
        bottom:constants.height_dim_percent * 4,    
        backgroundColor: constants.Colors.white,        
        paddingHorizontal:constants.width_dim_percent  * 2,
        paddingVertical:constants.height_dim_percent  * 5,
        alignItems: "center"
    },
    modeOfPaymentText:{
        fontSize: 18,
        fontWeight: "bold",
        fontFamily:Fonts.GothamBold,
        color: constants.Colors.dark_text
    },
    headerContainer: {
        backgroundColor: constants.Colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
})