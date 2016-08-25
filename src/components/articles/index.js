import formatDate from 'utils/formatDate.js';

export default {
    path: '',
    getChildRoutes(nextState, cb) {
        require.ensure([], (require) => {
            const storeManager = require('core/store-manager').default;
            const combineReducers = require('redux/lib/combineReducers.js').default;
            const cookie = require('utils/cookie.js').default;

            const commentsReducer = (state = [], action) => {
                switch (action.type) {
                    case 'ARTICLE-COMMENTS-GET-LIST':
                        return action.comments.map(comment => {
                            return {
                                ...comment,
                                createTime: formatDate(comment.createTime)
                            };
                        });
                    default:
                        return state;
                }
            };

            const user = cookie.getItem('user') || '';

            const postReducer = (state = {user, content: ''}, action) => {
                switch (action.type) {
                    case 'ARTICLE-COMMENT-POST-SET':
                        return {
                            ...state,
                            ...action.value
                        };
                    case 'ARTICLE-COMMENT-POST-CLEAR':
                        return {
                            user: cookie.getItem('user') || '',
                            content: ''
                        };
                    default:
                        return state;
                }
            };

            const articleReducer = (state = {}, action) => {
                switch (action.type) {
                    case 'ARTICLE-INFO-GET':
                        return {
                            ...action.article,
                            createTime: formatDate(action.article.createTime)
                        };
                    case 'ARTICLE-INFO-ADD-COMMENTS':
                        return {
                            ...state,
                            comments: state.comments + 1
                        };
                    default:
                        return state;
                }
            };

            const reducer = combineReducers({
                comments: commentsReducer,
                post: postReducer,
                article: articleReducer
            });

            storeManager.updateStore('article', reducer);

            cb(null, [
                require('./2016-8/opening').default
            ]);
        });
    }
};