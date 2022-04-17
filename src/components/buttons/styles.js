import {
    StyleSheet,
    Platform
} from 'react-native';

import constants from '../../constants';
import Fonts from '../../constants/Fonts';
export const styles = StyleSheet.create({
    primaryButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        
    },

    ThirdButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth:1,
    
        
    },    
    primaryOutlineButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        
    },
    linearGradient: {
        //flex: 1,
        width: "100%",
        borderRadius: 10
    },
    calendarButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: constants.vw(20),
        paddingVertical: constants.vh(10),
        backgroundColor: constants.Colors.color_333333,
        borderRadius: 8
    },
    dobAndArrowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "89%"
    },
    text16600: {
        fontSize: 16,
        fontWeight: "600",
        color: constants.Colors.white,
        fontFamily:Fonts.GothamBold
    },
    textOutlineButton: {
        fontSize: 16,
        fontWeight: "600",
        color: constants.Colors.blue_primary,
        fontFamily:Fonts.GothamBold,
        borderColor:constants.Colors.blue_primary,
        borderWidth:1,
        textAlign:'center',
        width: "100%",
        borderRadius:10,
        paddingHorizontal:constants.vw(16),
        paddingVertical:constants.vh(16),
    },
    text13normal: {
        fontSize: 13,
        //fontWeight: "600",
        color: constants.Colors.color_B9B9B9
    },
    text16normal: {
        fontSize: 16,
        //fontWeight: "600",
        color: constants.Colors.white
    },


    containerWithIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iconContainer: {
        // width: '10%',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: constants.vw(25),
        height: constants.vw(25),
        resizeMode: 'contain'

    }

})