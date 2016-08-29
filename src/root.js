import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router.js';
import browserHistory from 'react-router/lib/browserHistory.js';
import Provider from 'react-redux/lib/components/Provider.js';

import storeManager from 'core/store-manager.js';
import Root from './components/root.jsx';

import ajax from 'utils/ajax.js';
import cookie from 'utils/cookie.js';

// reducer
const token = cookie.getItem('token') || null;

const reducer = (state = {token}, action) => {
    switch (action.type) {
        case 'SET-TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'CLEAR-TOKEN':
            cookie.removeItem('token', '/');

            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
};

// route
const route = {
    path: '/',
    component: Root,
    getChildRoutes(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./components/category').default,
                require('./components/articles').default,
                require('./components/user').default
            ]);
        });
    },
    getIndexRoute(partialNextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/home').default);
        });
    }
};

// store
const store = storeManager.initStore('root', reducer);

ReactDOM.render(
    <Provider store={store}>
        <Router
            history={browserHistory}
            onUpdate={
                () => {
                    window.scrollTo(0, 0);

                    // 记录访问日志
                    ajax({
                        url: '/api/log/access',
                        method: 'get',
                        params: {
                            url: location.href
                        }
                    });
                }
            }
            routes={route}
        />
    </Provider>,
    document.getElementById('root-container')
);
