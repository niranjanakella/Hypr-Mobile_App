import { StyleSheet, Platform, Dimensions } from 'react-native';

import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.white
    },
    dataContainer:{
        flex:1,
        paddingHorizontal:15
    },
    detailsContainer :{
        marginVertical:constants.vh(5)
    }
   
})