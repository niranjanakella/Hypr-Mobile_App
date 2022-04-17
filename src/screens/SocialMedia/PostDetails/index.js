import React from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Share
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import constants from '../../../constants';
import Components from '../../../components';
import * as NavigationService from '../../../navigation/NavigationService';
import { styles } from './styles';
import {
    getPostByUser,
    addLikeOnPost,
    addCommentOnPost,
    getCommentListByPost,
    removeLikeFromPost
} from '../../../actions/social';

const SocialPostDetails = (props) => {
    const handlePressComment = (item) => {
        NavigationService.navigate(constants.ScreensName.SocialPostComment.name, { postId: item._id })

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
                    title="Post"
                />
                <View style={{
                    paddingHorizontal: 15,
                    marginTop: 15
                }}>
                    <Components.PostCard
                        profileImage={props.social.particularPost.f_user_picture ? { uri: props.social.particularPost.f_user_picture } : constants.Images.user}
                        profileName={props.social.particularPost.f_name}
                        postTime={moment(props.social.particularPost.f_postCreatedDate).format("DD:MM:YYYY")}
                        postDescription={props.social.particularPost.f_post}
                        postImage={props.social.particularPost.f_postImages}
                        likeCount={props.social.particularPost.f_postLike.length}
                        shareCount={props.social.particularPost.f_postShare.length}
                        isLiked={props.social.particularPost.isLiked}
                        onpressLike={() => { handleLikeOrRemoveLikePost(props.social.particularPost) }}
                        onPressComment={() => {
                            handlePressComment(props.social.particularPost)
                        }}
                        onPressShare={() => { onShare() }}
                        onPressDonate={() => { }}
                    />
                </View>

            </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialPostDetails);