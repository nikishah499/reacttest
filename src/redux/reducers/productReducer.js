import { LOGOUT } from './authReducer';

export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';

const initialState = {
    products: [],
    count: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT_LIST:
            return {
                ...state,
                products: action.payload.productList,
                count: action.payload.count
            };
        case LOGOUT:
            return {
                ...state,
                products: [],
                count: 0
            };
        default:
            return state;
    }
}
