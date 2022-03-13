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
import { handleLoader, getUser } from './auth';

export const setProductType = (payload) => {
    console.log("payload at setProductType", payload);
    return async (dispatch) => {
        let productList = [];
        let data = store.getState().market;
        if (payload.productType === "Flash Sale") {
            productList = data.flashSale
        }
        if (payload.productType === "Top Picks on") {
            productList = data.topPickOnProduct
        }
        if (payload.productType === "Best selling Products") {
            productList = data.bestSelling
        }
        if (payload.productType === "Season's top picks") {
            productList = data.seasonTopPick
        }
        if (payload.productType === "Trending offers") {
            productList = data.trendingProducts
        }
        dispatch({
            type: types.SET_PRODUCT_DATA,
            data: payload,
            products: productList
        })
        NavigationService.navigate(constants.ScreensName.ProductList.name, null)
    }
}

export const clearSearchList = () => {
    return async (dispatch) => {
        dispatch({
            type: types.CLEAR_SEARCH_PRODUCT,
        })
    }
}

export const setProductDetails = (product) => {
    
    return async (dispatch) => {
        
        let variants = product.variants;
        let variantName = [];
        let variantValue = [];
        console.warn(variants);
        variants.map((item,index) => {  
            
            // for (const key of Object.keys(item)) {
            //     alert(item[key])          
            //     const name = key
            //     const val = item[key];
            //     variantName.push(name)
            //     variantValue.push(val)

            // }

                    
                const name = item
                const val = item[index];
                variantName.push(name)
                variantValue.push(val)

        })

        
        dispatch({
            type: types.SET_PRODUCT_DETAILS,
            product: product,
            variantName: variantName,
            variantValue: variantValue
        })

        
        NavigationService.navigate(constants.ScreensName.ProductDetail.name, {product_image:product.f_img1})

        
    }
}

export const getFlashProduct = () => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_FLASH_PRODUCT_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let data = {
                            "userId": id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_FLASH_PRODUCT}`,
                            data,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_FLASH_PRODUCT_SUCCESS,
                                        data: result.data.data,
                                    });
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_FLASH_PRODUCT_FAIL,
                                        isLoading: false,
                                        errorMessage: result.data.msg
                                    });
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
                                    type: types.GET_FLASH_PRODUCT_FAIL,
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
                            });
                    } else {
                        //logout here
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.GET_FLASH_PRODUCT_FAIL,
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

export const getBestSellingProduct = () => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_BEST_SELLING_PRODUCT_LOADING,
                    isLoading: true,
                });

                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_BEST_SELLING_PRODUCT}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_BEST_SELLING_PRODUCT_SUCCESS,
                                        data: result.data.data,
                                    });
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_BEST_SELLING_PRODUCT_FAIL,
                                        isLoading: false,
                                        errorMessage: result.data.msg
                                    });
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
                                    type: types.GET_BEST_SELLING_PRODUCT_FAIL,
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
                            });
                    } else {
                        //logout here
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.GET_BEST_SELLING_PRODUCT_FAIL,
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

export const getSeasonTopProduct = () => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_SEASON_TOP_PRODUCT_LOADING,
                    isLoading: true,
                });

                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_SEASON_TOP_PRODUCT}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_SEASON_TOP_PRODUCT_SUCCESS,
                                        data: result.data.data,
                                    });
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_SEASON_TOP_PRODUCT_FAIL,
                                        isLoading: false,
                                        errorMessage: result.data.msg
                                    });
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
                                    type: types.GET_SEASON_TOP_PRODUCT_FAIL,
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
                            });
                    } else {
                        //logout here
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.GET_SEASON_TOP_PRODUCT_FAIL,
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

export const getTrendingProduct = () => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_TRENDING_PRODUCT_LOADING,
                    isLoading: true,
                });

                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_TRENDING_PRODUCT}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_TRENDING_PRODUCT_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_TRENDING_PRODUCT_FAIL,
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
                                    type: types.GET_TRENDING_PRODUCT_FAIL,
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
                        store.dispatch(handleLoader(false))
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.GET_TRENDING_PRODUCT_FAIL,
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

export const getTopPickOnProduct = () => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_TOP_PICK_ON_PRODUCT_LOADING,
                    isLoading: true,
                });

                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_TOP_PICK_ON_PRODUCT}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_TOP_PICK_ON_PRODUCT_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_TOP_PICK_ON_PRODUCT_FAIL,
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
                                    type: types.GET_TOP_PICK_ON_PRODUCT_FAIL,
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
                        store.dispatch(handleLoader(false))
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.GET_TOP_PICK_ON_PRODUCT_FAIL,
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

export const getCategory = () => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_CATEGORY_LOADING,
                    isLoading: true,
                });

                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_CATEGORY}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_CATEGORY_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_CATEGORY_FAIL,
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
                                    type: types.GET_CATEGORY_FAIL,
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
                        store.dispatch(handleLoader(false))
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.GET_CATEGORY_FAIL,
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

export const getProductByCategoryId = (categoryId, categoryName) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_PRODUCT_BY_CATEGORYID_LOADING,
                    isLoading: true,
                });

                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                            "catId": categoryId
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_PRODUCT_BY_CATEGORYID}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_PRODUCT_BY_CATEGORYID_SUCCESS,
                                        data: result.data.data,
                                        productType: categoryName
                                    });
                                    store.dispatch(handleLoader(false))
                                    NavigationService.navigate(constants.ScreensName.ProductList.name, null)
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_PRODUCT_BY_CATEGORYID_FAIL,
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
                                    type: types.GET_PRODUCT_BY_CATEGORYID_FAIL,
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
                        store.dispatch(handleLoader(false))
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.GET_PRODUCT_BY_CATEGORYID_FAIL,
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

export const getProductByKeyword = (keyword) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_PRODUCT_BY_KEYWORD_LOADING,
                    isLoading: true,
                });

                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                            "keyword": keyword
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_PRODUCT_BY_KEYWORD}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_PRODUCT_BY_KEYWORD_SUCCESS,
                                        data: result.data.msg,
                                        productType: keyword
                                    });
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_PRODUCT_BY_KEYWORD_FAIL,
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
                                    type: types.GET_PRODUCT_BY_KEYWORD_FAIL,
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
                        store.dispatch(handleLoader(false))
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.GET_PRODUCT_BY_KEYWORD_FAIL,
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

export const addToCart = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.ADD_CART_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                            "ProductId": payload.id,
                            "variantName": payload.variant,
                            "product_price": payload.price
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.ADD_TO_CART}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.ADD_CART_SUCCESS,
                                    });
                                    Toast.show({
                                        text1: constants.AppConstant.Hypr,
                                        text2: result.data.msg,
                                        type: "success",
                                        position: "top"
                                    });
                                    store.dispatch(getCartList())
                                    if (payload.buyNow) {
                                        NavigationService.navigate(constants.ScreensName.Cart.name, null)
                                    }
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.ADD_CART_FAIL,
                                        isLoading: false,
                                        errorMessage: result.data.msg
                                    });
                                    Toast.show({
                                        text1: constants.AppConstant.Hypr,
                                        text2: result.data.msg,
                                        type: "error",
                                        position: "top"
                                    });
                                    if (payload.buyNow) {
                                        NavigationService.navigate(constants.ScreensName.Cart.name, null)
                                    }
                                    store.dispatch(handleLoader(false))
                                }
                            })
                            .catch((error) => {
                                dispatch({
                                    type: types.ADD_CART_FAIL,
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
                        store.dispatch(handleLoader(false))
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.ADD_CART_FAIL,
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
            }
        })

    };
}

export const getCartList = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_CART_LIST_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_CART_LIST}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    let totalAmount = 0;
                                    result.data.id.map(item => {
                                        totalAmount = totalAmount + parseInt(item.f_totalAmount)
                                    })
                                    dispatch({
                                        type: types.GET_CART_LIST_SUCCESS,
                                        data: result.data.id,
                                        totalPayingAmount: totalAmount
                                    });
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_CART_LIST_FAIL,
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
                                    type: types.GET_CART_LIST_FAIL,
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
                        type: types.GET_CART_LIST_FAIL,
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
            }
        })

    };
}

export const increaseCartItem = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.INCREASE_IN_CART_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                            "cartId": payload.id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.INCREASE_IN_CART}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.INCREASE_IN_CART_SUCCESS,
                                        data: result.data.id,
                                    });
                                    store.dispatch(getCartList())
                                    //store.dispatch(handleLoader(false))

                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.INCREASE_IN_CART_FAIL,
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
                                    type: types.INCREASE_IN_CART_FAIL,
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
                        type: types.INCREASE_IN_CART_FAIL,
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
            }
        })

    };
}

export const decreaseCartItem = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.DECREASE_IN_CART_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                            "cartId": payload.id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.DECREASE_IN_CART}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.DECREASE_IN_CART_SUCCESS,
                                        data: result.data.id,
                                    });
                                    store.dispatch(getCartList())
                                    //store.dispatch(handleLoader(false))

                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.DECREASE_IN_CART_FAIL,
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
                                    type: types.DECREASE_IN_CART_FAIL,
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
                        type: types.DECREASE_IN_CART_FAIL,
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
            }
        })

    };
}

export const removeCartItem = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.REMOVE_FROM_CART_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                            "cartId": payload.id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.REMOVE_FROM_CART}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.REMOVE_FROM_CART_SUCCESS,
                                        data: result.data.id,
                                    });
                                    store.dispatch(getCartList())
                                    //store.dispatch(handleLoader(false))

                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.REMOVE_FROM_CART_FAIL,
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
                                    type: types.REMOVE_FROM_CART_FAIL,
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
                        type: types.REMOVE_FROM_CART_FAIL,
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
            }
        })

    };
}

export const addToWishlist = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.ADD_TO_WISHLIST_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                            "Prod_id": payload.id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.ADD_TO_WISHLIST}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.ADD_TO_WISHLIST_SUCCESS,
                                    });
                                    Toast.show({
                                        text1: constants.AppConstant.Hypr,
                                        text2: result.data.msg,
                                        type: "success",
                                        position: "top"
                                    });
                                    store.dispatch(getWishList())
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.ADD_TO_WISHLIST_FAIL,
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
                                    type: types.ADD_TO_WISHLIST_FAIL,
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
                        store.dispatch(handleLoader(false))
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.ADD_TO_WISHLIST_FAIL,
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
            }
        })

    };
}

export const getWishList = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_WISHLIST_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_WISHLIST}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_WISHLIST_SUCCESS,
                                        data: result.data.id,
                                    });
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_WISHLIST_FAIL,
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
                                    type: types.GET_WISHLIST_FAIL,
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
                        type: types.GET_WISHLIST_FAIL,
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
            }
        })

    };
}

export const removeFromWishlist = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.REMOVE_FROM_WISHLIST_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                            "wishlistId": payload.id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.REMOVE_FROM_WISHLIST}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.REMOVE_FROM_WISHLIST_SUCCESS,
                                        data: result.data.id,
                                    });
                                    store.dispatch(getWishList())
                                    //store.dispatch(handleLoader(false))

                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.REMOVE_FROM_CART_FAIL,
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
                                    type: types.REMOVE_FROM_CART_FAIL,
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
                        type: types.REMOVE_FROM_CART_FAIL,
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
            }
        })

    };
}

export const getCountryList = () => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_COUNRTY_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {

                        GET(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_COUNTRY}`,
                            {},
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_COUNRTY_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(handleLoader(false))

                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_COUNRTY_FAIL,
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
                                    type: types.GET_COUNRTY_FAIL,
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
                        type: types.GET_COUNRTY_FAIL,
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
            }
        })

    };
}

export const getStateList = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_STATE_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {

                        GET(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_STATE}/${payload.state_id}`,
                            {},
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_STATE_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(handleLoader(false))

                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_STATE_FAIL,
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
                                    type: types.GET_STATE_FAIL,
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
                        type: types.GET_STATE_FAIL,
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
            }
        })

    };
}

export const getCityList = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.GET_CITY_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {

                        GET(
                            `${getConfig().accesspoint}${constants.EndPoint.GET_CITY}/${payload.city_id}`,
                            {},
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_CITY_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(handleLoader(false))

                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_CITY_FAIL,
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
                                    type: types.GET_CITY_FAIL,
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
                        type: types.GET_CITY_FAIL,
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
            }
        })

    };
}

export const placeOrder = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        const market = store.getState().market
                        const auth = store.getState().auth
                        let value = {
                            "userId": id,
                            "paymentMode": payload.paymentMode,
                            "paymentmethod": "Confirm",
                            "paymentStatus": "Paid",
                            "billingAddress": auth.address.address,
                            "billingCity": auth.address.city,
                            "billingState": auth.address.state,
                            "billingCountry": auth.address.country,
                            "billingContactNo": auth.userData.f_phone,
                            "billingPinCode": auth.address.pincode,
                            "orderTotalAmount": market.totalPayingAmount,
                            "description": "",
                            "currencyFormat": market.currency
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.PLACE_ORDER}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.PLACE_ORDER_SUCCESS,
                                        //data: result.data.id,
                                    });
                                    Toast.show({
                                        text1: constants.AppConstant.Hypr,
                                        text2: "Great! your order has been placed. You can track it from dashboard.",
                                        type: "success",
                                        position: "top"
                                    });
                                    NavigationService.navigate("marketPlace", null)
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.PLACE_ORDER_FAIL,
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
                                    type: types.PLACE_ORDER_FAIL,
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
                        type: types.PLACE_ORDER_FAIL,
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
            }
        })
    }
}

export const checkIfPinExist = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        const market = store.getState().market
                        const auth = store.getState().auth
                        let value = {
                            "userId": id,
                            "pincode": payload.pincode
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.CHECK_PIN_EXIST}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                dispatch({
                                    type: types.CHECK_IF_PIN_EXIST_SUCCESS,
                                    data: result.data.data,
                                    available: result.data.status
                                });
                                store.dispatch(handleLoader(false))
                            })
                            .catch((error) => {
                                dispatch({
                                    type: types.CHECK_IF_PIN_EXIST_FAIL,
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
                        type: types.CHECK_IF_PIN_EXIST_FAIL,
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
            }
        })
    }
}

export const unsetPinCodeData = () => {
    return async (dispatch) => {
        dispatch({
            type: types.UNSET_PIN_DATA
        })
    }
}

export const orderSummary = () => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.ORDER_SUMMARY}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    let activeOrders = []
                                    let cancelledOrder = []
                                    let deliveredOrder = []
                                    result.data.data.map(item => {
                                        if (item.f_orderStatus === "Cancelled") {
                                            cancelledOrder.push(item)
                                        }
                                        if (item.f_orderStatus === "Delivered") {
                                            deliveredOrder.push(item)
                                        }
                                        if (item.f_orderStatus !== "Cancelled" && item.f_orderStatus !== "Delivered" && item.f_orderStatus !== "Rejected") {
                                            activeOrders.push(item)
                                        }
                                    })
                                    dispatch({
                                        type: types.ORDER_SUMMARY_SUCCESS,
                                        data: result.data.data,
                                        activeOrderSummary: activeOrders,
                                        cancelledOrderSummary: cancelledOrder,
                                        deliveredOrderSummary: deliveredOrder
                                    });
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.ORDER_SUMMARY_FAIL,
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
                                    type: types.ORDER_SUMMARY_FAIL,
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
                        type: types.ORDER_SUMMARY_FAIL,
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
            }
        })

    };
}

export const cancelOrderByUser = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                            "orderId": payload.order_id,
                            "cancelSubject": payload.cancelSubject,
                            "cancelReason": payload.cancelReason
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.CANCEL_ORDER_BY_USER}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.CANCEL_ORDER_BY_USER_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(handleLoader(false))
                                    Toast.show({
                                        text1: constants.AppConstant.Hypr,
                                        text2: "Your order has been cancelled successfully.",
                                        type: "success",
                                        position: "top"
                                    });
                                    store.dispatch(orderSummary())
                                    NavigationService.navigate(constants.ScreensName.Dashboard.name, null)
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.CANCEL_ORDER_BY_USER_FAIL,
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
                                    type: types.CANCEL_ORDER_BY_USER_FAIL,
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
                        type: types.CANCEL_ORDER_BY_USER_FAIL,
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
            }
        })

    };
}

export const orderDetails = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: types.ORDER_DETAIL_SUCCESS,
            data: payload
        })
        NavigationService.navigate(constants.ScreensName.OrderDetails.name, null)
    }
}

export const filterCountry = (value) => {
    return async (dispatch) => {
        let countryList = store.getState().market.countryList
        let updatedCountryList = []
        countryList.map((item) => {
            if (item.Name.toLowerCase().includes(value.toLowerCase())) {
                console.log("item", item);
                updatedCountryList.push(item)
            }
        })
        console.log("updatedCountryList", updatedCountryList);
        dispatch({
            type: types.FILTER_COUNTRY,
            data: updatedCountryList
        })
    }
}

export const filterState = (value) => {
    return async (dispatch) => {
        let stateList = store.getState().market.stateList
        let updatedStateList = []
        stateList.map((item) => {
            if (item.Name.toLowerCase().includes(value.toLowerCase())) {
                updatedStateList.push(item)
            }
        })
        dispatch({
            type: types.FILTER_STATE,
            data: updatedStateList
        })
    }
}

export const filterCity = (value) => {
    return async (dispatch) => {
        let cityList = store.getState().market.cityList
        let updatedCityList = []
        cityList.map((item) => {
            if (item.name.toLowerCase().includes(value.toLowerCase())) {
                updatedCityList.push(item)
            }
        })
        dispatch({
            type: types.FILTER_CITY,
            data: updatedCityList
        })
    }
}

export const addNewAddress = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        const data = {
                            "userId": id,
                            "name": payload.name,
                            "mobile": payload.mobile,
                            "pincode": payload.pincode,
                            "location": payload.location,
                            "address": payload.address,
                            "city": payload.city,
                            "state": payload.state,
                            "landmark": payload.landmark,
                            "AlternativePhone": payload.AlternativePhone
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.ADD_NEW_ADDRESS}`,
                            data,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.ADD_NEW_ADDRESS_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(getUser(false))
                                    store.dispatch(handleLoader(false))

                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.ADD_NEW_ADDRESS_FAIL,
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
                                    type: types.ADD_NEW_ADDRESS_FAIL,
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
                        type: types.ADD_NEW_ADDRESS_FAIL,
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
            }
        })

    };
}

export const productDetailsById = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                            "ProductId": payload.product_id,
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.PRODUCT_DETAILS_BY_ID}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    store.dispatch(setProductDetails(result.data.data))
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.PRODUCT_DETAILS_BY_ID_FAIL,
                                        isLoading: false,
                                        errorMessage: result.data.msg
                                    });
                                    Toast.show({
                                        text1: constants.AppConstant.Hypr,
                                        text2: result.data.msg,
                                        type: "error",
                                        position: "top"
                                    });
                                    if (payload.buyNow) {
                                        NavigationService.navigate(constants.ScreensName.Cart.name, null)
                                    }
                                    store.dispatch(handleLoader(false))
                                }
                            })
                            .catch((error) => {
                                dispatch({
                                    type: types.PRODUCT_DETAILS_BY_ID_FAIL,
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
                        store.dispatch(handleLoader(false))
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.PRODUCT_DETAILS_BY_ID_FAIL,
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
            }
        })

    };
}