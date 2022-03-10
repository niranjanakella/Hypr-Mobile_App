import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    dataContainer: {
        marginHorizontal: 15,
        flex: 1
    },
    input: {
        paddingVertical: constants.vh(16),
        paddingHorizontal: constants.vw(20),
        width: "100%",
        borderRadius: 8,
        backgroundColor: constants.Colors.inputBackground,
        fontSize: 16,
    },
    userDetailsCard: {
        paddingVertical: constants.vw(15),
        paddingHorizontal: constants.vw(15),
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
    }
})