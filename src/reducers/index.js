import { combineReducers } from 'redux'
import authReducer from './authReducer';
import marketReducer from './marketPlace';
import paymentReducer from './payment';
import chatReducer from './chatReducer';
import productsReducer from './productsReducer';
import socialReducer from './socialReducer';
import groupReducer from './groupReducer';
import pageReducer from './pageReducer';

export default combineReducers({
  auth: authReducer,
  market: marketReducer,
  payment: paymentReducer,
  chat: chatReducer,
  products: productsReducer,
  social: socialReducer,
  group: groupReducer,
  page: pageReducer
})