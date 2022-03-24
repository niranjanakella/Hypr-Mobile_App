import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import constants from '../constants';
import {
    CardStyleInterpolators,
  } from '@react-navigation/stack';
//Auth
import LogIn from '../screens/login';
import Signup from '../screens/SignUp';
import SignUpSeller from '../screens/SignUpSeller';
import VerifyOtp from '../screens/VerifyOtp';
import ForgotPassword from '../screens/ForgotPassword';

//Privacy Policy && TermsCondition
import PrivacyPolicy from '../screens/PrivacyPolicy';
import TermsCondition from '../screens/Terms&Condition';

const AuthStack = createStackNavigator();
const AuthStackFunc = () => {
    return (
        <AuthStack.Navigator
            headerMode={"none"}
            initialRouteName={constants.ScreensName.LogIn.name}
        >
            <AuthStack.Screen
                component={LogIn}
                name={constants.ScreensName.LogIn.name}
                options={{ gestureEnabled: false,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}
            />
            <AuthStack.Screen
                component={Signup}
                name={constants.ScreensName.SignUp.name}
                options={{ gestureEnabled: false }}
            />
            <AuthStack.Screen
                component={SignUpSeller}
                name={constants.ScreensName.SignUpSeller.name}
                options={{ gestureEnabled: false }}
            />

            <AuthStack.Screen
                component={VerifyOtp}
                name={constants.ScreensName.VerifyOtp.name}
                options={{ gestureEnabled: false ,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}
            />
            <AuthStack.Screen
                component={ForgotPassword}
                name={constants.ScreensName.ForgotPassword.name}
                options={{ gestureEnabled: false }}
            />
            <AuthStack.Screen
                component={PrivacyPolicy}
                name={constants.ScreensName.PrivacyPolicy.name}
                options={{ gestureEnabled: false }}
            />
            <AuthStack.Screen
                component={TermsCondition}
                name={constants.ScreensName.TermsCondition.name}
                options={{ gestureEnabled: false }}
            />

        </AuthStack.Navigator>
    )
}

export default AuthStackFunc;