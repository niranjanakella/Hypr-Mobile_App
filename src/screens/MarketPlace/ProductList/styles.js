import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    secondryContainer: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    viewAllContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        backgroundColor: "#fff",
        marginTop: constants.vh(10),
        paddingHorizontal: constants.vw(10),
        paddingVertical: constants.vh(10),
        // borderWidth: 1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    text16bold: {
        fontSize: 16,
        fontWeight: "bold"
    },
    headerContainer: {
        backgroundColor: constants.Colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
})