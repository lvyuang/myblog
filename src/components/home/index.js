export default {
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const storeManager = require('core/store-manager.js').default;
            const combineReducers = require('redux/lib/combineReducers.js').default;

            const reducer = (state=[], action) => {
                switch (action.type) {
                    case 'ARTICLE-LIST-GET':
                        return action.articleList;
                    default:
                        return state;
                }
            };

            storeManager.updateStore('home', combineReducers({
                articleList: reducer
            }));

            cb(null, require('./home.jsx').default);
        });
    }
};