import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    renderSelected: {
        borderRadius: 10,
        padding: constants.vw(15),
        borderRadius: 10,
        flexDirection: "column",
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
        margin: 5
    },
    removeSelected: {
        position: "absolute",
        right: 4,
        top: 4
    }
})