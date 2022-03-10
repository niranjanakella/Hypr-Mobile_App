import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';
const HEIGHT = Dimensions.get("window").height
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    modalContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalDataContainer: {
        marginTop: constants.vh(70),
        height: HEIGHT * 0.85,
        paddingHorizontal: 15,
        backgroundColor: "red",
        width: "100%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingVertical: constants.vh(10),
    },
    modalCommentMain: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    modalCommentSecondry: {
        height: constants.vh(609),
        width: "100%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingVertical: constants.vh(10),
        paddingHorizontal: constants.vw(20),
        marginTop: constants.vh(193)
    },
    modalCrossIconContainer: {
        alignSelf: "flex-end"
    },
    modalDonate: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    donateModalDataContainer: {
        borderRadius: 10,
        padding: constants.vw(20),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        width: "100%"
    },
    coffeeButton: {
        paddingHorizontal: constants.vw(10),
        paddingVertical: constants.vh(10),
        borderRadius: 10,
        backgroundColor: constants.Colors.primary
    },
    textCoffee: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    text18bold: {
        fontSize: 18,
        fontWeight: "bold"
    },
})