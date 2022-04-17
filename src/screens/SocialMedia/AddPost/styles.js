import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    profileContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: constants.vh(15)
    },
    text14normal: {
        fontSize: 14,
    },
    text18normal: {
        fontSize: 18,

    },
    text18bold: {
        fontSize: 18,
        fontWeight: "bold",
    },
    text20bold: {
        fontSize: 20,
        fontWeight: "bold"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: constants.vh(15),
        marginHorizontal: 1
    },
    button: {
        borderRadius: 10,
        paddingVertical: constants.vw(10),
        paddingHorizontal: constants.vw(10),
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
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
        width: "48%"
    },
    sliderContainer: {
        width: "100%",
    },
})