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


export const uploadPageImage = (payload, payloadForCoverImage, payloadForCreateGroup) => {
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
                                type: types.UPLOAD_PAGE_IMAGES_SUCCESS,
                                data: result.data.data,
                            });

                            store.dispatch(uploadPageCoverImage(payloadForCoverImage, payloadForCreateGroup))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.UPLOAD_PAGE_IMAGES_FAIL,
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
                            type: types.UPLOAD_PAGE_IMAGES_FAIL,
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
                type: types.UPLOAD_PAGE_IMAGES_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const uploadPageCoverImage = (payload, payloadForCreateGroup) => {
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
                                type: types.UPLOAD_PAGE_COVER_SUCCESS,
                                data: result.data.data,
                            });

                            store.dispatch(createPage(payloadForCreateGroup))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.UPLOAD_PAGE_COVER_FAIL,
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
                            type: types.UPLOAD_PAGE_COVER_FAIL,
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
                type: types.UPLOAD_PAGE_COVER_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const createPage = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const pageData = store.getState().page;
                const value = {
                    "userId": id,
                    "f_PageName": payload.groupName,
                    "f_PagePrivacy": payload.groupType,
                    "f_PageCoverPic": pageData.uploadedPageCover,
                    "f_PageProfilePic": pageData.uploadedPageProfile,
                    "f_PageAbout": payload.groupAbout,
                    "f_PageDesciption": ""
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.CREATE_NEW_PAGE}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.CREATE_NEW_PAGE_SUCCESS,
                                data: result.data.data,
                            });
                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: "Group created successfully!",
                                type: "success",
                                position: "top"
                            });
                            store.dispatch(getPageList())
                            store.dispatch(handleLoader(false))
                            NavigationService.goback()
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.CREATE_NEW_PAGE_FAIL,
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
                            type: types.CREATE_NEW_PAGE_FAIL,
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
                type: types.CREATE_NEW_PAGE_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const getPageList = (payload) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const value = {
                    "userId": id,
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.FETCH_ALL_PAGES_BY_USER}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.FETCH_ALL_PAGES_BY_USER_SUCCESS,
                                data: result.data.data,
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.FETCH_ALL_PAGES_BY_USER_FAIL,
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
                            type: types.FETCH_ALL_PAGES_BY_USER_FAIL,
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
                type: types.FETCH_ALL_PAGES_BY_USER_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })

    };
};

export const setSelectedPage = (value) => {
    return async (dispatch) => {
        dispatch({
            type: types.SET_SELECTED_GROUP,
            data: value
        })
        NavigationService.navigate(constants.ScreensName.SocialPageDetails.name, null)
    }
}