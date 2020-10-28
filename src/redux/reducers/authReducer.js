import storageHelper from '../../helpers/storage';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const USER_KEY = 'auth.user';

const initialState = {
  user: storageHelper.getItem(USER_KEY)
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}
