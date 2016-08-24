export default {
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            const storeManager = require('core/store-manager.js').default;
            const combineReducers = require('redux/lib/combineReducers.js').default;

            const reducer = (state=[], action) => {
                switch (action.type) {
                    case 'ARTICLE-LIST-CATEGORY-GET':
                        return action.articleList;
                    default:
                        return state;
                }
            };

            storeManager.updateStore('category', combineReducers({
                articleList: reducer
            }));

            // component
            cb(null, require('./category.jsx').default);
        });
    },
    path: 'category/:name'
};