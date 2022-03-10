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
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import { fundTransfer } from '../../../../actions/payment';
import { calculatePrice } from '../../../../utils/CalculatePrice';


const HEIGHT = Dimensions.get("window").height;
const array = ["1", "2", "3", "4"]
const SocialGroupPostsList = (props) => {

    useEffect(() => {
        props.dispatch(getGroupPostByUser())
    }, [])
    const [state, setState] = useState({
        showCommentModal: false,
        selectedPost: null,
        comment: "",
        showDonate: false,
        coffeeCount: 0,
        galetoCount: 0,
        showCoffe: false,
        showGaleto: false,
        selectedPostEmail: null
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
                    onPressDonate={() => {
                        setState({
                            ...state,
                            showDonate: true,
                            selectedPostEmail: item.f_username
                        })
                    }}
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
    const handleCoffeeCount = (value) => {
        if (value === "increment") {
            setState({
                ...state,
                coffeeCount: state.coffeeCount + 1
            })
        } else {
            if (state.coffeeCount > 0) {
                setState({
                    ...state,
                    coffeeCount: state.coffeeCount - 1
                })
            } else {
                Toast.show({
                    text1: constants.AppConstant.Hypr,
                    text2: "Coffee count should be greater than 0",
                    type: "error",
                    position: "top"
                });
            }
        }
    }

    const handleGaletoCount = (value) => {
        if (value === "increment") {
            setState({
                ...state,
                galetoCount: state.galetoCount + 1
            })
        } else {
            if (state.galetoCount > 0) {
                setState({
                    ...state,
                    galetoCount: state.galetoCount - 1
                })
            } else {
                Toast.show({
                    text1: constants.AppConstant.Hypr,
                    text2: "Galeto count should be greater than 0",
                    type: "error",
                    position: "top"
                });
            }
        }
    }
    const handleDonate = () => {
        if (state.coffeeCount < 1 && state.galetoCount < 1) {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Please select atleast one from coffee and galeto",
                type: "error",
                position: "top"
            });
            return 1;
        }
        let totalAmount = state.coffeeCount * 4 + state.galetoCount * 2
        if (totalAmount > props.auth.userData.f_wallet) {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Insufficient amount in account. Please add some.",
                type: "error",
                position: "top"
            });
            NavigationService.navigate(constants.ScreensName.AddAmoutFundTransfer.name, null)
        } else {
            const payload = {
                "emailIdTo": state.selectedPostEmail,
                "transferAmount": totalAmount
            }
            props.dispatch(fundTransfer(payload))
            setState({
                ...state,
                showDonate: false,
                showGaleto: false,
                showCoffe: false,
                coffeeCount: 0,
                galetoCount: 0
            })
        }
    }
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
            <Modal
                visible={state.showDonate}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalDonate}>
                    <View style={styles.donateModalDataContainer}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                setState({
                                    ...state,
                                    showDonate: false,
                                    showGaleto: false,
                                    showCoffe: false,
                                    coffeeCount: 0,
                                    galetoCount: 0
                                })
                            }}
                            style={{
                                alignSelf: "flex-end"
                            }}
                        >
                            <AntDesign
                                name="closecircle"
                                color={constants.Colors.primary}
                                size={30}
                            />
                        </TouchableOpacity>
                        <Text style={styles.text18bold}>Buy {props.auth.userData.f_name} a Coffee or Galeto</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90%",
                            marginTop: constants.vh(20)
                        }}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setState({
                                            ...state,
                                            showCoffe: true,
                                            coffeeCount: state.coffeeCount + 1
                                        })
                                    }}
                                    style={styles.coffeeButton}>
                                    <Text style={styles.textCoffee}>Coffee {props.auth.currency_symbol} {calculatePrice(4)}</Text>
                                </TouchableOpacity>
                                {
                                    state.showCoffe &&
                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: constants.vh(10)
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => handleCoffeeCount("decrement")}
                                            activeOpacity={1}
                                            style={{
                                                borderTopWidth: 1,
                                                borderBottomWidth: 1,
                                                borderLeftWidth: 1,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                paddingHorizontal: 3
                                            }}
                                        >
                                            <AntDesign
                                                name="minus"
                                                size={20}

                                            />
                                        </TouchableOpacity>
                                        <View style={{
                                            paddingVertical: 4,
                                            paddingHorizontal: 2,
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            //borderRadius: 2,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{state.coffeeCount}</Text>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => handleCoffeeCount("increment")}
                                            activeOpacity={1}
                                            style={{
                                                borderTopWidth: 1,
                                                borderBottomWidth: 1,
                                                borderRightWidth: 1,
                                                //borderRadius: 2,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                paddingHorizontal: 3,
                                            }}
                                        >
                                            <AntDesign
                                                name="plus"
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                }
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setState({
                                            ...state,
                                            showGaleto: true,
                                            galetoCount: state.galetoCount + 1
                                        })
                                    }}
                                    style={styles.coffeeButton}>
                                    <Text style={styles.textCoffee}>Galeto {props.auth.currency_symbol} {calculatePrice(2)}</Text>
                                </TouchableOpacity>
                                {
                                    state.showGaleto &&
                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: constants.vh(10)
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => handleGaletoCount("decrement")}
                                            activeOpacity={1}
                                            style={{
                                                borderTopWidth: 1,
                                                borderBottomWidth: 1,
                                                borderLeftWidth: 1,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                paddingHorizontal: 3
                                            }}
                                        >
                                            <AntDesign
                                                name="minus"
                                                size={20}

                                            />
                                        </TouchableOpacity>
                                        <View style={{
                                            paddingVertical: 4,
                                            paddingHorizontal: 2,
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            //borderRadius: 2,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{state.galetoCount}</Text>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => handleGaletoCount("increment")}
                                            activeOpacity={1}
                                            style={{
                                                borderTopWidth: 1,
                                                borderBottomWidth: 1,
                                                borderRightWidth: 1,
                                                //borderRadius: 2,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                paddingHorizontal: 3,
                                            }}
                                        >
                                            <AntDesign
                                                name="plus"
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>
                        <View style={{
                            width: "90%",
                            marginTop: constants.vh(30)
                        }}>
                            <Components.PrimaryButton
                                onPress={handleDonate}
                                title="TIP"
                            />
                        </View>
                    </View>
                </View>
            </Modal>

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