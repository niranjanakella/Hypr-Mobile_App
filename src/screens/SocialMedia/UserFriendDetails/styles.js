import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    coverImage: {
        width: "100%",
        height: constants.vh(200)
    },
    coverImageCameraCotainer: {
        padding: constants.vw(10),
        borderRadius: 100,
        backgroundColor: constants.Colors.light_grey,
        position: "absolute",
        right: constants.vw(10),
        top: Platform.OS === "ios" ? constants.vh(140) : constants.vh(130)
    },
    profileImageContainer: {
        borderRadius: constants.vh(200),
        borderWidth: 5,
        borderColor: constants.Colors.white,
        alignSelf: "center",
        justifyContent: "center",
        position: "absolute",
        top: constants.vh(120),
    },
    profileImage: {
        width: constants.vh(150),
        height: constants.vh(150),
        borderRadius: constants.vh(75),
    },
    secondryDataContainer: {
        position: "absolute",
        marginTop: constants.vh(285)
    },
    paddingHorizontal15: {
        paddingHorizontal: 15
    },
    text18bold: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase"
    },
    friendRequestButtonContainer: {
        paddingHorizontal: constants.vw(10),
        paddingVertical: constants.vh(10),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: constants.Colors.primary,
        borderRadius: 10,
        marginHorizontal: 15
    },
    friendRequestText: {
        color: "#fff",
        marginStart: 10,
        fontSize: 16
    },
})