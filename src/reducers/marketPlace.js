import types from '../constants/Types';
const initialstate = {
    productType: "",
    productDetails: null,
    variantName: [],
    variantValue: [],
    totalPayingAmount: 0,
    pincodeAddress: null,
    isPincodeAvailable: true,
    productList: [],
    flashSale: [],
    variants: [],
    allProducts: [],
    bestSelling: [],
    seasonTopPick: [],
    topPickOnProduct: [],
    trendingProducts: [],
    categoryList: [],
    cartList: [],
    wishList: [],
    countryList: [],
    searchCountryList: [],
    stateList: [],
    searchStateList: [],
    cityList: [],
    searchCityList: [],
    OrderSummary: [],
    activeOrderSummary: [],
    cancelledOrderSummary: [],
    deliveredOrderSummary: [],
    OrderDetails: null,
    searchProductList: [],
}

const marketReducer = (prevState = initialstate, action) => {
    
    switch (action.type) {
        case types.SET_PRODUCT_DATA:
            return {
                ...prevState,
                productType: action.data.productType,
                productList: action.products
            }
        case types.GET_PRODUCT_BY_CATEGORYID_SUCCESS:
            return {
                ...prevState,
                productList: action.data,
                productType: action.productType
            }

        case types.SET_PRODUCT_DETAILS:
            return {
                ...prevState,
                productDetails: action.product,
                variantName: action.variantName,
                variantValue: action.variantValue
            }

        case types.GET_FLASH_PRODUCT_SUCCESS:
            return {
                ...prevState,
                flashSale: action.data
            }

        case types.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...prevState,
                allProducts: action.data
            }
        case types.GET_ALL_VARIANTS_SUCCESS:
            return {
                ...prevState,
                variants: action.data
            }

        case types.GET_BEST_SELLING_PRODUCT_SUCCESS:
            return {
                ...prevState,
                bestSelling: action.data
            }

        case types.GET_SEASON_TOP_PRODUCT_SUCCESS:
            return {
                ...prevState,
                seasonTopPick: action.data
            }

        case types.GET_TRENDING_PRODUCT_SUCCESS:
            return {
                ...prevState,
                trendingProducts: action.data
            }

        case types.GET_TOP_PICK_ON_PRODUCT_SUCCESS:
            return {
                ...prevState,
                topPickOnProduct: action.data
            }

        case types.GET_CATEGORY_SUCCESS:
            return {
                ...prevState,
                categoryList: action.data
            }

        case types.GET_CART_LIST_SUCCESS:
            return {
                ...prevState,
                cartList: action.data,
                totalPayingAmount: action.totalPayingAmount
            }

        case types.GET_WISHLIST_SUCCESS:
            return {
                ...prevState,
                wishList: action.data
            }
        case types.GET_COUNRTY_SUCCESS:
            return {
                ...prevState,
                countryList: action.data
            }

        case types.GET_STATE_SUCCESS:
            return {
                ...prevState,
                stateList: action.data
            }
        case types.GET_CITY_SUCCESS:
            return {
                ...prevState,
                cityList: action.data
            }
        case types.CHECK_IF_PIN_EXIST_SUCCESS:
            return {
                ...prevState,
                pincodeAddress: action.data,
                isPincodeAvailable: action.available
            }
        case types.UNSET_PIN_DATA:
            return {
                ...prevState,
                pincodeAddress: true,
                isPincodeAvailable: null
            }
        case types.ORDER_SUMMARY_SUCCESS:
            return {
                ...prevState,
                OrderSummary: action.data,
                activeOrderSummary: action.activeOrderSummary,
                cancelledOrderSummary: action.cancelledOrderSummary,
                deliveredOrderSummary: action.deliveredOrderSummary
            }
        case types.ORDER_DETAIL_SUCCESS:
            return {
                ...prevState,
                OrderDetails: action.data
            }
        case types.FILTER_COUNTRY:
            return {
                ...prevState,
                searchCountryList: action.data
            }
        case types.FILTER_STATE:
            return {
                ...prevState,
                searchStateList: action.data
            }
        case types.FILTER_CITY:
            return {
                ...prevState,
                searchCityList: action.data
            }
        case types.GET_PRODUCT_BY_KEYWORD_SUCCESS:
            return {
                ...prevState,
                searchProductList: action.data
            }
        case types.CLEAR_SEARCH_PRODUCT:
            return {
                ...prevState,
                searchProductList: []
            }
        default:
            return prevState
    }
}

export default marketReducer;