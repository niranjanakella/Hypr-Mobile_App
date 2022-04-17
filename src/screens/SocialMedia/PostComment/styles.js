import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

const HEIGHT = Dimensions.get("window").height
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    CrossIconContainer: {
        alignSelf: "flex-end",
        marginEnd: 15
    }
})