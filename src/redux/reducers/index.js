import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';
import loaderReducer from './loaderReducer';
import popupReducer from './popupReducer';
import productReducer from './productReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    authReducer,
    loaderReducer,
    popupReducer,
    productReducer
});

export default createRootReducer;
