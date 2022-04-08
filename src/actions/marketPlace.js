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

export const setProductDetails = (product,country_code) => {
    
    return async (dispatch) => {

        NetInfo.fetch().then(state => {
            
            if (state.isConnected && state.isInternetReachable) {
                dispatch({
                    type: types.GET_FREIGHT_PRODUCT_LOADING,
                    isLoading: true,
                });
                
                store.dispatch(handleLoader(true))                
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        // freight calculation
                        
                        let data = {                            
                            eccode: country_code,
                            products:[{
                                quantity: 1,
			                    vid: product.vid
                            }]
                        }   
                        
                        
                        POST(
                            `${getConfig().CJ_ACCESS_POINT}${constants.EndPoint.FREIGHT_CALCULATION}`,
                            data,
                            {},
                        ).then((result) => {
                            console.warn('result', result.data.data);
                            if (result.data.code == 200) {
                                let clean_freight = result.data.data;

                                clean_freight.map((item,index)=>{
                                    index == 0 ? item['isSelected'] = true : item['isSelected'] = false;
                                })

                                store.dispatch(handleLoader(false)) 
                                dispatch({
                                    type: types.GET_FREIGHT_PRODUCT_SUCCESS,
                                    data: clean_freight,
                                });

                                NavigationService.navigate(constants.ScreensName.ProductDetail.name, {product_image:product.variantImage})
                            } else {
                                //@failed return from server
                                dispatch({
                                    type: types.GET_FREIGHT_PRODUCT_FAIL,
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
                                type: types.GET_FREIGHT_PRODUCT_FAIL,
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

                    }else{
                        // logout here
                    }
                                    

                })
            }
        })
        dispatch({
            type: types.SET_PRODUCT_DETAILS,
            product: product            
        })
        
        

        
    }
}



export const clearShippingAddress = (new_shipping_address) => {
    
    return async (dispatch) => {
        
        dispatch({
            type: types.CLEAR_SHIPPING_ADDRESS,
            new_shipping_address: new_shipping_address            
        })
        
                
    }
}



export const getAllProducts = (currentPage,previousProductPage) => {
    return async (dispatch) => {
        
        NetInfo.fetch().then(state => {
            
            if (state.isConnected && state.isInternetReachable) {
                dispatch({
                    type: types.GET_FLASH_PRODUCT_LOADING,
                    isLoading: true,
             
                });
                
                // store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    
                    if (id !== null) {

                        
                        let data = {
                            "userId": id
                        }
                        GET(
                            `${getConfig().CJ_ACCESS_POINT}${constants.EndPoint.GET_ALL_PRODUCTS}?pageNum=${currentPage}`,
                           
                        )
                            .then((result) => {
                                
                                if (result.data.result) {

                                    
                                    if(currentPage >= 2){

                                        dispatch({
                                            type: types.GET_ALL_PRODUCTS_SUCCESS,
                                            data: [...new Set(previousProductPage),...result.data.data.list.filter((item)=>item.listingCount != 0) ]  ,
                                        });
                                    }else{
                                        dispatch({
                                            type: types.GET_ALL_PRODUCTS_SUCCESS,
                                            data: result.data.data.list.filter((item)=>item.listingCount != 0),
                                        });
                                    }
                                    


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
                                }
                            })
                            .catch((error) => {
                                console.warn('error'+error)
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


export const setVariant = (product) => {
    return async (dispatch) => {
            
        NetInfo.fetch().then(state => {
            
            if (state.isConnected && state.isInternetReachable) {
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
                        GET(
                            `${getConfig().CJ_ACCESS_POINT}${constants.EndPoint.GET_ALL_VARIANTS}?pid=${product.pid}`,
                           
                        )
                            .then((result) => {                                    
                                      console.warn('variant',result);
                                if (result.data.data) {
                                      
                                    
                                   dispatch({
                                        type: types.GET_ALL_VARIANTS_SUCCESS,
                                        data: result.data.data,                                        
                                    })

                                    store.dispatch(handleLoader(false))
                                    NavigationService.navigate(constants.ScreensName.Variant.name, null)

                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_ALL_VARIANTS_FAIL,
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
                                console.warn(error)
                                dispatch({
                                    type: types.GET_ALL_VARIANTS_FAIL,
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
                store.dispatch(handleLoader(false))
                console.warn('FREUGHT',payload.freightCalculation);
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id,
                            "ProductId": payload.id,
                            "variantName": payload.variantName,
                            "product_price": payload.price,
                            "product_code" : payload.product_code,
                            "product_image" : payload.product_image,
                            "freightCalculation" : payload.freightCalculation
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.ADD_TO_CART}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                
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
                                console.warn(error)
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
                    console.warn(error)
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
                                    store.dispatch(handleLoader(false))

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
                            "Prod_id": payload.pid,
                            'product':payload.product
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
                                console.log('result WishList',  result.data);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_WISHLIST_SUCCESS,
                                        data: result.data,
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



export const payOrder = (payload) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected && state.isInternetReachable) {
                store.dispatch(handleLoader(true))
                console.warn(payload);
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
                            "currencyFormat": '$'
                        }

                        
                        
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.PLACE_ORDER}`,
                            value,
                            {},
                        )
                            .then((result) => {
                            console.warn(result.data)
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


                        // COMMENTED PAY ORDER FOR MONGO DB
                        // POST(
                        //     `${getConfig().accesspoint}${constants.EndPoint.PLACE_ORDER}`,
                        //     value,
                        //     {},
                        // )
                        //     .then((result) => {
                        //         console.log('result', result);
                        //         if (result.data.status) {
                        //             dispatch({
                        //                 type: types.PLACE_ORDER_SUCCESS,
                        //                 //data: result.data.id,
                        //             });
                        //             Toast.show({
                        //                 text1: constants.AppConstant.Hypr,
                        //                 text2: "Great! your order has been placed. You can track it from dashboard.",
                        //                 type: "success",
                        //                 position: "top"
                        //             });
                        //             NavigationService.navigate("marketPlace", null)
                        //             store.dispatch(handleLoader(false))
                        //         } else {
                        //             //@failed return from server
                        //             dispatch({
                        //                 type: types.PLACE_ORDER_FAIL,
                        //                 isLoading: false,
                        //                 errorMessage: result.data.msg
                        //             });
                        //             Toast.show({
                        //                 text1: constants.AppConstant.Hypr,
                        //                 text2: result.data.msg,
                        //                 type: "error",
                        //                 position: "top"
                        //             });
                        //             store.dispatch(handleLoader(false))
                        //         }
                        //     })
                        //     .catch((error) => {
                        //         dispatch({
                        //             type: types.PLACE_ORDER_FAIL,
                        //             isLoading: false,
                        //             errorMessage: JSON.stringify(error)
                        //         });
                        //         console.log("error", error);
                        //         Toast.show({
                        //             text1: constants.AppConstant.Hypr,
                        //             text2: constants.AppConstant.something_went_wrong_message,
                        //             type: "error",
                        //             position: "top"
                        //         });
                        //         store.dispatch(handleLoader(false))
                        //     });
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
            console.warn(`${getConfig().accesspoint}${constants.EndPoint.CANCEL_ORDER_BY_USER}`)
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
            if (state.isConnected && state.isInternetReachable) {
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
                            "AlternativePhone": payload.AlternativePhone,
                            "country":payload.country,
                            "countryCode":payload.countryCode,

                            
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



export const updateAddress = (payload,props) => {    
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                
          
                store.dispatch(handleLoader(true))
                
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        const data = {
                            "id": id,
                            "userId": id,
                            "addressId": payload.selectedAddress.id,
                            "index": payload.index,
                            "name": payload.selectedAddress.name,
                            "mobile": payload.selectedAddress.mobile,
                            "pincode": payload.selectedAddress.pincode,
                            "location": payload.selectedAddress.location,
                            "address": payload.selectedAddress.address,
                            "city": payload.selectedAddress.city,
                            "state": payload.selectedAddress.state,
                            "landmark": payload.selectedAddress.landmark,
                            "AlternativePhone": payload.selectedAddress.AlternativePhone,
                            "country":payload.selectedAddress.country,
                            "country_code":payload.selectedAddress.country_code,

                            
                        }

                        
                    

                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.UPDATE_ADDRESS}`,
                            data,
                            {},
                        )
                            .then((result) => {
                             
                                if (result.data.status) {
                                    // update shipping address auth
                                    dispatch({
                                        type: types.UPDATE_ADDRESS_SUCCESS,                                        
                                        shipping_address:[data]
                                    });
                               
                                  
                                    
                                    

                                    // CALCULATRE FREIGHT
                                    let freight_data = {
                                        eccode: payload.selectedAddress.country_code,
                                        products:[{
                                            quantity: 1,
                                            vid: props.market.productDetails.vid
                                        }]
                                    };

                                    POST(
                                        `${getConfig().CJ_ACCESS_POINT}${constants.EndPoint.FREIGHT_CALCULATION}`,
                                        freight_data,
                                        {},
                                    ).then((result) => {
                                        
                                        if (result.data.code == 200) {
                                            //  set selected freight
                                            let clean_freight = result.data.data;
                                                clean_freight.map((item,index)=>{
                                                    index == 0 ? item['isSelected'] = true : item['isSelected'] = false;
                                                })
                                            dispatch({
                                                type: types.GET_FREIGHT_PRODUCT_SUCCESS,
                                                data: clean_freight,
                                            });

                                            store.dispatch(handleLoader(false))
                                            
                                            props.navigation.goBack();
                                        } else {
                                            //@failed return from server
                                            dispatch({
                                                type: types.GET_FREIGHT_PRODUCT_FAIL,
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
                                            type: types.GET_FREIGHT_PRODUCT_FAIL,
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
                                    //@failed return from server
                                    dispatch({
                                        type: types.UPDATE_ADDRESS_FAIL,
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
                                    type: types.UPDATE_ADDRESS_FAIL,
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
                        type: types.UPDATE_ADDRESS_FAIL,
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




// update selected logistic
export const updateLogistic = (clean_freight,props) => {    
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                
          
                store.dispatch(handleLoader(true))
                console.warn(clean_freight);
                getUserIdFromStorage().then(id => {
                    if (id !== null) {                 
                        dispatch({
                            type: types.UPDATE_FREIGHT_SUCCESS,                                        
                            freightCalculation:clean_freight
                        });
                        store.dispatch(handleLoader(false))
                        props.navigation.goBack();
                    } else {
                        //logout here
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.UPDATE_ADDRESS_FAIL,
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



    
export const createOrder = (payload) => {
    return async (dispatch) => {

        // dispatch({
        //     type: types.SAVE_ADDRESS,
        //     data: payload
        // })
        

        
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                
               let address = payload.address;
               let cart    = payload.cart;
               
                
               let clean_payload = {
                   products:[]
               };

               
               
                
                clean_payload.zip = '3023';
                clean_payload.code  = address.country_code;
                clean_payload.country = address.country;
                clean_payload.province = address.state;
                clean_payload.city = address.city;
                clean_payload.address = address.address;
                clean_payload.name = address.name;
                clean_payload.contact = address.mobile == null ? address.AlternativePhone : address.mobile;                
                clean_payload.remark = 'New Order';
                clean_payload.ccode = 'CH';
                clean_payload.logistic = payload.cart[0].f_freightCalculation[0].logisticName;                
                
                cart.map((product=>{
                    
                    clean_payload.products.push({
                        vid:product.f_ProductId,
                        quantity: product.f_itemQuantity,
                        shippingName: `${product.f_variantName}`,

                    })
                }))

                
                POST(
                    `${getConfig().CJ_ACCESS_POINT}${constants.EndPoint.CREATE_ORDER}`,
                    clean_payload,
                    {},
                )
                .then((result) => {
                    console.warn('MY ORDEr', result);

                }).catch((err)=>{

                    console.warn('Error',err);
                });
            }
        });


        
        NavigationService.navigate(constants.ScreensName.OrderScreen.name, null)
    }
}