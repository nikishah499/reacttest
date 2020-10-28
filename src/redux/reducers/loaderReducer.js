import { LOGOUT } from './authReducer';

export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

const initialState = {
    isLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                isLoading: true
            };
        case HIDE_LOADER:
            return {
                ...state,
                isLoading: false
            };
        case LOGOUT:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}
