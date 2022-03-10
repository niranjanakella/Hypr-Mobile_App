import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    friendContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        marginVertical: constants.vh(10)
    },
    text18bold: {
        fontSize: 18,
        fontWeight: "bold",
        color: constants.Colors.primary
    },
    text16normal: {
        fontSize: 16,
        color: constants.Colors.primary
    },
    searchContainer: {
        padding: constants.vw(10),
        backgroundColor: constants.Colors.light_grey,
        borderRadius: 10
    }
})