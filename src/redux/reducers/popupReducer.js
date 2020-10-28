import { LOGOUT } from './authReducer';

export const SHOW_POP_UP = 'SHOW_POP_UP';
export const HIDE_POP_UP = 'HIDE_POP_UP';


const initialState = {
  showPopup: false,
  header: '',
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_POP_UP:
      return {
        ...state,
        showPopup: true,
        header: action.payload.header,
        message: action.payload.message
      };
    case HIDE_POP_UP:
      return {
        ...state,
        showPopup: false,
        header: '',
        message: ''
      };
    case LOGOUT:
      return {
        ...state,
        showPopup: false,
        header: '',
        message: ''
      };
    default:
      return state;
  }
}
