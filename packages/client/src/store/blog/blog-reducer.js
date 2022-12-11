import mapKeys from 'lodash/mapKeys';
import * as ActionTypes from './blog-types';

export default function (state = {}, action) {
    switch (action.type) {
        case ActionTypes.BLOG_FETCH_BLOG:
            const blog = action.payload;
            return { ...state, [blog._id]: blog };
        case ActionTypes.BLOG_FETCH_BLOGS:
            return { ...state, ...mapKeys(action.payload, '_id') };
        default:
            return state;
    }
}
