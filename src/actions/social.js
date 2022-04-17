import { Alert } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';
import { NetworkInfo } from 'react-native-network-info';
import axios from 'axios';
// Local Imports
import store from '../store';
import types from '../constants/Types'
import constants from '../constants'
import { GET, POST, DELETE, PUT } from '../constants/ServiceAxios';
import {
    getUserAccessTokenFromStorage,
    getUserIdFromStorage,
    getSignUpUserIdFromStorage,
    setUserAccessTokenToStorage,
    setUserIdToStorage,
    setSignUpUserIdToStorage,
    wipeStorage,
    setCurrencyToStorage,
    setCurrencySymbolToStorage,
    setCurrencyRateToStorage,
    getCurrencyFromStorage,
    getCurrencySymbolFromStorage,
    getCurrencyRateFromStorage
} from '../utils/asyncstorage';
import getConfig from '../utils/config';
import * as NavigationService from '../navigation/NavigationService';
import { handleLoader, getUser } from './auth';

export const getFeelingActivity = () => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.GET_ACTIVITY_FEELING}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (!result.data.status) {
                            dispatch({
                                type: types.GET_FEELING_ACTIVITY_SUCCESS,
                                isLoading: false,
                                data: result.data.data,
                                errorMessage: null
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.GET_FEELING_ACTIVITY_FAIL,
                                isLoading: false,
                                errorMessage: result.msg
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.GET_FEELING_ACTIVITY_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.GET_FEELING_ACTIVITY_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getFriendSuggetionList = () => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.GET_SUGGESTION_FRIENDLIST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.GET_FRIEND_SUGGESTION_LIST_SUCCESS,
                                isLoading: false,
                                data: result.data.data,
                                errorMessage: null
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.GET_FRIEND_SUGGESTION_LIST_FAIL,
                                isLoading: false,
                                errorMessage: result.msg
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.GET_FRIEND_SUGGESTION_LIST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.GET_FRIEND_SUGGESTION_LIST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getUsernameByTag = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "username": ""
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.GET_USER_BY_TAG}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            let userListByTag = result.data.data
                            userListByTag.map(item => {
                                { item.isSelected = false; return item; }
                            })
                            dispatch({
                                type: types.GET_USER_BY_TAG_SUCCESS,
                                isLoading: false,
                                data: userListByTag,
                                errorMessage: null
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.GET_USER_BY_TAG_FAIL,
                                isLoading: false,
                                errorMessage: result.msg
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.GET_USER_BY_TAG_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.GET_USER_BY_TAG_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const addPost = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            NetworkInfo.getIPAddress().then(ipAddress => {
                const stored = store.getState().social
                let taggedUser = []
                stored.taggedPeople.map(item => {
                    let data = {
                        "userId": item._id,
                        "Name": `${item.f_name} ${item.l_name ? item.l_name : ""}`,
                        "Email": item.f_email,
                        "Photo": `${item.f_picture ? item.f_picture : ""}`
                    }
                    taggedUser.push(data)

                })
                console.log("taggedUser", taggedUser);
                if (id !== null) {
                    const value = {
                        "userId": id,
                        "f_post": payload.postText,
                        //"f_postImages": payload.image,
                        "f_postImages": payload.image,
                        "f_postLocation": "Noida",
                        "f_postTag": taggedUser,

                        "f_postPrivacy": 0, //0,1,2
                        "f_postFeeling": stored.selectedFeeling.name,
                        "f_postGalleryName": "Mobile Upload",
                        "f_userIP": ipAddress,
                        "f_videoLink": "https://youtube.com/abc"
                    }
                    POST(
                        `${getConfig().accesspoint}${constants.EndPoint.CREATE_NEW_POST}`,
                        value,
                        {},
                    )
                        .then((result) => {
                            console.log('result', result);
                            if (result.data.status) {
                                dispatch({
                                    type: types.CREATE_NEW_POST_SUCCESS,
                                    data: result.data.data,
                                });
                                Toast.show({
                                    text1: constants.AppConstant.Hypr,
                                    text2: "Post added successfully!",
                                    type: "success",
                                    position: "top"
                                });
                                store.dispatch(handleLoader(false))
                                NavigationService.goback()
                            } else {
                                //@failed return from server
                                dispatch({
                                    type: types.CREATE_NEW_POST_FAIL,
                                });
                                store.dispatch(handleLoader(false))
                                Toast.show({
                                    text1: constants.AppConstant.Hypr,
                                    text2: result.msg,
                                    type: "error",
                                    position: "top"
                                });
                            }
                        })
                        .catch((error) => {
                            dispatch({
                                type: types.CREATE_NEW_POST_FAIL,
                                isLoading: false,
                                errorMessage: JSON.stringify(error)
                            });
                            store.dispatch(handleLoader(false))
                            console.log("error", error);
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: constants.AppConstant.something_went_wrong_message,
                                type: "error",
                                position: "top"
                            });
                        });
                } else {
                    //logout here
                    store.dispatch(handleLoader(false))
                }

            });


        }).catch((error) => {
            dispatch({
                type: types.CREATE_NEW_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getPostByUser = () => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "pagecount": 0
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.GET_POST_LIST_BY_USER}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            let originalPostList = result.data.data;
                            originalPostList.map(item => {
                                let searchIndex = item.f_postLike.findIndex(obj => obj.userId == id)

                                if (searchIndex > -1) {
                                    { item.isLiked = true; return item; }
                                } else {
                                    { item.isLiked = false; return item; }
                                }
                            })
                            dispatch({
                                type: types.GET_POST_LIST_BY_USER_SUCCESS,
                                data: originalPostList,
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.GET_POST_LIST_BY_USER_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.GET_POST_LIST_BY_USER_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.GET_POST_LIST_BY_USER_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getImagesByUser = () => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.GET_USER_IMAGES}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log(' user image result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.GET_USER_IMAGE_SUCCESS,
                                data: result.data.data,
                            });

                            NavigationService.navigate(constants.ScreensName.SocialPhotoList.name, null)
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.GET_USER_IMAGE_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.GET_USER_IMAGE_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.GET_USER_IMAGE_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const addLikeOnPost = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "postId": payload.postId,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.LIKE_ON_POST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.LIKE_ON_POST_SUCCESS,
                                data: result.data.data,
                            });
                            store.dispatch(handleLoader(false))
                            store.dispatch(getPostByUser())
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.LIKE_ON_POST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.LIKE_ON_POST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.LIKE_ON_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const removeLikeFromPost = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "postId": payload.postId,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.REMOVE_LIKE_FROM_POST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.REMOVE_LIKE_FROM_POST_SUCCESS,
                                data: result.data.data,
                            });
                            store.dispatch(handleLoader(false))
                            store.dispatch(getPostByUser())
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.REMOVE_LIKE_FROM_POST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.REMOVE_LIKE_FROM_POST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.REMOVE_LIKE_FROM_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const addCommentOnPost = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "postId": payload.postId,
                    "Comment": payload.Comment,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.COMMENT_ON_POST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.COMMENT_ON_POST_SUCCESS,
                                data: result.data.data,
                            });
                            const payloadForCommentList = {
                                "postId": payload.postId
                            }
                            store.dispatch(getCommentListByPost(payloadForCommentList))
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.COMMENT_ON_POST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            const payloadForCommentList = {
                                "postId": payload.postId
                            }
                            store.dispatch(getCommentListByPost(payloadForCommentList))

                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.COMMENT_ON_POST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });

            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.COMMENT_ON_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getCommentListByPost = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "postId": payload.postId,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.GET_COMMENT_LIST_BY_POST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.COMMENT_LIST_BY_POST_SUCCESS,
                                data: result.data.data.f_postComment.reverse(),
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.COMMENT_LIST_BY_POST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.COMMENT_LIST_BY_POST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.COMMENT_LIST_BY_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const sharePost = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "postId": payload.postId,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.SHARE_POST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.SHARE_POST_SUCCESS,
                                data: result.data.data,
                            });

                            store.dispatch(getPostByUser())
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.SHARE_POST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.SHARE_POST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.SHARE_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getParticularPost = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "postId": payload.postId,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.GET_PARTICULAR_POST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.GET_PARTICULAR_POST_SUCCESS,
                                data: result.data.data,
                            });
                            store.dispatch(handleLoader(false))
                            NavigationService.navigate(constants.ScreensName.SocialPostDetails.name, null)
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.GET_PARTICULAR_POST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.GET_PARTICULAR_POST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.GET_PARTICULAR_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const editPost = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "postId": payload.postId,
                    "f_post": "THis is test",
                    "f_postLocation": "DELHI",
                    "f_postPrivacy": 1,
                    "f_postFeeling": "Sad",
                    "f_postGalleryName": "Timeline",
                    "f_videoLink": "https://youtube.com/abc"

                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.EDIT_POST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.EDIT_POST_SUCCESS,
                                data: result.data.data,
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.EDIT_POST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.EDIT_POST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.EDIT_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const deletePost = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "postId": payload.postId,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.DELETE_POST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.DELETE_POST_SUCCESS,
                                data: result.data.data,
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.DELETE_POST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.DELETE_POST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.DELETE_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const sendFollowRequest = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "reqUserId": payload.reqUserId,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.SEND_FOLLOW_REQUEST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.SEND_FOLLOW_REQUEST_SUCCESS,
                                data: result.data.data,
                            });
                            store.dispatch(getFollowsList())
                            store.dispatch(getUserFriendData(payload.reqUserId))
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.SEND_FOLLOW_REQUEST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.SEND_FOLLOW_REQUEST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.SEND_FOLLOW_REQUEST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const acceptFollowRequest = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "reqFollowId": payload.reqFollowId,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.ACCEPT_FOLLOW_REQUEST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.ACCEPT_FOLLOW_REQUEST_SUCCESS,
                                data: result.data.data,
                            });
                            store.dispatch(getFollowsList())
                            store.dispatch(getUserFriendData(payload.reqFollowId))
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.ACCEPT_FOLLOW_REQUEST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.ACCEPT_FOLLOW_REQUEST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.ACCEPT_FOLLOW_REQUEST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const cancelFollowRequest = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "reqFollowId": payload.reqFollowId,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.CANCEL_FRIEND_REQUEST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.CANCEL_FRIEND_REQUEST_SUCCESS,
                                data: result.data.data,
                            });
                            store.dispatch(getFollowsList())
                            store.dispatch(getUserFriendData(payload.reqFollowId))
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.CANCEL_FRIEND_REQUEST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.CANCEL_FRIEND_REQUEST_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.CANCEL_FRIEND_REQUEST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getFollowsList = () => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.GET_FOLLOW_LIST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log("result", result);
                        if (result.data.status) {
                            dispatch({
                                type: types.GET_FOLLOWS_LIST_BY_USER_SUCCESS,
                                myFollowing: result.data.data.MyFollowing.data,
                                myFollowingCount: result.data.data.MyFollowing.count,
                                myFollower: result.data.data.MyFollowers.data,
                                myFollowerCount: result.data.data.MyFollowers.count,
                                pendingRequest: result.data.data.MyPendingRequests.data,
                                pendingRequestCount: result.data.data.MyPendingRequests.count
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            dispatch({
                                type: types.GET_FOLLOWS_LIST_BY_USER_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.GET_FOLLOWS_LIST_BY_USER_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.GET_FOLLOWS_LIST_BY_USER_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getUserFriendData = (friendId) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "reqUserId": friendId
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.FETCH_USER_PROFILE_DATA}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log("result getUserFriendData", result);
                        if (result.data.status) {
                            dispatch({
                                type: types.FETCH_USER_PROFILE_DATA_SUCCESS,
                                data: result.data.data,
                            });
                            store.dispatch(handleLoader(false))
                            NavigationService.navigate(constants.ScreensName.SocialFriendUserDetails.name, null)
                        } else {
                            dispatch({
                                type: types.FETCH_USER_PROFILE_DATA_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.FETCH_USER_PROFILE_DATA_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.FETCH_USER_PROFILE_DATA_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const setSelectedActivityFeeling = (value) => {
    return async (dispatch) => {
        dispatch({
            type: types.SET_SELECTED_FFELING,
            data: value
        })
    }
}

export const setTaggedPeople = (value) => {
    return async (dispatch) => {
        dispatch({
            type: types.SET_TAGGED_PEOPLE,
            data: value
        })
    }
}

export const searchUsernameByTag = (value) => {
    return async (dispatch) => {
        let userList = store.getState().social.userListByTag
        let searchedList = []
        userList.map((item) => {
            if (item.f_name.toLowerCase().includes(value.toLowerCase())) {
                searchedList.push(item)

            }
        })
        dispatch({
            type: types.SET_SEARCHED_TAGGED_PEOPLE,
            data: searchedList
        })
    }
}

export const updateProfilePic = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                let profileFull = {
                    uri: payload.image,
                    name: "profile.jpg",
                    type: payload.imageType
                }
                const formData = new FormData();
                formData.append("userId", id)
                formData.append("img1", profileFull)

                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.UPDATE_PROILE_PIC}`,
                    formData,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.UPDATE_PROFILE_PIC_SUCCESS,
                                data: result.data.data,
                            });
                            //store.dispatch(handleLoader(false))
                            store.dispatch(getUser())
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.UPDATE_PROFILE_PIC_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.UPDATE_PROFILE_PIC_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.UPDATE_PROFILE_PIC_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const updateCoverPic = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                let profileFull = {
                    uri: payload.image,
                    name: "cover.jpg",
                    type: payload.imageType
                }
                const formData = new FormData();
                formData.append("userId", id)
                formData.append("img1", profileFull)

                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.UPDATE_COVER_PIC}`,
                    formData,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.UPDATE_COVER_PIC_SUCCESS,
                                data: result.data.data,
                            });
                            //store.dispatch(handleLoader(false))
                            store.dispatch(getUser())
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.UPDATE_COVER_PIC_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.UPDATE_COVER_PIC_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.UPDATE_COVER_PIC_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const uploadPostCreateImage = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const formData = new FormData();
                payload.image.map((item, index) => {
                    let profileFull = {
                        uri: item.path,
                        name: `createPost${index}.jpg`,
                        type: item.mime
                    }
                    formData.append(`img${index + 1}`, profileFull)
                })
                formData.append("userId", id)
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.UPLOAD_POST_IMAGES}`,
                    formData,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.UPLOAD_POST_IMAGE_SUCCESS,
                                data: result.data.data,
                            });
                            const payloadToAddPost = {
                                "postText": payload.postText,
                                "image": result.data.data
                            }
                            store.dispatch(addPost(payloadToAddPost))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.UPLOAD_POST_IMAGE_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.UPLOAD_POST_IMAGE_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        store.dispatch(handleLoader(false))
                        console.log("error", error);
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                    });
            } else {
                //logout here
                store.dispatch(handleLoader(false))
            }

        }).catch((error) => {
            dispatch({
                type: types.UPLOAD_POST_IMAGE_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};
