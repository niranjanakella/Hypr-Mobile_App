import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    Dimensions
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import constants from '../../constants';
import { styles } from './styles';

const WIDTH = Dimensions.get("window").width;

export const HeaderWithDrawer = ({
    onPressDrawer,
    isNotificationCount,
    notificationCount,
    onPressNotification
}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: constants.Colors.primary,
                paddingHorizontal: 15,
                paddingVertical: 10
            }}
        >
            <TouchableOpacity
                onPress={onPressDrawer}
            >
                <Entypo
                    name="menu"
                    size={30}
                    color={constants.Colors.white}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPressNotification}
                style={{
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <FontAwesome
                    name="bell"
                    size={constants.vw(20)}
                    color={constants.Colors.white}
                />
                {
                    isNotificationCount &&
                    <View
                        style={{
                            position: "absolute",
                            left: constants.vw(15),
                            bottom: constants.vh(12),
                            width: 20,
                            height: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                            backgroundColor: constants.Colors.primary
                        }}
                    >
                        <Text style={{ fontSize: 12, color: "#fff" }}>{notificationCount}</Text>
                    </View>
                }

                {/* <Text style={{ fontSize: 16, color: "#fff" }}>Cart</Text> */}
            </TouchableOpacity>


        </View>
    )
}

export const HeaderWithSearch = ({
    onChangeText,
    onPressCart,
    onPressWishlist,
    cartCount,
    isCartCount,
    onPressDrawer,
    showDrawer,
    onSubmitEditing,
    autoFocus,
    showinput,
    onPressInput,
    isNotificationCount,
    notificationCount,
    onPressNotification
}) => {
    let count = 0;
    if (count > 9) {
        cartCount = `9+`
    } else {
        count = cartCount
    }
    return (
        <View
            style={[styles.headerWithSearchContainer, { paddingVertical: 10 }]}
        >
            <TouchableOpacity
                onPress={onPressDrawer}
            >
                {
                    showDrawer ?
                        <Entypo
                            name="menu"
                            size={constants.vw(30)}
                            color= {constants.Colors.blue_primary}
                        />
                        :
                        <AntDesign
                            name="arrowleft"
                            size={constants.vw(30)}
                            color= {constants.Colors.blue_primary}
                        />
                }

            </TouchableOpacity>
            {
                showinput ?
                    <TextInput
                        onChangeText={onChangeText}
                        onSubmitEditing={onSubmitEditing}
                        placeholder="Search for Products"
                        placeholderTextColor="#fff"
                        style={styles.headerWithSearchInput}
                        returnKeyType="search"
                        autoFocus={autoFocus}
                        selectionColor={constants.Colors.white}
                        autoCorrect={false}
                    />
                    :
                    null
            }
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "30%",
            }}>


                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onPressCart}
                    style={{
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <FontAwesome
                        name="shopping-cart"
                        size={constants.vw(25)}
                        color= {constants.Colors.blue_primary}
                    />
                    {
                        isCartCount &&
                        <View
                            style={{
                                position: "absolute",
                                left: constants.vw(20),
                                bottom: constants.vh(15),
                                width: 20,
                                height: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 20,
                                backgroundColor: constants.Colors.primary
                            }}
                        >
                            <Text style={{ fontSize: 12, color: "#fff" }}>{count}</Text>
                        </View>
                    }

                    {/* <Text style={{ fontSize: 16, color: "#fff" }}>Cart</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onPressWishlist}
                    activeOpacity={1}
                    style={{
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <FontAwesome
                        name="heart"
                        size={constants.vw(22)}
                        color={constants.Colors.blue_primary}
                    />
                    {/* <Text style={{ fontSize: 16, color: "#fff" }}>Wishlist</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onPressNotification}
                    style={{
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <FontAwesome
                        name="bell"
                        size={constants.vw(20)}
                        color={constants.Colors.blue_primary}
                    />
                    {
                        isNotificationCount &&
                        <View
                            style={{
                                position: "absolute",
                                left: constants.vw(15),
                                bottom: constants.vh(12),
                                width: 20,
                                height: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 20,
                                backgroundColor: constants.Colors.primary
                            }}
                        >
                            <Text style={{ fontSize: 12, color: "#fff" }}>{notificationCount}</Text>
                        </View>
                    }

                    {/* <Text style={{ fontSize: 16, color: "#fff" }}>Cart</Text> */}
                </TouchableOpacity>

            </View>

        </View>
    )
}

export const PrimaryHeader = ({
    title,
    onPress
}) => {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 5,
            paddingStart: 15,
            backgroundColor: constants.Colors.primary
        }}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={1}
                hitSlop={{
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5
                }}
                style={{

                }}
            >
                <AntDesign
                    name="arrowleft"
                    size={30}
                    color={"#fff"}
                />

            </TouchableOpacity>
            <View
                style={{
                    width: "80%",
                    justifyContent: "center",
                    alignItems: "center",

                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: constants.Colors.white
                }}>{title}</Text>
            </View>
        </View>
    )
}