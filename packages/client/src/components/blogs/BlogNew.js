// BlogNew shows BlogForm and BlogFormReview
import React, { useState } from 'react';

import BlogForm from './BlogForm';
import BlogFormReview from './BlogFormReview';

const BlogNew = props => {
    const [showFormReview, setShowFormReview] = useState(false);

    let content;
    if (showFormReview) {
        content = (
            <BlogFormReview
                onCancel={() => setShowFormReview(false)}
                formValues={showFormReview}
            />
        );
    } else {
        content = <BlogForm onBlogSubmit={setShowFormReview} />;
    }

    return <div>{content}</div>;
};

export default BlogNew;
