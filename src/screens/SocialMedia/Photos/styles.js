import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    renderPhoto: {
        margin: constants.vw(10),
        width: "45%",
        height: constants.vh(150),
        borderRadius: 10
    }
})