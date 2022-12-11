// BlogFormReview shows users their form inputs for review
import _ from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import formFields from './formFields';
import useActions from '../../hooks/use-actions';

const BlogFormReview = ({ onCancel, formValues }) => {
    const navigate = useNavigate();
    const { submitBlog } = useActions();
    const [file, setFile] = useState(null);

    const fields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    const buttons = (
        <div>
            <button
                className='yellow darken-3 white-text btn-flat'
                onClick={onCancel}>
                Back
            </button>
            <button className='green btn-flat right white-text'>
                Save Blog
                <i className='material-icons right'>email</i>
            </button>
        </div>
    );

    function onSubmit(event) {
        event.preventDefault();

        submitBlog(formValues, file, navigate);
    }

    function onFileChange(e) {
        setFile(e.target.files[0]);
    }

    return (
        <form onSubmit={onSubmit}>
            <h5>Please confirm your entries</h5>
            {fields}
            <h5>Add An Image</h5>
            <input type='file' accept='image/*' onChange={onFileChange} />
            {buttons}
        </form>
    );
};

export default BlogFormReview;
