import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    inputContainer: {
        marginTop: constants.vh(20)
    },
    text18500: {
        fontSize: 18,

    },
    divider: {
        width: "100%",
        height: 2,
        backgroundColor: "#000"
    },
    buttonContainer:{
        marginTop:constants.vh(40),
        marginHorizontal:2,
        marginVertical: 10,
        paddingVertical: constants.vh(15),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingHorizontal: constants.vw(10)
    },
    text16bold:{
        fontSize: 16,
        fontWeight: "bold"
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
        paddingHorizontal: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 10
    },
    searchInput:{
        backgroundColor:"grey",
        width:"50%",
        alignSelf:"center",
        borderRadius:10,
        paddingVertical:0
    }
})