export default {
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            const storeManager = require('core/store-manager').default;

            // reducer
            const reducer = (state = {}, action) => {
                switch (action.type) {
                    default:
                        return state;
                }
            };

            storeManager.updateStore('rules', reducer);

            // component
            cb(null, require('./rules.jsx').default);
        });
    },
    path: '/rules'
};