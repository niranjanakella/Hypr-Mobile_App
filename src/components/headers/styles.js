import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';

import constants from '../../constants';
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    headerWithSearchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: 'transparent',
        paddingHorizontal: 15,
    },
    headerWithSearchInput: {
        width: "55%",
        paddingVertical: constants.vh(5),
        borderWidth: 1,        
        borderRadius: 10,
        color: constants.Colors.blue_primary,
        paddingHorizontal: constants.vw(10)
    },
    text12500: {
        fontSize: 12,
        color: constants.Colors.white
    },
    hitSlop: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    }
})