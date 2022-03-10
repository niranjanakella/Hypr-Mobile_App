import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal,
    Dimensions,
    Keyboard,
    Share
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import constants from '../../../../constants';
import getConfig from '../../../../utils/config';
import { getUserIdFromStorage } from '../../../../utils/asyncstorage';
import * as NavigationService from '../../../../navigation/NavigationService';
import Components from '../../../../components';
import { styles } from './styles';
import {
    getPostByUser,
    addLikeOnPost,
    addCommentOnPost,
    getCommentListByPost,
    removeLikeFromPost
} from '../../../../actions/social';
import {
    getGroupPostByUser
} from '../../../../actions/group';


const HEIGHT = Dimensions.get("window").height;
const array = ["1", "2", "3", "4"]
const SocialGroupPostsList = (props) => {

    useEffect(() => {
        props.dispatch(getGroupPostByUser())
    }, [])
    const [state, setState] = useState({
        showCommentModal: false,
        selectedPost: null,
        comment: ""
    })
    const renderPosts = ({ item, index }) => {
        return (
            <View style={{
                marginVertical: constants.vh(10)
            }}>
                <Components.PostCard
                    profileImage={item.f_user_picture ? { uri: item.f_user_picture } : constants.Images.user}
                    profileName={item.f_name}
                    postTime={moment(item.f_postCreatedDate).format("DD:MM:YYYY")}
                    postDescription={item.f_post}
                    postImage={item.f_postImages}
                    likeCount={item.f_postLike.length}
                    shareCount={item.f_postShare.length}
                    isLiked={item.isLiked}
                    onpressLike={() => { handleLikeOrRemoveLikePost(item) }}
                    onPressComment={() => {
                        handlePressComment(item)
                    }}
                    onPressShare={() => { onShare() }}
                    onPressDonate={() => { }}
                />
            </View>
        )
    }
    const handlePressComment = (item) => {
        setState({
            ...state,
            showCommentModal: true,
            selectedPost: item._id
        })
        NavigationService.navigate(constants.ScreensName.SocialGroupPostComment.name, { postId: item._id })

    }
    const handleLikeOrRemoveLikePost = (item) => {

        const payload = {
            "postId": item._id
        }
        if (item.isLiked) {
            props.dispatch(removeLikeFromPost(payload))
        }
        else {
            props.dispatch(addLikeOnPost(payload))
        }
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    "Post link will be here"
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
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Posts"
                />
                <View style={{
                    flex: 1,
                    marginTop: constants.vh(10),
                    paddingHorizontal: 15,
                }}>
                    <FlatList
                        data={props.group.groupPostList}
                        renderItem={renderPosts}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

function mapStateToProps(state) {
    let { auth, social, group } = state;
    return {
        auth,
        social,
        group
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialGroupPostsList);