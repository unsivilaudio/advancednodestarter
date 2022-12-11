import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import useActions from '../hooks/use-actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import BlogNew from './blogs/BlogNew';
import BlogShow from './blogs/BlogShow';

function App(props) {
    const { fetchUser } = useActions();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <div className='container'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/blogs/new' element={<BlogNew />} />
                    <Route exact path='/blogs/:_id' element={<BlogShow />} />
                    <Route path='/blogs' element={<Dashboard />} />
                    <Route path='/' element={<Landing />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
