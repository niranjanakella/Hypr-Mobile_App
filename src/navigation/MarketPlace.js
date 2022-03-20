import React from 'react';
import { Dimensions, StyleSheet, Image, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import constants from '../constants';

import {CardStyleInterpolators} from '@react-navigation/stack';
//Market Place
import MarketHome from '../screens/MarketPlace/Home';
import Category from '../screens/MarketPlace/Category';
import ProductList from '../screens/MarketPlace/ProductList';
import ProductDetail from '../screens/MarketPlace/ProductDetail';
import Variant from '../screens/MarketPlace/Variant';
import Cart from '../screens/MarketPlace/Cart';
import WishList from '../screens/MarketPlace/Wishlist';
import AddAddress from '../screens/MarketPlace/Address';
import OrderScreen from '../screens/MarketPlace/OrderScreen';
import SearchProduct from '../screens/MarketPlace/SearchProduct';

//Products
import Products from '../screens/Products';
// const MarketPlaceStack  = createSharedElementStackNavigator(); 
const MarketPlaceStack = createStackNavigator();

export const MarketPlaceStackFunc = () => {
    return (
        <MarketPlaceStack.Navigator
            headerMode={"none"}
        >
            <MarketPlaceStack.Screen
                component={MarketHome}
                name={constants.ScreensName.MarketHome.name}
                options={{ gestureEnabled: false }}
                
            />
             <MarketPlaceStack.Screen
                component={Category}
                name={constants.ScreensName.Category.name}
                options={{ gestureEnabled: false }}
            />
            <MarketPlaceStack.Screen
                component={ProductList}
                name={constants.ScreensName.ProductList.name}
                options={{ gestureEnabled: false }}
            />
            <MarketPlaceStack.Screen
                component={ProductDetail}
                name={constants.ScreensName.ProductDetail.name}
                options={{ gestureEnabled: false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}
                // sharedElements={(route, otherRoute, showing) => {
                //     const { item } = route.params;                    
                //     return [{   id: item.product_image,}];
                // }}
            />
             <MarketPlaceStack.Screen
                component={Variant}
                name={constants.ScreensName.Variant.name}
                options={{ gestureEnabled: false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}
               
            />
            <MarketPlaceStack.Screen
                component={Cart}
                name={constants.ScreensName.Cart.name}
                options={{ gestureEnabled: false }}
            />
            <MarketPlaceStack.Screen
                component={WishList}
                name={constants.ScreensName.WishList.name}
                options={{ gestureEnabled: false }}
            />
             <MarketPlaceStack.Screen
                component={AddAddress}
                name={constants.ScreensName.Address.name}
                options={{ gestureEnabled: false }}
            />
            <MarketPlaceStack.Screen
                component={OrderScreen}
                name={constants.ScreensName.OrderScreen.name}
                options={{ gestureEnabled: false }}
            />
            
             <MarketPlaceStack.Screen
                component={SearchProduct}
                name={constants.ScreensName.SearchProduct.name}
                options={{ gestureEnabled: false }}
            />
            <MarketPlaceStack.Screen
                component={Products}
                name={constants.ScreensName.Products.name}
                options={{ gestureEnabled: false }}
            />
            </MarketPlaceStack.Navigator>
    )
}