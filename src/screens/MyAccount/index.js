import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Share
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';

import constants from '../../constants';
import Components from '../../components';
import { styles } from './styles';
import {
    todayCurrencyRate,
    setCurrencyType,
    filtercurrency,
    setTabType
} from '../../actions/auth';
import * as NavigationService from '../../navigation/NavigationService';
import { calculatePrice } from '../../utils/CalculatePrice';

const MyAccount = (props) => {
    const [state, setState] = useState({
        referUrl: "http://hyprweb.com/ref/HYPR2238"
    });

    useEffect(() => {
        const subscribe = props.navigation.addListener('focus', () => {
            props.dispatch(setTabType("myaccount"))
        })
        return () => {
            subscribe;
        };
    }, [])
    const copyToClipboard = async () => {
        await Clipboard.setString(state.referUrl);
        Toast.show({
            text1: constants.AppConstant.Hypr,
            text2: "Copied to clipboard",
            type: "success",
            position: "top"
        });
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    state.referUrl
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.HeaderWithDrawer
                    onPressDrawer={() => { props.navigation.toggleDrawer() }}
                />
                <View style={{
                    flex: 1,
                    paddingHorizontal: 15,
                    alignItems: "center",
                    marginTop: constants.vh(40)
                }}>
                    <Image
                        source={props.auth.userData.f_picture ? { uri: props.auth.userData.f_picture } : constants.Images.user}
                        style={{
                            width: constants.vw(150),
                            height: constants.vw(150),
                            borderRadius: constants.vw(75),
                            borderWidth: 1
                        }}
                        resizeMode="cover"
                    />
                    <View>
                        <Text style={[styles.text18bold, {
                            textTransform: "uppercase"
                        }]}>{props.auth.userData.f_name} {props.auth.userData.l_name ? props.auth.userData.l_name.toUpperCase() : ""}</Text>
                    </View>
                    <View style={{
                        marginTop: constants.vh(20),
                        alignItems: "center"
                    }}>
                        <Text style={styles.text18bold}>Invite a friends/Pals</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => copyToClipboard()}
                            style={styles.linkContainer}>
                            <Text style={styles.text18bold}>{state.referUrl}</Text>
                        </TouchableOpacity>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <TouchableOpacity
                                style={styles.shareButton}
                                onPress={() => copyToClipboard()}
                            >
                                <MaterialCommunityIcons
                                    name="clipboard-text-multiple-outline"
                                    size={20}
                                    color={constants.Colors.white}
                                />
                                <Text style={styles.text14bold}>Copy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.shareButton}
                                onPress={() => onShare()}
                            >
                                <MaterialCommunityIcons
                                    name="share-variant"
                                    size={20}
                                    color={constants.Colors.white}
                                />
                                <Text style={styles.text14bold}>Share</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>
            </SafeAreaView>

        </>
    )
}

function mapStateToProps(state) {
    let { auth } = state;
    return {
        auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);