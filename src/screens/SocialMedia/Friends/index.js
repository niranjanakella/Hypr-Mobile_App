import React, { useEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import constants from '../../../constants';
import Components from '../../../components';
import * as NavigationService from '../../../navigation/NavigationService';
import { styles } from './styles';
import {
    getFollowsList,
    getUsernameByTag,
    sendFollowRequest,
    getFriendSuggetionList,
    getUserFriendData
} from '../../../actions/social';

const FriendListSocial = (props) => {
    useEffect(() => {
        props.dispatch(getUsernameByTag())
        props.dispatch(getFriendSuggetionList())
        const subscribe = props.navigation.addListener('focus', () => {
            props.dispatch(getFollowsList())
        })
        return () => {
            subscribe
        }
    }, [])
    const renderFriends = ({ item, index }) => {
        return (
            <View style={{
                width: "45%",
                marginVertical: constants.vw(10),
                marginHorizontal: constants.vw(10)
            }}>
                <Components.FriendsCard
                    profileImage={item.f_picture ? { uri: item.f_picture } : constants.Images.user}
                    friendName={item.f_name}
                    mutualCount={2}
                    onPressDots={() => { }}
                    onPress={() => { handleGetUserFriendData(item.f_req_accp_UserId) }}
                />
            </View>
        )
    }
    const handleGetUserFriendData = (id) => {
        props.dispatch(getUserFriendData(id))
    }
    const renderUserList = ({ item, index }) => {
        if (index < 10) {
            return (
                <View style={{
                    margin: 15,
                }}>
                    <Components.FriendSuggestionCard
                        userName={`${item.f_name} ${item.l_name}`}
                        userImage={item.f_picture ? { uri: item.f_picture } : constants.Images.user}
                        friendShipStatus="0"
                        onPressAddFriend={() => handleAddFriend(item)}
                        onPress={() => { handleGetUserFriendData(item._id) }}
                    />
                </View>
            )
        }
    }
    const handleAddFriend = (item) => {
        const payload = {
            "reqUserId": item._id
        }
        props.dispatch(sendFollowRequest(payload))
    }
    const renderHeader = ({ }) => {
        return (
            <>
                <View style={{
                    marginHorizontal: 5
                }}>
                    <Components.ViewAllCard
                        title="Suggestions"
                        buttonTitle="View all"
                        onPress={() => {
                            NavigationService.navigate(constants.ScreensName.SocialFriendSuggestion.name, null)
                        }}
                    />
                </View>

                <View style={{
                    width: "100%",
                    //flex: 1
                }}>

                    <FlatList
                        data={props.social.userListByTag}
                        renderItem={renderUserList}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    />
                </View>
                <View style={styles.friendContainer}>
                    <View>
                        <Text style={styles.text18bold}>Friends <Text>({props.social.myFollowerCount})</Text></Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => NavigationService.navigate(constants.ScreensName.SocialPendingFriendRequest.name, null)}
                        activeOpacity={1}
                    >
                        <Text style={styles.text16normal}>Friend Requests</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.friendContainer}>
                    <View style={{
                        width: "100%"
                    }}>
                        <Components.PrimaryInput
                            placeholder="Find Friends"
                        />
                    </View>
                </View>
            </>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Friends"
                />

                <View style={{
                    flex: 1,
                    paddingHorizontal: 15,
                    marginTop: constants.vh(10)
                }}>
                    <FlatList
                        data={props.social.myFollower}
                        renderItem={renderFriends}
                        ListHeaderComponent={renderHeader}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        horizontal={false}
                    />
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendListSocial);