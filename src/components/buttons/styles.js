import {
    StyleSheet,
    Platform
} from 'react-native';

import constants from '../../constants';

export const styles = StyleSheet.create({
    primaryButtonContainer: {
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
        fontFamily:'GothamBold'
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