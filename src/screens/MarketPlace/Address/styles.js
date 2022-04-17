import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

import constants from '../../../constants';
import Fonts from '../../../constants/Fonts';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    dataContainer: {
        paddingHorizontal: 15,
        flex: 1
    },
    text20bold: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    inputContainer: {
        marginTop: constants.vh(20)
    },
    buttonContainer: {
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: constants.vw(30)
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
        backgroundColor: constants.Colors.white,
        borderWidth:1,
        borderColor:constants.Colors.fade,
        width: "100%",
        maxHeight: constants.vh(550),
        paddingHorizontal: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 10
    },
    label:{
        fontFamily:Fonts.GothamBold,
        fontSize:18,
        paddingBottom:10
    }
})
