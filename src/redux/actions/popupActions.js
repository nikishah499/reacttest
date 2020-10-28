import {
  SHOW_POP_UP,
  HIDE_POP_UP,
} from '../reducers/popupReducer';

export const showPopupAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_POP_UP,
      payload: data
    });
  };
}

export const hidePopupAction = (data) => (dispatch) => {
  dispatch({ type: HIDE_POP_UP });
};
