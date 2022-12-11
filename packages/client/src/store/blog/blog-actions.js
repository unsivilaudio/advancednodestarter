import axios from 'axios';
import * as ActionTypes from './blog-types';

export const submitBlog = (values, file, navigate) => async dispatch => {
    const formData = new FormData();
    formData.set('image', file);
    const uploadRes = await axios.post('/api/upload', formData);

    const res = await axios.post('/api/blogs', {
        ...values,
        imageUrl: uploadRes.data.key,
    });

    navigate('/blogs');
    dispatch({ type: ActionTypes.BLOG_FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async dispatch => {
    const res = await axios.get('/api/blogs');

    dispatch({ type: ActionTypes.BLOG_FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
    const res = await axios.get(`/api/blogs/${id}`);

    dispatch({ type: ActionTypes.BLOG_FETCH_BLOG, payload: res.data });
};
