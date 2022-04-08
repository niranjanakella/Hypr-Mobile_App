import React from 'react';
import { Dimensions, StyleSheet, Image, View } from "react-native";
import constants from '../constants';

//Settings
import MyAccount from '../screens/MyAccount';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import ChangeCurrency from '../screens/ChangeCurrency';
import MyOrders from '../screens/MyOrders';
import {CardStyleInterpolators} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const MyOrdersStack = createMaterialTopTabNavigator();

export const MyOrdersStackFunc = () => {
    return (
        <MyOrdersStack.Navigator
            headerMode={"none"}
        >      
            <MyOrdersStack.Screen
                component={MyOrders}
                name={constants.ScreensName.MyOrders.name}
                options={{ gestureEnabled: false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            />       
        </MyOrdersStack.Navigator>
    )
}