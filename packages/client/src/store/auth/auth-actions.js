import axios from 'axios';
import * as ActionTypes from './auth-types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: ActionTypes.AUTH_FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: ActionTypes.AUTH_FETCH_USER, payload: res.data });
};
