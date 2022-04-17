import types from '../constants/Types';
const initialstate = {
  products:[],
  unsortedProducts:[]
}

const productsReducer = (prevState = initialstate, action) => {
    switch (action.type) {
        case types.GET_ALL_PRODUCT_SUCCESS:
            return {
                ...prevState,
                products: action.data
            }
            
        default:
            return prevState
    }
}

export default productsReducer;