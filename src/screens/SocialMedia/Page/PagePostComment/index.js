import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Keyboard,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
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
    addCommentOnGroupPost,
    getCommentListByGroupPost
} from '../../../../actions/group';

const HEIGHT = Dimensions.get("window").height
const SocialGroupPostComment = (props) => {
    useEffect(() => {
        const payload = {
            "postId": props.route.params.postId
        }
        props.dispatch(getCommentListByGroupPost(payload))
    }, [])

    const [state, setState] = useState({
        comment: ""
    })

    const renderComment = ({ item, index }) => {
        return (
            <View style={{
                marginVertical: 10,
                marginHorizontal: 5
            }}>
                <Components.CommentCard
                    profileImage={item.userDP ? { uri: item.userDP } : constants.Images.user}
                    profileName={item.name}
                    comment={item.comment}
                />
            </View>
        )
    }
    const handleAddComment = () => {
        Keyboard.dismiss()
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const body = {
                    "userId": id,
                    "postId": props.route.params.postId,
                    "Comment": state.comment
                }
                axios({
                    method: 'post',
                    url: "http://api.hyprweb.com/social/group/AddCommentGroupOnPost",
                    data: body
                })
                    .then(function (response) {
                        const payload = {
                            "postId": props.route.params.postId
                        }
                        props.dispatch(getCommentListByGroupPost(payload))
                        console.log("response success", `${getConfig().accesspoint}${constants.EndPoint.COMMENT_ON_POST}`, response);
                    })
                    .catch(function (response) {
                        //handle error
                        console.log("response fail", response);
                    });
            }
            setState({
                ...state,
                comment: ""
            })
        })
    }

    const renderEmptyComment = () => {
        return (
            <View
                style={{
                    flex: 1,
                    // justifyContent: "center",
                    alignItems: "center",
                    marginTop: HEIGHT * 0.17,
                    transform: [{ scaleY: -1 }]
                }}
            >
                <FontAwesome
                    name="commenting-o"
                    size={200}
                    color={constants.Colors.light_grey}
                />
                <Text style={{
                    fontSize: 18,
                    color: constants.Colors.light_grey
                }}>No Comments yet.</Text>
                <Text style={{
                    fontSize: 18,
                    color: constants.Colors.light_grey
                }}>Be the first to comment.</Text>
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                    style={styles.CrossIconContainer}
                >
                    <Entypo
                        name="circle-with-cross"
                        size={30}
                    />
                </TouchableOpacity>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={false}
                    extraHeight={-100}
                    keyboardOpeningTime={10}
                    style={{
                        flex: 1,
                        paddingHorizontal: 15
                    }}
                >
                    <View style={{
                        flex: 1,
                        height: HEIGHT * 0.8
                    }}>
                        <FlatList
                            inverted
                            data={props.group.commentList}
                            renderItem={renderComment}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={renderEmptyComment}
                        />

                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <Components.PrimaryInput
                            placeholder="Type something..."
                            showSend
                            autoFocus
                            value={state.comment}
                            onChangeText={(comment) => {
                                setState({
                                    ...state,
                                    comment: comment
                                })
                            }}
                            onPressSend={handleAddComment}
                        />
                    </View>
                </KeyboardAwareScrollView>

            </SafeAreaView>
        </>
    )
}

function mapStateToProps(state) {
    let { auth, social, group } = state;
    return {
        auth, social, group
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialGroupPostComment);