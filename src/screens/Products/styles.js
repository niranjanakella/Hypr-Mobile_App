import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../constants';

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
    filterAndSortContainer:{
        alignSelf: "flex-end",
        paddingHorizontal: 15,
        position:"absolute",
        bottom:constants.vh(50)
    },
    filter:{
        padding:constants.vw(5),
        backgroundColor:constants.Colors.primary,
        borderRadius:10,
        marginVertical:5
    },
})