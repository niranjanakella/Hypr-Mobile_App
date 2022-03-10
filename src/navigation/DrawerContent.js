import React, { useState } from "react";
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    SafeAreaView,
    Text,
    Platform,
    Dimensions
} from "react-native";
import { connect } from 'react-redux';
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import constants from '../constants';
import { logout } from '../actions/auth';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;


const DrawerContent = (props) => {
    return (
        <SafeAreaView
            style={{
                width: "100%",
                height: Dimensions.get("window").height,
            }}>
            <DrawerContentScrollView
                {...props}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: constants.Colors.primary,
                        position: "absolute",
                        top: 0,
                        paddingVertical: constants.vw(10),
                        width: "100%",
                        paddingHorizontal: constants.vw(15)
                    }}
                >
                    <Image
                        source={props.auth.userData.f_picture ? { uri: props.auth.userData.f_picture } : constants.Images.user}
                        style={{
                            width: constants.vw(100),
                            height: constants.vw(100),
                            borderRadius: constants.vw(50),
                            resizeMode: "cover"
                        }}
                    />
                    <View style={{
                        height: constants.vw(60),
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: constants.Colors.white,
                            textTransform: "uppercase"
                        }}>{props.auth.userData.f_name} {props.auth.userData.l_name ? props.auth.userData.l_name.slice(0, 1) : ""}.</Text>
                    </View>
                </View>

                {/* DASHBOARD */}
                {
                    props.auth.tab_type === "dashboard" &&
                    <>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("TopUpWallet")}
                            activeOpacity={1}
                            style={[styles.itemContainer, styles.margintopDrawer]}>
                            <View style={styles.itemSecondryContainer}>
                                <MaterialCommunityIcons
                                    name="bank-transfer-in"
                                    size={35}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Top Up Wallet</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("FundTransfer")}
                            activeOpacity={1}
                            style={[styles.itemContainer, {}]}>
                            <View style={styles.itemSecondryContainer}>
                                <MaterialCommunityIcons
                                    name="bank-transfer"
                                    size={35}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Fund Transfer</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("Network")}
                            activeOpacity={1}
                            style={[styles.itemContainer, {}]}>
                            <View style={styles.itemSecondryContainer}>
                                <FontAwesome5
                                    name="users"
                                    size={25}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Network</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                    </>
                }

                {/* MARKETPLACE */}
                {
                    props.auth.tab_type === "market" &&
                    <>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("Products")}
                            activeOpacity={1}
                            style={[styles.itemContainer, styles.margintopDrawer]}>
                            <View style={styles.itemSecondryContainer}>
                                <FontAwesome5
                                    name="shopping-cart"
                                    size={25}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Product</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.itemContainer}>
                            <View style={styles.itemSecondryContainer}>
                                <MaterialIcons
                                    name="miscellaneous-services"
                                    size={30}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Services</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.itemContainer}>
                            <View style={styles.itemSecondryContainer}>
                                <MaterialIcons
                                    name="flight"
                                    size={30}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Travel</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("DigitalProducts")}
                            activeOpacity={1}
                            style={styles.itemContainer}>
                            <View style={styles.itemSecondryContainer}>
                                <FontAwesome
                                    name="suitcase"
                                    size={25}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Digital Products</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>
                    </>
                }

                {/* SOCIAL */}
                {
                    props.auth.tab_type === "social" &&
                    <>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.itemContainer, styles.margintopDrawer]}>
                            <View style={styles.itemSecondryContainer}>
                                <MaterialIcons
                                    name="group"
                                    size={30}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Social</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.itemContainer}>
                            <View style={styles.itemSecondryContainer}>
                                <Feather
                                    name="camera"
                                    size={30}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Snapz</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.itemContainer}>
                            <View style={styles.itemSecondryContainer}>
                                <FontAwesome
                                    name="thumbs-o-up"
                                    size={30}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Inspirations</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.itemContainer}>
                            <View style={styles.itemSecondryContainer}>
                                <FontAwesome
                                    name="video-camera"
                                    size={30}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Chat</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.itemContainer}>
                            <View style={styles.itemSecondryContainer}>
                                <FontAwesome
                                    name="plus-square-o"
                                    size={30}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>New Post</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                    </>
                }

                {
                    props.auth.tab_type === "myaccount" &&
                    <>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("EditProfile")}
                            activeOpacity={1}
                            style={[styles.itemContainer, styles.margintopDrawer]}>
                            <View style={[styles.itemSecondryContainer]}>
                                <MaterialIcons
                                    name="edit"
                                    size={27}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Edit Profile</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("ChangePassword")}
                            activeOpacity={1}
                            style={styles.itemContainer}>
                            <View style={styles.itemSecondryContainer}>
                                <MaterialIcons
                                    name="lock-outline"
                                    size={30}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Change Password</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("ChangeCurrency")}
                            activeOpacity={1}
                            style={styles.itemContainer}>
                            <View style={styles.itemSecondryContainer}>
                                <MaterialCommunityIcons
                                    name="currency-usd-circle"
                                    size={30}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Change Currency</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("AddAddressMyAccount")}
                            activeOpacity={1}
                            style={styles.itemContainer}>
                            <View style={styles.itemSecondryContainer}>
                                <FontAwesome
                                    name="address-book"
                                    size={25}
                                    color={constants.Colors.primary}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>Address</Text>
                                </View>
                            </View>

                            <AntDesign
                                name="right"
                                size={20}
                                color={constants.Colors.primary}
                            />
                        </TouchableOpacity>

                    </>
                }

            </DrawerContentScrollView>

            <TouchableOpacity
                onPress={() => {
                    props.dispatch(logout())
                }}
                activeOpacity={1}
                style={[styles.itemContainer, {
                    borderTopWidth: 0.5,
                    borderColor: "grey",
                    position: "absolute",
                    width: "90%",
                    alignSelf: "center",
                    bottom: 10
                }]}>
                <View style={styles.itemSecondryContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>LOG OUT</Text>
                    </View>
                </View>

                <MaterialIcons
                    name="logout"
                    size={30}
                    color={constants.Colors.primary}
                />
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: constants.vh(11),
        paddingHorizontal: constants.vw(20),
    },
    itemSecondryContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    textStyle: {
        fontSize: 16,
        fontWeight: "600"
    },
    textContainer: {
        marginStart: constants.vw(20)
    },
    margintopDrawer: {
        marginTop: Platform.OS === "ios" ? constants.vw(100) : constants.vw(120)
    }
})

function mapStateToProps(state) {
    let { chat, auth } = state;
    return {
        chat,
        auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

