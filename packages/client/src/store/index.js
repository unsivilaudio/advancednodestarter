import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from 'redux';
import thunk from 'redux-thunk';
import auth from './auth/auth-reducer';
import blog from './blog/blog-reducer';

const reducers = combineReducers({
    auth,
    blog,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

export default store;
