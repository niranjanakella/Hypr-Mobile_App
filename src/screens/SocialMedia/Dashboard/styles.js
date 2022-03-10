import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white,
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
    divider: {
        height: 1,
        backgroundColor: "grey",
        width: WIDTH,
        marginVertical: constants.vh(5)
    },
    buttons: {
        paddingVertical: constants.vh(10),
        width: constants.vw(80),
        borderRadius: 4,
        borderWidth: 1,
        borderColor: constants.Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: constants.vw(20)
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: constants.vh(5)
    },
    writeSomethingContainer: {
        paddingVertical: constants.vw(15),
        paddingHorizontal: constants.vw(15),
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 15,

    },
    writeSomethingImage: {
        width: constants.vw(50),
        height: constants.vw(50),
        borderRadius: constants.vw(60 / 2),
    },
    writeSomething: {
        padding: constants.vh(15),
        width: constants.vw(250),
        borderRadius: 30,
        backgroundColor: constants.Colors.light_grey,
        marginStart: constants.vw(15)
    },
    text14500: {
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center"
    },
    text18bold: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase"
    },

})