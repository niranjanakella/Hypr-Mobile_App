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
    getCurrencyRateFromStorage,
    setUserDataToStorage,
    getUserDataFromStorage
} from '../utils/asyncstorage'


import getConfig from '../utils/config';
import * as NavigationService from '../navigation/NavigationService';


export const getUserAuth = () => {
    let response = '';
        getUserIdFromStorage().then(id => {
            if (id) {
                const value = {
                    "_id": id
                }

                let get_result = '';
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.EDIT_USER}`,
                    value,
                    {},
                )
                    .then((result) => {
                     
                        if (!result.data.status) {
                           
                           get_result = result.data.data[0];
                           setUserDataToStorage(result.data.data[0])
                          
                        } else {
                          
                        }
                    })
                    .catch((error) => {
                    
                    });

                response = get_result;
            }
            else {
                
            }
        })


    // setUserDataToStorage(response)
};


export const switchRoute = (props) => {
    return async (dispatch) => {
        
        await getUserAuth();
        dispatch({
            type: types.AUTH_SWITCH_ROUTE,
            isLoading: true,
            isAppLoading: false
        })

         getUserDataFromStorage().then((userData)=> {
            
            getUserAccessTokenFromStorage().then(token => {
                if (token !== null) {
                    
                    
                    dispatch({
                        type: types.AUTH_SWITCH_ROUTE,
                        isLoading: false,
                        isAppLoading: false,
                        accessToken: token,
                        userData:userData,
                        countryCode:userData.f_countryName,
                        shipping_address:userData.f_shipping_Address.filter((item)=> item.isSelected == true),
                        isVerified: true
                    })
                } else {
                    dispatch({
                        type: types.AUTH_SWITCH_ROUTE,
                        isLoading: false,
                        isAppLoading: false,
                        accessToken: null,
                        userData:null,
                        isVerified: false
                    })
                }
            }).catch(() => {
                dispatch({
                    type: types.AUTH_SWITCH_ROUTE,
                    isLoading: false,
                    isAppLoading: false,
                    accessToken: null,
                    userData:null,
                    isVerified: false
                })
            })
        })

    }
}

export const handleLoader = (value) => {
    return async (dispatch) => {
        if (value) {
            dispatch({
                type: types.HANDLE_LOADER,
                value: true
            })
        }
        else {
            dispatch({
                type: types.HANDLE_LOADER,
                value: false
            })
        }
    }
}

export const setTabType = (value) => {
    return async (dispatch) => {
        dispatch({
            type: types.SET_TAB_TYPE,
            data: value
        })
    }
}

export const setUserType = (value) => {
    return async (dispatch) => {
        dispatch({
            type: types.SET_MEMBER_OR_SELLER,
            usertype: value
        })
    }
}

export const logout = () => {
    
    return async (dispatch) => {
        dispatch({
            type: types.LOGOUT,
            isLoading: true,
        });
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            const value = {
                "_id": id
            }
            POST(
                `${getConfig().accesspoint}${constants.EndPoint.LOGOUT}`,
                value,
                {},
            )
                .then((result) => {
                    console.log('result', result);
                    if (result.data.status) {
                        wipeStorage()
                        store.dispatch(switchRoute())
                        store.dispatch(handleLoader(false))
                    } else {
                        //@failed return from server
                        dispatch({
                            type: types.LOGOUT,
                            isLoading: false,
                        });
                        wipeStorage()
                        store.dispatch(handleLoader(false))
                        store.dispatch(switchRoute())
                    }
                })
                .catch((error) => {
                    dispatch({
                        type: types.LOGOUT,
                        isLoading: false,
                    });
                    console.log("error", error);
                    wipeStorage()
                    store.dispatch(handleLoader(false))
                    store.dispatch(switchRoute())
                });
        })

    };
};

export const signup = (payload) => {
    
    
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected && state.isInternetReachable) {
                dispatch({
                    type: types.SIGNUP_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                const storeData = store.getState().auth;
                payload = {
                    ...payload,
                    "appID": storeData.socialMediaId,
                    "f_provider": storeData.socialMediaType
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.SIGNUP}`,
                    payload,
                    {},
                )
                    .then((result) => {
                        console.warn(result.data.status);
                        if (result.data.status) {


                            
                            dispatch({
                                type: types.SIGNUP_SUCCESS,
                                isLoading: false,                                                                                                                
                            });
                            
                            Toast.show({
                                text1: "Hypr",
                                text2: "Successfuly Registered. Please check your email to verify your account.",
                                type: "success",
                                position: "top"
                            });     

                            store.dispatch(handleLoader(false))
                                                        
                            NavigationService.goback();
                        } else {
                            store.dispatch(handleLoader(false))
                            console.log(JSON.stringify(result.data))
                            //@failed return from server
                            store.dispatch(handleLoader(fakl))
                            dispatch({
                                type: types.SIGNUP_FAIL,
                                isLoading: false,
                                errorMessage: result.msg
                            });

                        

                            Toast.show({
                                text1: constants.AppConstant.Hypr,
                                text2: result.msg,
                                type: "error",
                                position: "top"
                            });
                        }
                    })
                    .catch((error) => {
                        store.dispatch(handleLoader(false))
                        // alert( JSON.stringify(error))
                        // alert(`${getConfig().accesspoint}${constants.EndPoint.SIGNUP}`)
                        // store.dispatch(handleLoader(false))
                        // dispatch({
                        //     type: types.SIGNUP_FAIL,
                        //     isLoading: false,
                        //     errorMessage: JSON.stringify(error)
                        // });
                        
                        // Toast.show({
                        //     text1: constants.AppConstant.Hypr,
                        //     text2: constants.AppConstant.something_went_wrong_message,
                        //     type: "error",
                        //     position: "top"
                        // });
                    });
            }
            else {
                store.dispatch(handleLoader(false))
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

export const login = (payload) => {
    
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            
            if (state.isConnected && state.isInternetReachable) {
                dispatch({
                    type: types.LOGIN_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                
                const data = {
                    "email": payload.email ? payload.email : "",
                    "password": payload.password ? payload.password : "",
                    "appID": payload.social_id ? payload.social_id : "",
                    "f_provider": payload.social_type ? payload.social_type : ""
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.LOGIN}`,
                    data,
                    {},
                )
                    .then((result) => {
                        
                        console.warn('my data',result);
                        if (result.data.status) {
                            dispatch({
                                type: types.LOGIN_SUCCESS,
                                isLoading: false,
                                data: result.data.data,
                                userData:result.data.data,
                                errorMessage: null   
                            });  
                            
                            let user_id = result.data.data._id;
                            // setUserIdToStorage(result.data.data._id)
                            // setUserAccessTokenToStorage(result.data.data._id)                            
                            // store.dispatch(switchRoute())
                            
                            setUserIdToStorage(user_id)                            
                            NavigationService.navigate(constants.ScreensName.VerifyOtp.name, {userData:result.data.data})
                            store.dispatch(handleLoader(false))
                            
                        } else {
                            //@failed return from server
                            store.dispatch(handleLoader(false))
                            dispatch({
                                type: types.LOGIN_FAIL,
                                isLoading: false,
                                errorMessage: result.data.msg
                            });
                            if (payload.social_id) {
                                NavigationService.navigate(constants.ScreensName.SignUp.name, null)
                            } else {
                                Toast.show({
                                    text1: constants.AppConstant.Hypr,
                                    text2: result.data.msg,
                                    type: "error",
                                    position: "top"
                                });
                            }
                        }
                    })
                    .catch((error) => {
                    
                        store.dispatch(handleLoader(false))
                        dispatch({
                            type: types.LOGIN_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                        console.warn("error", error);
                    });
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

export const resetPassword = (value) => {
    console.log('value of log in', value);

    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.RESET_PASSWORD_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                POST(
                    `${getConfig().accesspoint}${constants.Endpoints.RESET_PASSWORD}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.status) {
                            dispatch({
                                type: types.RESET_PASSWORD_SUCCESS,
                                isLoading: false,
                                data: result,
                                errorMessage: null,
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.RESET_PASSWORD_FAIL,
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
                            type: types.RESET_PASSWORD_FAIL,
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

export const getUser = () => {
    return async (dispatch) => {
        dispatch({
            type: types.GET_USER_LOADING,
            isLoading: true,
        });
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id) {
                const value = {
                    "_id": id
                }
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.EDIT_USER}`,
                    value,
                    {},
                )
                    .then((result) => {
                     
                        if (!result.data.status) {
                            let shippingAddress = result.data.data[0].f_shipping_Address;
                            // shippingAddress.map(item => {
                            //     { item.isSelected = false; return item; }
                            // })  
                             
                            dispatch({
                                type: types.GET_USER_SUCCESS,
                                isLoading: false,
                                data: result.data.data,
                                shipping_address: shippingAddress
                            });
                            store.dispatch(handleLoader(false))
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.GET_USER_FAIL,
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
                            type: types.GET_USER_FAIL,
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
            }
            else {
                //@failed return from server
                dispatch({
                    type: types.GET_USER_FAIL,
                    isLoading: false,
                    errorMessage: "no login"
                });
                store.dispatch(handleLoader(false))
            }
        })


    };
};

export const updateUser = (value) => {
    return async (dispatch) => {
        dispatch({
            type: types.UPDATE_USER_LOADING,
            isLoading: true,
        });
        store.dispatch(handleLoader(true))
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                const storeData = store.getState().auth
                
                value = {
                    ...value,
                    "_id": id,
                    "email": storeData.userData.email,
                    // "age": storeData.userData.age,
                    // "dob": storeData.userData.dob
                }
                console.log("final value of update user", value);
                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.UPDATE_USER}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.UPDATE_USER_SUCCESS,
                                isLoading: false,
                                data: result,
                                errorMessage: null
                            });
                            store.dispatch(handleLoader(false))
                            store.dispatch(getUser())
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.UPDATE_USER_FAIL,
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
                            type: types.UPDATE_USER_FAIL,
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
                type: types.UPDATE_USER_FAIL,
                isLoading: false,
                errorMessage: JSON.stringify(error)
            });
            store.dispatch(handleLoader(false))
            console.log("error", error);
        })


    };
};

export const changePassword = (value) => {
    console.log('value of log in', value);

    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.CHANGE_PASSWORD_LOADING,
                    isLoading: true,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        value = {
                            ...value,
                            "_id": id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.CHANGE_PASSWORD}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.CHANGE_PASSWORD_SUCCESS,
                                        isLoading: false,
                                        data: result,
                                        errorMessage: null
                                    });
                                    store.dispatch(handleLoader(false))
                                    store.dispatch(logout())
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.CHANGE_PASSWORD_FAIL,
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
                                    type: types.CHANGE_PASSWORD_FAIL,
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
                        type: types.CHANGE_PASSWORD_FAIL,
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

export const forgotPassword = (value) => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch({
                    type: types.FORGOT_PASSWORD_LOADING,
                    isLoading: true,
                });

                POST(
                    `${getConfig().accesspoint}${constants.EndPoint.FORGOT_PASSWORD}`,
                    value,
                    {},
                )
                    .then((result) => {
                        console.log('result', result);
                        if (result.data.status) {
                            dispatch({
                                type: types.FORGOT_PASSWORD_SUCCESS,
                                isLoading: false,
                                data: result,
                                errorMessage: null
                            });
                        } else {
                            //@failed return from server
                            dispatch({
                                type: types.FORGOT_PASSWORD_FAIL,
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
                            type: types.FORGOT_PASSWORD_FAIL,
                            isLoading: false,
                            errorMessage: JSON.stringify(error)
                        });
                        Toast.show({
                            text1: constants.AppConstant.Hypr,
                            text2: constants.AppConstant.something_went_wrong_message,
                            type: "error",
                            position: "top"
                        });
                        console.log("error", error);
                    });
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

export const verifyOtp = (value) => {
                
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected && state.isInternetReachable) {
                dispatch({
                    type: types.VERIFY_OTP_LOADING,
                    isLoading: false,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        value = {
                            ...value,
                            "_id": id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.VERIFY_OTP}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.warn('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.VERIFY_OTP_SUCCESS,
                                        isLoading: false,
                                        data: result,
                                        errorMessage: null
                                    });
                                    Toast.show({
                                        text1: "Hypr",
                                        text2: "OTP verified successfully!",
                                        type: "success",
                                        position: "top"
                                    });
                                    store.dispatch(handleLoader(false))
                                    setUserIdToStorage(id)
                                    setUserAccessTokenToStorage(id)    
                                    setUserDataToStorage(value.userData)                                    
                                    
                                    store.dispatch(switchRoute())
                            
                             
                                } else {
                                    
                                    //@failed return from server
                                    dispatch({
                                        type: types.VERIFY_OTP_FAIL,
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
                                    type: types.VERIFY_OTP_FAIL,
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
                                console.log("error", error);
                            });
                    } else {
                        //logout here
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.VERIFY_OTP_FAIL,
                        isLoading: false,
                        errorMessage: JSON.stringify(error)
                    });
                    store.dispatch(handleLoader(false))
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


export const resendOTP = (value) => {

    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected && state.isInternetReachable) {
                dispatch({
                    type: types.VERIFY_OTP_LOADING,
                    isLoading: false,
                });
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                   
                    if (id !== null) {

                    
                        value = {
                            ...value,
                            "_id": id
                        }
                        
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.RESEND_OTP}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.warn('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.VERIFY_OTP_SUCCESS,
                                        isLoading: false,
                                        data: result,
                                        errorMessage: null
                                    });
                                    Toast.show({
                                        text1: "Hypr",
                                        text2: "A new OTP has been sent to your email! Please check your inbox.",
                                        type: "success",
                                        position: "top"
                                    });                                    
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.VERIFY_OTP_FAIL,
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
                                    
                                console.warn(error)
                                dispatch({
                                    type: types.VERIFY_OTP_FAIL,
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
                                console.log("error", error);
                            });
                    } else {
                        //logout here
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.VERIFY_OTP_FAIL,
                        isLoading: false,
                        errorMessage: JSON.stringify(error)
                    });
                    store.dispatch(handleLoader(false))
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



export const socialLogin = ({ value, onSuccess }) => {
    console.log("store data", store.getState());
    return async (dispatch) => {
        dispatch({
            type: types.SOCIAL_MEDIA_LOGIN,
            email: value.email,
            firstName: value.firstName,
            lastName: value.lastName,
            phone: value.phone,
            social_type: value.social_type
        })
        onSuccess()
    }
}

export const saveAddress = (payload) => {
    return async (dispatch) => {

        // dispatch({
        //     type: types.SAVE_ADDRESS,
        //     data: payload
        // })
        
        let data = {
           payload:payload
        }
        
        getUserIdFromStorage().then(id => {
            if (id !== null) {
                
               let address = payload.address;
               let cart    = payload.cart;

                
               let clean_payload = {
                   products:[]
               };
               
               console.warn('Cart',cart)
                
                clean_payload.zip = address.pincode;
                clean_payload.code  = address.country_code;
                clean_payload.country = address.country;
                clean_payload.province = address.state;
                clean_payload.city = address.city;
                clean_payload.address = address.address;
                clean_payload.name = address.name;
                clean_payload.contact = address.mobile == null ? address.AlternativePhone : address.mobile;                
                clean_payload.remark = 'New Order';
                clean_payload.ccode = address.country_code;
                clean_payload.logistic = payload.cart[0].f_freightCalculation[0].logisticName;                
                console.warn(payload.cart[0].f_freightCalculation[0].logisticName);
                cart.map((product=>{
                    
                    clean_payload.products.push({
                        vid:product.f_ProductId,
                        quantity: product.f_itemQuantity,
                        shippingName: product.variatName+' 2',

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

                    console.warn(err);
                });
            }
        });


        
        NavigationService.navigate(constants.ScreensName.OrderScreen.name, null)
    }
}

export const setSocialMediaData = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: types.SET_SOCIAL_MEDIA_DATA,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            social_type: payload.social_type,
            id: payload.id
        })
    }
}

export const setCurrencyType = (currency) => {
    store.dispatch(handleLoader(true))
    let currency_value = 1;
    let currency_symbol = "$";
    if (currency === "USD") {
        currency_symbol = "$"
    } else if (currency === "EUR") {
        currency_symbol = "€"
    }
    else if (currency === "INR") {
        currency_symbol = "₹"
    } else {
        currency_symbol = currency
    }
    const data = store.getState().auth;

    Object.keys(data.todayCurrencyRate).map(function (key, index) {
        if (key === currency) {
            currency_value = data.todayCurrencyRate[key]
        }
    });
    console.log("currency while setting to local store", currency, currency_symbol, currency_value);
    setCurrencyToStorage(currency)
    setCurrencySymbolToStorage(currency_symbol)
    setCurrencyRateToStorage(currency_value)
    return async (dispatch) => {
        dispatch({
            type: types.SET_CURRENCY_TYPE,
            currency: currency,
            currency_symbol: currency_symbol,
            currency_value: currency_value
        })
        store.dispatch(handleLoader(false))
    }
}

export const todayCurrencyRate = () => {
    return async (dispatch) => {
        GET(`${constants.EndPoint.CURRENCY_RATE}`).then((result) => {
            console.log("currency rate result", result);
            //let currencyList = []
            let currencyList = Object.keys(result.data.rates)
            dispatch({
                type: types.TODAY_CURRENCY_RATE,
                todayCurrencyRate: result.data.rates,
                currencyList: currencyList
            })
        })

    }
}

export const getCurrencyDetailsFromLocalStorage = () => {
    return async (dispatch) => {
        getCurrencyFromStorage().then((currency) => {
            if (currency) {
                console.log("currency", currency);
                getCurrencySymbolFromStorage().then((currency_symbol) => {
                    if (currency_symbol) {
                        console.log("currency_symbol", currency_symbol);
                        getCurrencyRateFromStorage().then((currency_rate) => {
                            if (currency_rate) {
                                console.log("currency_rate", currency_rate);
                                dispatch({
                                    type: types.SET_CURRENCY_TYPE,
                                    currency: currency,
                                    currency_symbol: currency_symbol,
                                    currency_value: currency_rate
                                })
                            } else {
                                dispatch({
                                    type: types.SET_CURRENCY_TYPE,
                                    currency: "EUR",
                                    currency_symbol: "€",
                                    currency_value: 1
                                })
                            }
                        })
                    } else {
                        dispatch({
                            type: types.SET_CURRENCY_TYPE,
                            currency: "EUR",
                            currency_symbol: "€",
                            currency_value: 1
                        })
                    }
                })
            } else {
                dispatch({
                    type: types.SET_CURRENCY_TYPE,
                    currency: "EUR",
                    currency_symbol: "€",
                    currency_value: 1
                })
            }
        })
    }
}

export const filtercurrency = (value) => {
    return async (dispatch) => {
        let currencyList = store.getState().auth.currencyList
        let updatedCurrencyList = []
        currencyList.map((item) => {
            if (item.includes(value)) {
                updatedCurrencyList.push(item)
            }
        })
        dispatch({
            type: types.FILTER_CURRENCY,
            data: updatedCurrencyList
        })
    }
}

export const getNetworkList = () => {
    return async (dispatch) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                store.dispatch(handleLoader(true))
                getUserIdFromStorage().then(id => {
                    if (id !== null) {
                        let value = {
                            "userId": id
                        }
                        POST(
                            `${getConfig().accesspoint}${constants.EndPoint.NETWORK}`,
                            value,
                            {},
                        )
                            .then((result) => {
                                console.log('result', result);
                                if (result.data.status) {
                                    dispatch({
                                        type: types.GET_NETWORK_SUCCESS,
                                        data: result.data.data,
                                    });
                                    store.dispatch(handleLoader(false))
                                } else {
                                    //@failed return from server
                                    dispatch({
                                        type: types.GET_NETWORK_FAIL,
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
                                    type: types.GET_NETWORK_FAIL,
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
                        store.dispatch(handleLoader(false))
                        //logout here
                    }
                }).catch((error) => {
                    dispatch({
                        type: types.GET_NETWORK_FAIL,
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