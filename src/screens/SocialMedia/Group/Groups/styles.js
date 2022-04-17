import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    text18bold: {
        fontSize: 18,
        fontWeight: "bold"
    },
    writeSomething: {
        padding: constants.vh(15),
        width: "100%",
        borderRadius: 30,
        backgroundColor: constants.Colors.light_grey,
    },
})