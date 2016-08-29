export default {
    path: 'user',
    getChildRoutes: (nextState, cb) => {
        require.ensure([], (require) => {
            const storeManager = require('core/store-manager').default;

            const reducer = (state = {}, action) => {
                switch (action.type) {
                    default:
                        return state;
                }
            };

            storeManager.updateStore('user', reducer);

            cb(null, [
                require('./forget-password').default,
                require('./profile').default,
                require('./register').default,
                require('./signin').default,
                require('./reset-password').default
            ]);
        });
    }
};