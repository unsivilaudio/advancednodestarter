import * as ActionTypes from './auth-types';

const reducer = (state = null, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_FETCH_USER:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
