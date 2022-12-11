import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header(props) {
    const auth = useSelector(state => state.auth);

    let content;
    switch (auth) {
        case null:
            break;
        case false:
            content = (
                <li>
                    <a href={'/auth/google'}>Login With Google</a>
                </li>
            );
            break;
        default:
            content = [
                <li key='3' style={{ margin: '0 10px' }}>
                    <Link to='/blogs'>My Blogs</Link>
                </li>,
                <li key='2'>
                    <a href={'/auth/logout'}>Logout</a>
                </li>,
            ];
            break;
    }

    return (
        <nav className='indigo'>
            <div className='nav-wrapper'>
                <Link
                    to={auth ? '/blogs' : '/'}
                    className='left brand-logo'
                    style={{ marginLeft: '10px' }}>
                    Blogster
                </Link>
                <ul className='right'>{content}</ul>
            </div>
        </nav>
    );
}

export default Header;
