import axios from 'axios';
import { push } from 'connected-react-router';
import storeInstance  from '../store';
import storageHelper from './storage';
import { logOutAction } from '../redux/actions/authAction';
import { USER_KEY } from '../redux/reducers/authReducer';

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const user = storageHelper.getItem(USER_KEY);
    if (user && user.token) {
      config.headers['token'] = user.token;
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });



//Add a response interceptor

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  const {status, data: {message}} = error.response;
  if (status === 401 && (message === 'jwt expired' || message === 'invalid signature')) {
    storeInstance.dispatch(logOutAction());
    push('/login');
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

export default axios;
