import {createStore, compose, applyMiddleware} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import createRootReducer from './redux/reducers';

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleWare = [
    thunk,
    routerMiddleware(history)
];

if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const composedEnhancers = compose(
    applyMiddleware(...middleWare),
    ...enhancers
);

export default createStore(
    createRootReducer(history),
    initialState,
    composedEnhancers
);
