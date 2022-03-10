import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import {
    getFollowsList,
    acceptFollowRequest,
    cancelFollowRequest
} from '../../../actions/social';

const HEIGHT = Dimensions.get("window").height;

const array = ["a", "b", "c", "d", "e"]
const SocialPendingFriendRequest = (props) => {
    useEffect(() => {
        props.dispatch(getFollowsList())
    }, [])
    const renderUserList = ({ item, index }) => {
        return (
            <View style={{
                margin: 15,
                width: "42%"
            }}>
                <Components.FriendSuggestionCard
                    userName={item.f_name}
                    userImage={item.f_picture ? { uri: item.f_picture } : constants.Images.user}
                    friendShipStatus="1"
                    onPressAccept={() => handleAccept(item)}
                    onPressCancel={() => { handleCancelRequest(item) }}
                />
            </View>
        )
    }
    const handleCancelRequest = (item) => {
        const payload = {
            "reqFollowId": item._id
        }
        props.dispatch(cancelFollowRequest(payload))
    }
    const handleAccept = (item) => {
        const payload = {
            "reqFollowId": item._id
        }
        props.dispatch(acceptFollowRequest(payload))
    }
    const renderEmptyPendingRequest = ({ }) => {
        return (
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: HEIGHT * 0.25
            }}>

                <MaterialIcons
                    name="broken-image"
                    size={200}
                    color={constants.Colors.light_grey}
                />

                <Text style={{
                    fontSize: 18,
                    color: constants.Colors.light_grey
                }}>No Pending Request</Text>
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Friend Request"
                />
                <View style={{
                    width: "100%",
                    flex: 1
                }}>
                    <FlatList
                        data={props.social.pendingRequest}
                        renderItem={renderUserList}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        numColumns={2}
                        ListEmptyComponent={renderEmptyPendingRequest}
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialPendingFriendRequest);