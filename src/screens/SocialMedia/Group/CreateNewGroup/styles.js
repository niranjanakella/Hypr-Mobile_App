import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../../constants';

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white,
    },
    dataContainer: {
        paddingHorizontal: 15
    },
    inputContainer: {
        marginTop: constants.vh(20)
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
    profileImageCameraContainer: {
        padding: constants.vw(10),
        borderRadius: 100,
        backgroundColor: constants.Colors.light_grey,
        position: "absolute",
        top: constants.vh(230),
        left: WIDTH / 2 + constants.vw(20),
    },
    secondryDataContainer: {
    },
    paddingHorizontal15: {
        paddingHorizontal: 15
    },
    //Modal
    modalContainer: {
        position: "absolute",
        //top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    modalDataContainer: {
        backgroundColor: constants.Colors.secondry,
        width: "100%",
        maxHeight: constants.vh(550),
        paddingHorizontal: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 10
    }
})