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
    wipeStorage
} from '../utils/asyncstorage'
import getConfig from '../utils/config';
import * as NavigationService from '../navigation/NavigationService';
import { handleLoader } from './auth';

export const getAllProducts = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let data = {
                            "userId": id,
                            "pagecount": payload.pagecount
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_ALL_PRODUCT}`,
                            data,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    let Products = []
                                    if (payload.pagecount > 0) {
                                        Products = [...store.getState().products.products, ...result.data.data]

                                    } else {
                                        Products = result.data.data
                                    }

                                    dispatch({
                                        type: types.GET_ALL_PRODUCT_SUCCESS,
                                        data: Products,
                                    });
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_ALL_PRODUCT_FAIL,
                                        isLoading: false,
                                        errorMessage: result.data.msg
                                    });
                                    Toast.show({
                                        text1: constants.AppConstant.Hypr,
                                        text2: result.data.msg,
                                        type: "error",
                                        position: "top"
                                    });
                                    store.dispatch(handleLoader(false))
                                }
                            })
                            .catch((error) => {
                                dispatch({
                                    type: types.GET_ALL_PRODUCT_FAIL,
                                    isLoading: false,
                                    errorMessage: JSON.stringify(error)
                                });
                                console.log("error", error);
                                Toast.show({
                                    text1: constants.AppConstant.Hypr,
                                    text2: constants.AppConstant.something_went_wrong_message,
                                    type: "error",
                                    position: "top"
                                });
                                store.dispatch(handleLoader(false))
                            });
                    } else {
                        //logout here
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.GET_ALL_PRODUCT_FAIL,
                        isLoading: false,
                        errorMessage: JSON.stringify(error)
                    });
                    console.log("error", error);
                    store.dispatch(handleLoader(false))
                })

            }
            else {
                Toast.show({
                    text1: constants.AppConstant.Hypr,
                    text2: constants.AppConstant.network_error,
                    type: "error",
                    position: "top"
                });
                store.dispatch(handleLoader(false))
            }
        })

    };
};

export const sortAllProducts = (value) => {
    return async (dispatch) => {
        store.dispatch(handleLoader(true))
        let sortedData = []
        if (value === "atoz") {
            const originalProductsList = store.getState().products.products;
            originalProductsList.sort((a, b) => a.f_productname.localeCompare(b.f_productname))
            sortedData = originalProductsList
            dispatch({
                type: types.GET_ALL_PRODUCT_SUCCESS,
                data: sortedData
            })
            store.dispatch(handleLoader(false))
        } else if (value === "ztoa") {
            const originalProductsList = store.getState().products.products;
            originalProductsList.sort((a, b) => b.f_productname.localeCompare(a.f_productname))
            sortedData = originalProductsList
            dispatch({
                type: types.GET_ALL_PRODUCT_SUCCESS,
                data: sortedData
            })
            store.dispatch(handleLoader(false))
        } else if (value === "hightolow") {
            const originalProductsList = store.getState().products.products;
            originalProductsList.sort((a, b) => parseFloat(b.f_product_offer_price) - parseFloat(a.f_product_offer_price))
            sortedData = originalProductsList
            dispatch({
                type: types.GET_ALL_PRODUCT_SUCCESS,
                data: sortedData
            })
            store.dispatch(handleLoader(false))
        } else if (value === "lowtohigh") {
            const originalProductsList = store.getState().products.products;
            originalProductsList.sort((a, b) => parseFloat(a.f_product_offer_price) - parseFloat(b.f_product_offer_price))
            sortedData = originalProductsList
            dispatch({
                type: types.GET_ALL_PRODUCT_SUCCESS,
                data: sortedData
            })
            store.dispatch(handleLoader(false))
        } else {
            store.dispatch(getAllProducts())
        }
        store.dispatch(handleLoader(false))
    }
}