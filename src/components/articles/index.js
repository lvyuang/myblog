export default {
    getChildRoutes(nextState, cb) {
        require.ensure([], (require) => {
            const storeManager = require('core/store-manager').default;
            const combineReducers = require('redux/lib/combineReducers.js').default;
            const cookie = require('utils/cookie.js').default;
            const formatDate = require('utils/formatDate.js').default;
            const ajax = require('utils/ajax.js').default;

            const commentsReducer = (state = [], action) => {
                switch (action.type) {
                    case 'ARTICLE-CLEAR':
                        return [];
                    case 'ARTICLE-COMMENTS-GET-LIST':
                        return action.comments.map(comment => {
                            return {
                                ...comment
                            };
                        });
                    default:
                        return state;
                }
            };

            const user = cookie.getItem('user') || '';

            const postReducer = (state = {user, content: '', error: ''}, action) => {
                switch (action.type) {
                    case 'ARTICLE-CLEAR':
                        return {
                            user: cookie.getItem('user') || '',
                            content: '',
                            error: ''
                        };
                    case 'ARTICLE-COMMENT-POST-SET':
                        return {
                            ...state,
                            ...action.value
                        };
                    case 'ARTICLE-COMMENT-POST-CLEAR':
                        return {
                            user: cookie.getItem('user') || '',
                            content: '',
                            error: ''
                        };
                    default:
                        return state;
                }
            };

            const articleReducer = (state = {}, action) => {
                switch (action.type) {
                    case 'ARTICLE-CLEAR':
                        return {};
                    case 'ARTICLE-INFO-GET':
                        return {
                            ...action.article
                        };
                    case 'ARTICLE-INFO-ADD-COMMENTS':
                        return {
                            ...state,
                            commentListLength: state.commentListLength + 1
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

            // 加载文章路由
            ajax({
                url: '/api/article/routes',
                method: 'get'
            }).then(
                result => {
                    // [{articleId: 'xxx', url: '/a/b/c'}, ...]
                    cb(null, result.map(item => {
                        return {
                            path: item.url + '(/:action)',
                            getComponent(nextState, cb) {
                                require.ensure([], (require) => {
                                    const React = require('react');
                                    const TemplateArticle = require('templates/article').default;

                                    cb(null, React.createClass({
                                        render: () => <TemplateArticle articleId={item.articleId} params={nextState.params} />
                                    }));
                                });
                            }
                        };
                    }));
                }
            ).catch(err => console.error(err));
        });
    }
};