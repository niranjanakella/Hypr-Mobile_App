import types from '../constants/Types';
const initialstate = {
    accessToken: null,
    userId: null,
    isAppLoading: true,
    isLoading: false,
    userData: [],
    errorMessage: null,
    usertype: 0,
    signUpData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    },
    address: {},
    socialMediaFirstName: "",
    socialMediaLastName: "",
    socialMediaEmail: "",
    socialMediaId: "",
    socialMediaType: "",
    currency_symbol: "€",
    currency: "EUR",
    currency_value: 1,
    todayCurrencyRate: [],
    currencyList: [],
    searchCurrencyList: [],
    tab_type: "dashboard",
    networkList: [],
    shipping_address: []
}

const authReducer = (prevState = initialstate, action) => {
    switch (action.type) {
        case types.AUTH_SWITCH_ROUTE:
            return {
                ...prevState,
                isLoading: action.isLoading,
                isAppLoading: action.isAppLoading,
                accessToken: action.accessToken,
                shipping_address: action.shipping_address,
                userData: action.userData,
                isVerified: action.isVerified,
            }

        case types.SET_TAB_TYPE:
            return {
                ...prevState,
                tab_type: action.data,
            }

        case types.HANDLE_LOADER:
            return {
                ...prevState,
                isLoading: action.value
            }
        case types.SIGNUP_LOADING:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.SIGNUP_SUCCESS:
            return {
                ...prevState,
                userId: action.data.id,
                accessToken: action.data.accessToken,
                isLoading: action.isLoading,
                errorMessage: action.errorMessage
            }
        case types.SIGNUP_FAIL:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }

        case types.LOGIN_LOADING:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.LOGIN_SUCCESS:
            return {
                ...prevState,
                isLoading: action.isLoading,
                userData: action.data,
                // accessToken: action.data.accessToken,
                userId: action.data._id,
                usertype: action.data.signupType
            }
        case types.LOGIN_FAIL:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }

        case types.LOGOUT:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.RESET_PASSWORD_LOADING:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.RESET_PASSWORD_SUCCESS:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.RESET_PASSWORD_FAIL:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.CHANGE_PASSWORD_LOADING:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.CHANGE_PASSWORD_SUCCESS:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.CHANGE_PASSWORD_FAIL:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.GET_USER_LOADING:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.UPDATE_ADDRESS_SUCCESS:
                return {
                    ...prevState,
                    shipping_address: action.shipping_address
                }
        case types.GET_USER_SUCCESS:
            return {
                ...prevState,
                isLoading: action.isLoading,
                userData: action.data[0],                
                usertype: action.data[0].signupType,
                shipping_address: action.shipping_address
            }
        case types.GET_USER_FAIL:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.UPDATE_USER_LOADING:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.UPDATE_USER_SUCCESS:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.UPDATE_USER_FAIL:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }

        case types.VERIFY_OTP_LOADING:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.VERIFY_OTP_SUCCESS:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.VERIFY_OTP_FAIL:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.FORGOT_PASSWORD_LOADING:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.FORGOT_PASSWORD_SUCCESS:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }
        case types.FORGOT_PASSWORD_FAIL:
            return {
                ...prevState,
                isLoading: action.isLoading,
            }

        case types.SOCIAL_MEDIA_LOGIN:
            return {
                ...prevState,
                signUpData: {
                    email: action.email,
                    firstName: action.firstName,
                    lastName: action.lastName,
                    phone: action.phone
                },
                social_type: action.social_type
            }

        case types.SET_MEMBER_OR_SELLER:
            return {
                ...prevState,
                usertype: action.usertype
            }

        case types.SAVE_ADDRESS:
            return {
                ...prevState,
                address: action.data
            }
        case types.SET_SOCIAL_MEDIA_DATA:
            return {
                ...prevState,
                socialMediaFirstName: action.firstName,
                socialMediaLastName: action.lastName,
                socialMediaEmail: action.email,
                socialMediaType: action.social_type,
                socialMediaId: action.id
            }
        case types.SET_CURRENCY_TYPE:
            return {
                ...prevState,
                currency: action.currency,
                currency_symbol: action.currency_symbol,
                currency_value: action.currency_value
            }
        case types.TODAY_CURRENCY_RATE:
            return {
                ...prevState,
                todayCurrencyRate: action.todayCurrencyRate,
                currencyList: action.currencyList
            }
        case types.FILTER_CURRENCY:
            return {
                ...prevState,
                searchCurrencyList: action.data
            }
        case types.GET_NETWORK_SUCCESS:
            return {
                ...prevState,
                networkList: action.data
            }
        default:
            return prevState
    }
}
export default authReducer