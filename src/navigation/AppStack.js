import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text
} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import constants from '../constants';
import DrawerContent from './DrawerContent';

import { MarketPlaceStackFunc } from './MarketPlace';
import { SocialStackFunc } from './Social';
import { DashboardStackFunc } from './Dashboard';
import { SettingStackFunc } from './MyAccount';
import { TopUpWalletFunc } from './TopupWallet';

//Dashboard
import Dashboard from '../screens/Dashboard';
import Network from '../screens/Network';

//My Account
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import ChangeCurrency from '../screens/ChangeCurrency';
import AddAddressMyAccount from '../screens/Address';

//Market Place
import Products from '../screens/Products';
import DigitalHome from '../screens/DigitalProducts';

//Payment
import TopUpWallet from '../screens/Payment/TopUpWallet';
import FundTransfer from '../screens/Payment/FundTransfer';
import AddAmountFundTransfer from '../screens/Payment/TopUpWallet/AddAmount';

//Social Media
import SocialDashboard from '../screens/SocialMedia/Dashboard';

const WIDTH = Dimensions.get("window").width;

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

export function getTabBarVisibility(route) {
  const index = route.state ? route.state.index > 0 : false;
  if (index) {
    return false;
  }
  return true;
}

export function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={"red"}
      activeTintColor="red"
      shifting={false}
      backBehavior={'history'}
      barStyle={{ backgroundColor: constants.Colors.white }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackFunc}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: focused ? constants.Colors.primary : "grey"
            }}>Dashboard</Text>
          ),
          tabBarColor: constants.Colors.white,
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="home" color={focused ? constants.Colors.primary : "grey"} size={25} />
          ),
        })}
      />
      <Tab.Screen
        name="Market"
        component={MarketPlaceStackFunc}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: focused ? constants.Colors.primary : "grey"
            }}>Market</Text>
          ),
          tabBarColor: constants.Colors.white,
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="shopping-cart" color={focused ? constants.Colors.primary : "grey"} size={25} />
          ),
        })}
      />
      <Tab.Screen
        name="Social"
        component={SocialStackFunc}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: focused ? constants.Colors.primary : "grey"
            }}>Social</Text>
          ),
          tabBarColor: constants.Colors.white,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="group"
              color={focused ? constants.Colors.primary : "grey"}
              size={30} />
          ),
        })}
      />
      <Tab.Screen
        name="My Account"
        component={SettingStackFunc}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: focused ? constants.Colors.primary : "grey"
            }}>My Account</Text>
          ),
          tabBarColor: constants.Colors.white,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-alt"
              color={focused ? constants.Colors.primary : "grey"}
              size={20} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}


const HyprDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContentOptions={{
        activeBackgroundColor: constants.Colors.primary,
        activeTintColor: "#fff",
        inactiveTintColor: "#000",
        labelStyle: {
          fontSize: 18
        },
        itemStyle: {
          marginVertical: 0,
          paddingVertical: -5
        },
      }}
      drawerStyle={{
        width: "75%",
      }}

      edgeWidth={0}
      drawerPosition="left"
      drawerStyle={{ width: WIDTH * 0.7 }}
      drawerContent={(drawerProps) => <DrawerContent {...drawerProps} />}
    >
      {/* Dashboard */}
      <Drawer.Screen name="Dashboard" component={BottomTabs} />
      <Drawer.Screen name="FundTransfer" component={FundTransfer} />
      <Drawer.Screen name="TopUpWallet" component={TopUpWalletFunc} />
      <Drawer.Screen name="Network" component={Network} />

      {/* Market */}
      <Drawer.Screen name="marketPlace" component={BottomTabs} />
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="Travel" component={Dashboard} />
      <Drawer.Screen name="DigitalProducts" component={DigitalHome} />

      {/* Social */}
      <Drawer.Screen name="Social" component={BottomTabs} />
      <Drawer.Screen name="Services" component={SocialDashboard} />
      <Drawer.Screen name="Snapz" component={SocialDashboard} />
      <Drawer.Screen name="Inspirations" component={SocialDashboard} />
      <Drawer.Screen name="Chat" component={SocialDashboard} />
      <Drawer.Screen name="NewPost" component={SocialDashboard} />

      {/* My Account */}
      <Drawer.Screen name="MyAccount" component={BottomTabs} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen name="ChangeCurrency" component={ChangeCurrency} />
      <Drawer.Screen name="AddAddressMyAccount" component={AddAddressMyAccount} />
    </Drawer.Navigator>
  )

}

export default HyprDrawer;