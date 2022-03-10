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


export const createGroup = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const groupData = store.getState().group;
                const value = {
                    "userId": id,
                    "f_GroupName": payload.groupName,
                    "f_GroupPrivacy": payload.groupType,
                    "f_GroupCoverPic": groupData.uploadedGroupCover,
                    "f_GroupProfilePic": groupData.uploadedGroupProfile,
                    "f_GroupAbout": payload.groupAbout,
                    "f_GroupDesciption": ""
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.CREATE_GROUP}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.CREATE_GROUP_SUCCESS,
                                data: result.data.data,
                            });
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: "Group created successfully!",
                                type: "success",
                                position: "top"
                            });
                            store.dispatch(getGroupList())
                            store.dispatch(handleLoader(false))
                            NavigationService.goback()
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.CREATE_GROUP_FAIL,
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
                            type: types.CREATE_GROUP_FAIL,
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
                type: types.CREATE_GROUP_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getGroupList = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.GET_GROUP_LIST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.GET_GROUP_LIST_SUCCESS,
                                data: result.data.data,
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.GET_GROUP_LIST_FAIL,
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
                            type: types.GET_GROUP_LIST_FAIL,
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
                type: types.GET_GROUP_LIST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const uploadGroupImage = (payload, payloadForCoverImage, payloadForCreateGroup) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const formData = new FormData();
                let profileFull = {
                    uri: payload.path,
                    name: payload.filename,
                    type: payload.mime
                }
                formData.append(`img1`, profileFull)
                formData.append("userId", id)
                console.log("formData", formData);
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.UPLOAD_GROUP_IMAGES}`,
                    formData,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.UPLOAD_GROUP_IMAGES_SUCCESS,
                                data: result.data.data,
                            });

                            store.dispatch(uploadGroupCoverImage(payloadForCoverImage, payloadForCreateGroup))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.UPLOAD_GROUP_IMAGES_FAIL,
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
                            type: types.UPLOAD_GROUP_IMAGES_FAIL,
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
                type: types.UPLOAD_GROUP_IMAGES_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const uploadGroupCoverImage = (payload, payloadForCreateGroup) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const formData = new FormData();
                let profileFull = {
                    uri: payload.path,
                    name: payload.filename,
                    type: payload.mime
                }
                formData.append(`img1}`, profileFull)
                formData.append("userId", id)
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.UPLOAD_GROUP_IMAGES}`,
                    formData,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.UPLOAD_GROUP_COVER_SUCCESS,
                                data: result.data.data,
                            });

                            store.dispatch(createGroup(payloadForCreateGroup))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.UPLOAD_GROUP_COVER_FAIL,
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
                            type: types.UPLOAD_GROUP_COVER_FAIL,
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
                type: types.UPLOAD_GROUP_COVER_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const setSelectedGroup = (value) => {
    return async (dispatch) => {
        dispatch({
            type: types.SET_SELECTED_GROUP,
            data: value
        })
        NavigationService.navigate(constants.ScreensName.SocialGroupDetails.name, null)
    }
}

export const uploadGroupPostCreateImage = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const formData = new FormData();
                payload.image.map((item, index) => {
                    let profileFull = {
                        uri: item.path,
                        name: `groupCreatePost${index}.jpg`,
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
                            store.dispatch(addGroupPost(payloadToAddPost))
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

export const addGroupPost = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            NetworkInfo.getIPAddress().then(ipAddress => {
                const stored = store.getState().social
                const groupData = store.getState().group
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
                        "groupId": groupData.selectedGroup._id,
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
                        `${getConfig().accesspoint}${constants.EndPoint.CREATE_GROUP_POST}`,
                        value,
                        {},
                    )
                        .then((result) => {
                            console.log('result', result);
                            if (result.data.status) {
                                dispatch({
                                    type: types.CREATE_GROUP_POST_SUCCESS,
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
                                    type: types.CREATE_GROUP_POST_FAIL,
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
                                type: types.CREATE_GROUP_POST_FAIL,
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
                type: types.CREATE_GROUP_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getGroupPostByUser = () => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "pagecount": 0
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.FETCH_GROUP_POST_LIST_BY_USER}`,
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
                                type: types.FETCH_GROUP_POST_LIST_BY_USER_SUCCESS,
                                data: originalPostList,
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.FETCH_GROUP_POST_LIST_BY_USER_FAIL,
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
                            type: types.FETCH_GROUP_POST_LIST_BY_USER_FAIL,
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
                type: types.FETCH_GROUP_POST_LIST_BY_USER_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const addCommentOnGroupPost = (payload) => {
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
                    `${getConfig().accesspoint}${constants.EndPoint.ADD_COMMENT_ON_GROUP_POST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.ADD_COMMENT_ON_GROUP_POST_SUCCESS,
                                data: result.data.data,
                            });
                            const payloadForCommentList = {
                                "postId": payload.postId
                            }
                            store.dispatch(getCommentListByGroupPost(payloadForCommentList))
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.ADD_COMMENT_ON_GROUP_POST_FAIL,
                            });
                            store.dispatch(handleLoader(false))
                            const payloadForCommentList = {
                                "postId": payload.postId
                            }
                            store.dispatch(getCommentListByGroupPost(payloadForCommentList))

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
                            type: types.ADD_COMMENT_ON_GROUP_POST_FAIL,
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
                type: types.ADD_COMMENT_ON_GROUP_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getCommentListByGroupPost = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                    "postId": payload.postId,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.GET_COMMENT_LIST_ON_GROUP_POST}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.GET_COMMENT_LIST_ON_GROUP_POST_SUCCESS,
                                data: result.data.data.f_postComment.reverse(),
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.GET_COMMENT_LIST_ON_GROUP_POST_FAIL,
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
                            type: types.GET_COMMENT_LIST_ON_GROUP_POST_FAIL,
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
                type: types.GET_COMMENT_LIST_ON_GROUP_POST_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const joinGroup = () => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const groupData = store.getState().group
                const value = {
                    "userId": id,
                    "groupId": groupData.selectedGroup._id,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.JOIN_GROUP}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.JOIN_GROUP_SUCCESS,
                            });
                            store.dispatch(handleLoader(false))
                            store.dispatch(getGroupList())
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.JOIN_GROUP_FAIL,
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
                            type: types.JOIN_GROUP_FAIL,
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
                type: types.JOIN_GROUP_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const searchGroup = (value) => {
    return async (dispatch) => {
        let groupList = store.getState().group.groupList
        let searchedList = []
        groupList.map((item) => {
            if (item.f_GroupName.toLowerCase().includes(value.toLowerCase())) {
                searchedList.push(item)
            }
        })
        dispatch({
            type: types.SET_SEARCHED_GROUP,
            data: searchedList
        })
    }
}