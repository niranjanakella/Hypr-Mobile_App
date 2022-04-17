import React from 'react';
import { Dimensions, StyleSheet, Image, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import constants from '../constants';

//FundTransfer
import AddAmountFundTransfer from '../screens/Payment/TopUpWallet/AddAmount';
import TopUpWallet from '../screens/Payment/TopUpWallet';

const FundTransferStack = createStackNavigator();

export const TopUpWalletFunc = () => {
    return (
        <FundTransferStack.Navigator
            headerMode={"none"}
        >
            <FundTransferStack.Screen
                component={AddAmountFundTransfer}
                name={constants.ScreensName.AddAmoutFundTransfer.name}
                options={{ gestureEnabled: false }}
            />
            <FundTransferStack.Screen
                component={TopUpWallet}
                name={constants.ScreensName.TopUpWallet.name}
                options={{ gestureEnabled: false }}
            />
        </FundTransferStack.Navigator>
    )
}