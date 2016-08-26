import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router.js';
import browserHistory from 'react-router/lib/browserHistory.js';
import Provider from 'react-redux/lib/components/Provider.js';

import storeManager from 'core/store-manager.js';
import Root from './components/root.jsx';

import ajax from 'utils/ajax.js';

// reducer
const reducer = (state = {}, action) => {
    switch (action.type) {
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
                require('./components/articles').default
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
