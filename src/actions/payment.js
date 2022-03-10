import { Alert } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';
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
} from '../utils/asyncstorage'
import getConfig from '../utils/config';
import * as NavigationService from '../navigation/NavigationService';
import { handleLoader, getUser } from './auth';

export const walletHistory = () => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.WALLET_HISTORY_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let data = {
                            "userId": id
                            // "userId": "60863a034f05c127b8bc330e"
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.WALLET_HISTORY}`,
                            data,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.WALLET_HISTORY_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.WALLET_HISTORY_FAIL,
                                        isLoading: false,
                                        errorMessage: result.data.msg
                                    });
                                    store.dispatch(handleLoader(false))
                                    Toast.show({
                                        text1: constants.AppConstant.Hypr,
                                        text2: result.data.msg,
                                        type: "error",
                                        position: "top"
                                    });
                                }
                            })
                            .catch((error) => {
                                dispatch({
                                    type: types.WALLET_HISTORY_FAIL,
                                    isLoading: false,
                                    errorMessage: JSON.stringify(error)
                                });
                                store.dispatch(handleLoader(false))
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
                    store.dispatch(handleLoader(false))
                    dispatch({
                        type: types.WALLET_HISTORY_FAIL,
                        isLoading: false,
                        errorMessage: JSON.stringify(error)
                    });
                    console.log("error", error);
                })

            }
            else {
                Toast.show({
                    text1: constants.AppConstant.Hypr,
                    text2: constants.AppConstant.network_error,
                    type: "error",
                    position: "top"
                });
            }
        })

    };
};

export const setSelectedWalletDetails = (value) => {
    return async (dispatch) => {
        dispatch({
            type: types.SET_SELECTED_WALLET_DETAILS,
            data: value
        })
        NavigationService.navigate(constants.ScreensName.PaymentDetails.name, null)
    }
}

export const fundTransfer = (payload) => {
    console.log("payload", payload);
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.TRANSFER_FUND_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let data = {
                            "emailIdFrom": store.getState().auth.userData.f_email,
                            "emailIdTo": payload.emailIdTo,
                            "transferAmount": payload.transferAmount
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.TRANSFER_FUND}`,
                            data,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.TRANSFER_FUND_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(handleLoader(false))
                                    store.dispatch(getUser())
                                    store.dispatch(clearEmailExist())
                                    Toast.show({
                                        text1: constants.AppConstant.Hypr,
                                        text2: result.data.data,
                                        type: "success",
                                        position: "top"
                                    });
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.TRANSFER_FUND_FAIL,
                                        isLoading: false,
                                        errorMessage: result.data
                                    });
                                    store.dispatch(handleLoader(false))
                                    Toast.show({
                                        text1: constants.AppConstant.Hypr,
                                        text2: result.data.data,
                                        type: "error",
                                        position: "top"
                                    });
                                }
                            })
                            .catch((error) => {
                                dispatch({
                                    type: types.TRANSFER_FUND_FAIL,
                                    isLoading: false,
                                    errorMessage: JSON.stringify(error)
                                });
                                store.dispatch(handleLoader(false))
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
                    store.dispatch(handleLoader(false))
                    dispatch({
                        type: types.TRANSFER_FUND_FAIL,
                        isLoading: false,
                        errorMessage: JSON.stringify(error)
                    });
                    console.log("error", error);
                })

            }
            else {
                Toast.show({
                    text1: constants.AppConstant.Hypr,
                    text2: constants.AppConstant.network_error,
                    type: "error",
                    position: "top"
                });
            }
        })

    };
};

export const checkIfEmailExist = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let data = {
                            "userId": id,
                            "emailId": payload.email
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.CHECK_IF_USER_EMAIL_EXIST}`,
                            data,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.CHECK_IF_EMAIL_EXIST_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.CHECK_IF_EMAIL_EXIST_FAIL,
                                        isLoading: false,
                                        errorMessage: result.data.msg
                                    });
                                    store.dispatch(handleLoader(false))
                                    Toast.show({
                                        text1: constants.AppConstant.Hypr,
                                        text2: result.data.msg,
                                        type: "error",
                                        position: "top"
                                    });
                                }
                            })
                            .catch((error) => {
                                dispatch({
                                    type: types.CHECK_IF_EMAIL_EXIST_FAIL,
                                    isLoading: false,
                                    errorMessage: JSON.stringify(error)
                                });
                                store.dispatch(handleLoader(false))
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
                    store.dispatch(handleLoader(false))
                    dispatch({
                        type: types.CHECK_IF_EMAIL_EXIST_FAIL,
                        isLoading: false,
                        errorMessage: JSON.stringify(error)
                    });
                    console.log("error", error);
                })

            }
            else {
                Toast.show({
                    text1: constants.AppConstant.Hypr,
                    text2: constants.AppConstant.network_error,
                    type: "error",
                    position: "top"
                });
            }
        })

    };
};

export const clearEmailExist = () => {
    return async (dispatch) => {
        dispatch({
            type: types.CLEAR_EMAIL_EXIST
        })
    }
}