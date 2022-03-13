import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';

import constants from '../../constants';
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    hitSlop: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    },
    input: {
        paddingVertical: constants.vh(16),
        paddingHorizontal: constants.vw(20),
        width: "100%",
        borderRadius: 8,
        backgroundColor: constants.Colors.inputBackground,
        borderWidth:1,
        fontFamily:'Gotham_light',
        fontSize: 16,
    },
    secureIconContainer: {
        position: "absolute",
        right: constants.vw(18)
    },
    phoneInputContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: constants.vw(20),
        paddingVertical: constants.vh(10),
        backgroundColor: constants.Colors.inputBackground,
        width: "100%",
        borderRadius: constants.vw(10),
    },
    flagContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "20%",
    },

    verticalSeperator: {
        width: 1,
        height: "100%",
        backgroundColor: "#000",
        marginHorizontal: constants.vw(18)
    },
    codeAndPhoneContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    phoneNumber: {
        fontSize: 16,
        marginStart: constants.vw(10),
        width: "68%"
    },
    text16normal: {
        fontSize: 16,
    },
    text13normal: {
        fontSize: 13,
    },
    inputMultiline: {
        paddingVertical: constants.vh(16),
        paddingHorizontal: constants.vw(20),
        width: "100%",
        borderRadius: 8,
        backgroundColor: constants.Colors.color_333333,
        fontSize: 16,
        fontFamily: constants.Fonts.K2D_Regular,
        color: constants.Colors.white,
        height: 200,
        textAlignVertical: "top"
    },
    dropdownContainer: {
        paddingVertical: constants.vh(16),
        paddingHorizontal: constants.vw(20),
        width: "100%",
        borderRadius: 8,
        backgroundColor: constants.Colors.inputBackground,
        fontSize: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    sendReplyInputContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: constants.vw(10),
        paddingVertical: constants.vw(15),
        borderRadius: 30,
        backgroundColor: "#fff"
    },
    sendReplyInput: {
        paddingVertical: 0,
        width: "82%",
        marginHorizontal: constants.vw(5),
        fontSize: 16,
    }
})