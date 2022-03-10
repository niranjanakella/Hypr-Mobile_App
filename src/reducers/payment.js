import types from '../constants/Types';
const initialstate = {
    walletHistory: [],
    selectedWalletDetails: {},
    emailList: []
}

const paymentReducer = (prevState = initialstate, action) => {
    switch (action.type) {
        case types.WALLET_HISTORY_SUCCESS:
            return {
                ...prevState,
                walletHistory: action.data
            }
        case types.SET_SELECTED_WALLET_DETAILS:
            return {
                ...prevState,
                selectedWalletDetails: action.data
            }
        case types.CHECK_IF_EMAIL_EXIST_SUCCESS:
            return {
                ...prevState,
                emailList: action.data
            }
        case types.CLEAR_EMAIL_EXIST:
            return {
                ...prevState,
                emailList: []
            }
        default:
            return prevState
    }
}

export default paymentReducer;