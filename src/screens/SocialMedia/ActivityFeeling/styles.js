import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    headerButton: {
        borderBottomWidth: 3,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: constants.vh(10)
    },
    feeling: {
        borderRadius: 10,
        paddingVertical: constants.vw(10),
        paddingHorizontal: constants.vw(20),
        borderRadius: 10,
        justifyContent: "center",
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
        width: "45%",
        marginHorizontal: "2.5%",
        marginVertical: constants.vh(10),
        borderWidth: 1
    },
    text16normal: {
        fontSize: 16,
    },
    text18bold: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "capitalize"
    },
})