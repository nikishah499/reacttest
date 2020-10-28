import { push } from 'connected-react-router';

import authService from '../../services/authService';
import { LOGIN, LOGOUT, USER_KEY } from '../reducers/authReducer';
import { SHOW_LOADER, HIDE_LOADER } from '../reducers/loaderReducer';
import { showPopupAction } from './popupActions';
import storageHelper from '../../helpers/storage';

export const registerAction = (userDetails) => {
  return (dispatch) => {
    dispatch({type: SHOW_LOADER});
    return authService.registerService(userDetails)
      .then((user) => {
        storageHelper.setItem(USER_KEY, user);
        dispatch({
          type: LOGIN,
          payload: user
        });
        dispatch({type: HIDE_LOADER});
        dispatch(push('/'));
        return user;
      }).catch((error) => {
        dispatch(showPopupAction({
          header: 'Error',
          message: `${userDetails.email} is already registered with us. Please use different email address`
        }));
        dispatch({type: HIDE_LOADER});
        throw error;
      });
  }
};

export const loginAction = (credentials) => {
    return (dispatch) => {
        dispatch({type: SHOW_LOADER});
        return authService.loginService(credentials)
            .then((user) => {
                storageHelper.setItem(USER_KEY, user);
                dispatch({
                    type: LOGIN,
                    payload: user
                });
                dispatch({type: HIDE_LOADER});
                dispatch(push('/'));
            }).catch((error) => {
              dispatch(showPopupAction({ header: 'Error', message: 'Invalid username or password was passed'}));
              dispatch({type: HIDE_LOADER});
          });
    }
};

export const logOutAction = () => {
    return (dispatch) => {
        storageHelper.setItem(USER_KEY, null);
        storageHelper.deleteAllCookies();
        dispatch({
            type: LOGOUT
        });
    }
};
