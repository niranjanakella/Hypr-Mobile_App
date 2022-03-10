import store from '../../store';

export const calculatePrice = (price) => {
    let calculatedPrice = (store.getState().auth.currency_value * price).toFixed(2)
    if(calculatedPrice>0){
        return calculatedPrice;
    }else{
        return 0;
    }
    
}