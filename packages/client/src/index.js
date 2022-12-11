import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './store';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
