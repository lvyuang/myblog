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
    path: 'category/:id/:name',
    onEnter(nextState, replace) {
        // 这里的指定加载，可以预加载getComponent中用到模块，否则dispatch的内容会来不及接收。
        require.ensure(['utils/ajax.js', 'core/store-manager.js', 'redux/lib/combineReducers.js', './category.jsx'], (require) => {
            const ajax = require('utils/ajax.js').default;
            const storeManager = require('core/store-manager.js').default;

            ajax({
                url: '/api/article/list',
                method: 'get',
                params: {
                    category: nextState.params.id
                }
            }).then(result => {
                storeManager.getStore().dispatch({
                    type: 'ARTICLE-LIST-CATEGORY-GET',
                    articleList: result
                });
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
        });
    }
};