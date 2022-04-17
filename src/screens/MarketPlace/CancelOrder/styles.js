import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    inputContainer: {
        marginTop: constants.vh(20)
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