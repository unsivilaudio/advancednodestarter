import React, { Component, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useActions from '../../hooks/use-actions';

const BlogShow = props => {
    const params = useParams();
    const blogData = useSelector(state => state.blog);
    const blog = Object.values(blogData).find(b => b._id === params._id);
    const { fetchBlog } = useActions();

    useEffect(() => {
        fetchBlog(params._id);
    }, []);

    if (!blog) {
        return <h2>No Blog found with id.</h2>;
    }

    const { title, content } = blog;

    return (
        <div className='section white'>
            <h3>{title}</h3>
            <p>{content}</p>
            <img
                alt='blog post'
                className='materialboxed'
                width='100%'
                src={blog.imageUrl}
            />
        </div>
    );
};

export default BlogShow;
