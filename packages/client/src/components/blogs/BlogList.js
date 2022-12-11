import { useEffect } from 'react';
import map from 'lodash/map';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useActions from '../../hooks/use-actions';

const BlogList = props => {
    const { fetchBlogs } = useActions();
    const blogData = useSelector(state => state.blog);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const blogs = map(blogData, blog => {
        return (
            <div className='card darken-1 horizontal' key={blog._id}>
                <div className='card-stacked'>
                    <div className='card-content'>
                        <span className='card-title'>{blog.title}</span>
                        <p>{blog.content}</p>
                    </div>
                    <div className='card-action'>
                        <Link to={`/blogs/${blog._id}`}>Read</Link>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <h2>Your Blog List</h2>
            {blogs}
        </div>
    );
};

export default BlogList;
