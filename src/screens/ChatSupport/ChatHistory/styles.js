import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    chatCardContainer:{
        margin:5,
        padding:constants.vw(10),
        borderRadius:10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText:{
        fontSize:16,
        fontWeight:"bold",
        marginVertical:3
    },
    dataText:{
        fontSize:16,
        fontWeight:"400"
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