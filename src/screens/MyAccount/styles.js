import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    inputContainer: {
        marginTop: constants.vh(20)
    },
    text18500: {
        fontSize: 18,

    },
    divider: {
        width: "100%",
        height: 2,
        backgroundColor: "#000"
    },
    buttonContainer: {
        marginTop: constants.vh(40),
        marginHorizontal: 2,
        marginVertical: 10,
        paddingVertical: constants.vh(15),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingHorizontal: constants.vw(10)
    },
    text18bold: {
        fontSize: 18,
        fontWeight: "bold"
    },
    text14bold: {
        color: constants.Colors.white,
        fontSize: 14,
        fontWeight: "bold",
        marginStart: constants.vw(5)
    },
    shareButton: {
        padding: constants.vw(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        backgroundColor: constants.Colors.secondry,
        margin: constants.vw(10)
    },
    linkContainer: {
        paddingHorizontal: constants.vw(10),
        paddingVertical: constants.vw(5),
        borderWidth: 0.5,
        borderColor: "grey",
        borderRadius: 5,
        marginVertical: constants.vh(5)
    }

})