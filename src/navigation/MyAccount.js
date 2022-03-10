import React from 'react';
import { Dimensions, StyleSheet, Image, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import constants from '../constants';

//Settings
import MyAccount from '../screens/MyAccount';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import ChangeCurrency from '../screens/ChangeCurrency';

const SettingStack = createStackNavigator();

export const SettingStackFunc = () => {
    return (
        <SettingStack.Navigator
            headerMode={"none"}
        >
            <SettingStack.Screen
                component={MyAccount}
                name={constants.ScreensName.MyAccount.name}
                options={{ gestureEnabled: false }}
            />
            <SettingStack.Screen
                component={EditProfile}
                name={constants.ScreensName.EditProfile.name}
                options={{ gestureEnabled: false }}
            />
            <SettingStack.Screen
                component={ChangePassword}
                name={constants.ScreensName.ChangePassword.name}
                options={{ gestureEnabled: false }}
            />
            <SettingStack.Screen
                component={ChangeCurrency}
                name={constants.ScreensName.ChangeCurrency.name}
                options={{ gestureEnabled: false }}
            />
        </SettingStack.Navigator>
    )
}