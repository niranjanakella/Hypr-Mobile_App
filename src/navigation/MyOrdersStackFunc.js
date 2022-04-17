import React from 'react';
import { Dimensions, StyleSheet, Image, View } from "react-native";
import constants from '../constants';

//Settings
import MyAccount from '../screens/MyAccount';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import ChangeCurrency from '../screens/ChangeCurrency';
import { connect } from 'react-redux';
import {CardStyleInterpolators} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Components from '../components';
import ToPay from '../screens/ToPay';
import Fonts from '../constants/Fonts';
const MyOrdersStack = createMaterialTopTabNavigator();

const MyOrdersStackFunc = (props) => {
    console.warn(props);
    return (
        <>
        <Components.PrimaryHeader
            title={"My Orders"}    
            onPress={()=>props.navigation.goBack()}        
        />
        <MyOrdersStack.Navigator
            options={{
                tabBarLabelStyle:{fontFamily:Fonts.GothamBold,fontSize:10,textTransform:'capitalize'},   
                          
            }}
            tabBarOptions={{
                activeTintColor:constants.Colors.blue_primary,
                inactiveTintColor:constants.Colors.dark_text,
                indicatorStyle:{
                    backgroundColor:constants.Colors.blue_primary
                }
            }}
            initialRouteName="ToPay"
        >      
            <MyOrdersStack.Screen
                component={ToPay}
                name={constants.ScreensName.ToPay.name}                
                options={{ gestureEnabled: false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,tabBarLabel:'To Pay' }} 


            />    

           
        </MyOrdersStack.Navigator>
        </>
    )
}


function mapStateToProps(state) {
    let { auth, market } = state;
    return {
        auth,
        market
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrdersStackFunc);