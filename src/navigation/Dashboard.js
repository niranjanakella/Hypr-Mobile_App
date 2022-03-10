import React from 'react';
import { Dimensions, StyleSheet, Image, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import constants from '../constants';

//Dashboard
import Dashboard from '../screens/Dashboard';
import Network from '../screens/Network';
import OrderSummary from '../screens/MarketPlace/OrderSummary';
import OrderDetails from '../screens/MarketPlace/OrderDetails';
import CancelOrder from '../screens/MarketPlace/CancelOrder';
import ChatSupport from '../screens/ChatSupport';
import ChatHistory from '../screens/ChatSupport/ChatHistory';

const DashboardStack = createStackNavigator();

export const DashboardStackFunc = () => {
    return (
        <DashboardStack.Navigator
            headerMode={"none"}
        >
            <DashboardStack.Screen
                component={Dashboard}
                name={constants.ScreensName.Dashboard.name}
                options={{ gestureEnabled: false }}
            />
            <DashboardStack.Screen
                component={Network}
                name={constants.ScreensName.Network.name}
                options={{ gestureEnabled: false }}
            />
            <DashboardStack.Screen
                component={OrderSummary}
                name={constants.ScreensName.OrderSummary.name}
                options={{ gestureEnabled: false }}
            />
            <DashboardStack.Screen
                component={OrderDetails}
                name={constants.ScreensName.OrderDetails.name}
                options={{ gestureEnabled: false }}
            />
            <DashboardStack.Screen
                component={CancelOrder}
                name={constants.ScreensName.CancelOrder.name}
                options={{ gestureEnabled: false }}
            />
            <DashboardStack.Screen
                component={ChatSupport}
                name={constants.ScreensName.ChatSupport.name}
                options={{ gestureEnabled: false }}
            />
            <DashboardStack.Screen
                component={ChatHistory}
                name={constants.ScreensName.ChatHistory.name}
                options={{ gestureEnabled: false }}
            />
        </DashboardStack.Navigator>
    )
}