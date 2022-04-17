import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import {
    getImagesByUser,
    sendFollowRequest,
    acceptFollowRequest,
    cancelFollowRequest
} from '../../../actions/social';
import * as NavigationService from '../../../navigation/NavigationService';

const SocialFriendUserDetails = (props) => {
    const [state, setState] = useState({
        friendFollowersList: props.social.friendUserData.MyFollowers.data,
        friendFollowersCount: props.social.friendUserData.MyFollowers.count,
        friendPhotosList: props.social.friendUserData.MyPhotos.data,
        friendPhotosCount: props.social.friendUserData.MyPhotos.count,
    })
    const renderFriendUser = ({ item, index }) => {
        if (index < 4) {
            return (

                <View style={{
                    width: "42%",
                    marginHorizontal: constants.vw(15),
                    marginVertical: constants.vh(10)
                }}>
                    <Components.FriendsCard
                        friendName={item.f_name}
                        profileImage={item.f_picture ? { uri: item.f_picture } : constants.Images.user}
                    />
                </View>

            )
        }

    }
    const handleAddFriend = () => {
        const payload = {
            "reqUserId": props.social.friendUserData.userInfo[0]._id
        }
        props.dispatch(sendFollowRequest(payload))
    }
    const handleCancelFriend = () => {
        const payload = {
            "reqFollowId": props.social.friendUserData.userInfo[0]._id
        }
        props.dispatch(cancelFollowRequest(payload))
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title={`${props.social.friendUserData.userInfo[0].f_name} ${props.social.friendUserData.userInfo[0].l_name}`}
                />
                <ScrollView
                    style={{
                        flex: 1,
                    }}
                >
                    <View style={{
                        height: constants.vh(290),
                    }}>
                        <FastImage
                            source={props.social.friendUserData.userInfo[0].f_coverPic ? { uri: props.social.friendUserData.userInfo[0].f_coverPic } : constants.Images.logo}
                            style={[styles.coverImage, {
                                priority: FastImage.priority.high
                            }]}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                        <View style={styles.profileImageContainer}>
                            <FastImage
                                source={props.social.friendUserData.userInfo[0].f_picture ? { uri: props.social.friendUserData.userInfo[0].f_picture } : constants.Images.user}
                                style={[styles.profileImage, {
                                    priority: FastImage.priority.high
                                }]}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 15,
                        marginVertical: 15
                    }}>
                        {props.social.friendUserData.UserExists.status === "Requested" &&
                            <>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles.friendRequestButtonContainer}>
                                    <Ionicons
                                        name="person"
                                        color="#fff"
                                        size={15}
                                    />
                                    <Text style={styles.friendRequestText}>Request Sent</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleCancelFriend}
                                    activeOpacity={1}
                                    style={styles.friendRequestButtonContainer}>
                                    <Ionicons
                                        name="person-remove"
                                        color="#fff"
                                        size={15}
                                    />
                                    <Text style={styles.friendRequestText}>Cancel Request</Text>
                                </TouchableOpacity>
                            </>
                        }
                        {props.social.friendUserData.UserExists.status === "Accepted" &&
                            <>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles.friendRequestButtonContainer}>
                                    <Ionicons
                                        name="chatbox"
                                        color="#fff"
                                        size={15}
                                    />
                                    <Text style={styles.friendRequestText}>Message</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles.friendRequestButtonContainer}>
                                    <Ionicons
                                        name="person-remove"
                                        color="#fff"
                                        size={15}
                                    />
                                    <Text style={styles.friendRequestText}>Unfriend</Text>
                                </TouchableOpacity>
                            </>
                        }
                        {props.social.friendUserData.UserExists.status === "notExists" &&
                            <>
                                <TouchableOpacity
                                    onPress={handleAddFriend}
                                    activeOpacity={1}
                                    style={styles.friendRequestButtonContainer}>
                                    <Ionicons
                                        name="person-add"
                                        color="#fff"
                                        size={15}
                                    />
                                    <Text style={styles.friendRequestText}>Add Friend</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </View>

                    <View style={styles.paddingHorizontal15}>
                        <Text style={styles.text18bold}>{props.social.friendUserData.userInfo[0].f_name} {props.social.friendUserData.userInfo[0].l_name}</Text>
                        <Text style={{ textAlign: "center" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>
                    </View>

                    <View style={{
                        marginVertical: 15,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 15
                    }}>
                        <View style={{
                            width: "45%"
                        }}>
                            <Components.PrimaryButton
                                title="Photos"
                                onPress={() => {
                                    NavigationService.navigate(constants.ScreensName.SocialPhotoList.name, null)
                                }}
                            />
                        </View>
                        <View style={{
                            width: "45%"
                        }}>
                            <Components.PrimaryButton
                                title="Posts"
                            />
                        </View>
                    </View>

                    {
                        props.social.friendUserData.MyFollowers.data.length > 0 &&
                        <Components.ViewAllCard
                            title="Friends"
                            buttonTitle="View All"
                            onPress={() => { }}
                        />
                    }

                    <View style={{
                        flex: 1
                    }}>
                        <FlatList
                            data={props.social.friendUserData.MyFollowers.data}
                            renderItem={renderFriendUser}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            horizontal={false}
                            numColumns={2}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <Components.ProgressView
                isProgress={props.auth.isLoading}
                title="Hypr"
            />
        </>
    )
}

function mapStateToProps(state) {
    let { auth, social } = state;
    return {
        auth, social
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialFriendUserDetails);