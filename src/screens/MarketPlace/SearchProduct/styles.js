import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    headerContainer: {
        backgroundColor: constants.Colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
})