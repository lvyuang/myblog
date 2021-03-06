import './article-comment-list.less';

import React from 'react';
import connect from 'react-redux/lib/components/connect.js';
import ajax from 'utils/ajax.js';
import cookie from 'utils/cookie.js';
import sha256 from 'js-sha256';

@connect(
    state => {
        return {
            comments: state.article.comments,
            post: {
                ...state.article.post
            },
            token: state.root.token
        };
    }
)
class ArticleCommentList extends React.Component {
    getCommentList(articleId) {
        const {dispatch} = this.props;

        ajax({
            url: '/api/article/comments',
            method: 'get',
            params: {
                articleId
            }
        }).then(result => {
            dispatch({
                type: 'ARTICLE-COMMENTS-GET-LIST',
                comments: result
            });
        }).catch(err => {
            console.error(err);
        });
    }

    postCommentAfterRegister() {
        const {dispatch, articleId, post} = this.props;
        const password = document.getElementById('post-password').value;

        if (!post.user || !password || !post.content) {
            return;
        }

        cookie.setItem('user', post.user, 60 * 60 * 24 * 30, '/');

        ajax({
            url: '/api/article/commentWithUserPassword',
            method: 'post',
            params: {
                articleId,
                user: post.user,
                password: sha256(password),
                content: post.content,
                createTime: Date.now(),
                quotation: post.quotation
            }
        }).then(result => {
            dispatch({
                type: 'ARTICLE-COMMENT-POST-CLEAR'
            });

            dispatch({
                type: 'ARTICLE-INFO-ADD-COMMENTS'
            });

            dispatch({
                type: 'SET-TOKEN',
                token: result.token
            });

            cookie.setItem('token', result.token, 60 * 60 * 24 * 7, '/');

            this.getCommentList(articleId);
        })
        .catch(err => {
            dispatch({
                type: 'ARTICLE-COMMENT-POST-SET',
                value: {error: err.message}
            });
        });
    }

    postCommentWithToken() {
        const {dispatch, articleId, post} = this.props;
        const {token} = this.props;

        if (!post.content) {
            return;
        }

        cookie.setItem('user', post.user, 60 * 60 * 24 * 30, '/');

        ajax({
            url: '/api/article/comment',
            method: 'post',
            params: {
                articleId,
                token,
                content: post.content,
                createTime: Date.now(),
                quotation: post.quotation
            }
        }).then(result => {
            dispatch({
                type: 'ARTICLE-COMMENT-POST-CLEAR'
            });

            dispatch({
                type: 'ARTICLE-INFO-ADD-COMMENTS'
            });

            this.getCommentList(articleId);
        })
        .catch(err => {
            dispatch({
                type: 'ARTICLE-COMMENT-POST-SET',
                value: {error: err.message}
            });

            if (err.name === 'USER_SESSION_EXPIRED') {
                dispatch({
                    type: 'CLEAR-TOKEN'
                });
            }
        });
    }

    postComment(event) {
        event.preventDefault();

        const {token} = this.props;

        if (token) {
            this.postCommentWithToken();
        }
        else {
            this.postCommentAfterRegister();
        }
    }

    scrollToComments(event) {
        event && event.preventDefault();

        const commentContainer = document.getElementById('article-comment-list');

        if (commentContainer) {
            window.scrollTo(
                0,
                commentContainer.getBoundingClientRect().top + document.body.scrollTop - 30
            );
        }
    }

    componentDidMount() {
        this.getCommentList(this.props.articleId);
    }

    render() {
        const {dispatch, comments, post, token} = this.props;

        return <div id="article-comment-list" className="article-comment-list">
            <div className="title">
                <li className="fa fa-comments"></li>
                评论 ({comments.length})
            </div>
            <div className="post">
                <div className="user">
                    <li className="fa fa-user"></li>
                    {token ?
                        <div>{post.user}</div>
                        :
                        <input
                            id="post-user"
                            type="text"
                            placeholder="用户名"
                            value={post.user}
                            onChange={event => {
                                dispatch({
                                    type: 'ARTICLE-COMMENT-POST-SET',
                                    value: {user: event.target.value}
                                });
                            }}
                        />
                    }
                </div>
                {token ? null :
                    <div className="password">
                        <li className="fa fa-lock"></li>
                        <input
                            id="post-password"
                            type="password"
                            placeholder="密码"
                        />
                    </div>
                }
                {post.quotation ?
                    <div className="quotation">
                        <li className="fa fa-quote-left"></li>
                        <span className="quotation-content">
                            {post.quotation.content}
                            <div className="user">
                                <li className="fa fa-user"></li>
                                {post.quotation.user}
                            </div>
                            <a
                                href="#"
                                onClick={event => {
                                    event.preventDefault();
                                    dispatch({
                                        type: 'ARTICLE-COMMENT-POST-SET',
                                        value: {quotation: null}
                                    });
                                }}
                            ><li className="fa fa-remove"></li></a>
                        </span>
                    </div>
                    : null
                }
                <div className="response">
                    <li className="fa fa-commenting"></li>
                    <textarea
                        id="post-content"
                        placeholder="评论内容"
                        rows="5"
                        value={post.content}
                        onChange={event => {
                            dispatch({
                                type: 'ARTICLE-COMMENT-POST-SET',
                                value: {content: event.target.value}
                            });
                        }}
                    />
                </div>
                <div className="submit">
                    <a href="#" onClick={this.postComment.bind(this)}>
                        <li className="fa fa-send"></li>
                        发表评论
                    </a>
                    {post.error ?
                        <div className="error-message">
                            {post.error}
                        </div>
                    : null}
                </div>
            </div>
            <div className="comments">
                {comments.map(comment =>
                    <div key={comment.commentId} className="comment">
                        {comment.quotation ?
                            <div className="quotation">
                                {comment.quotation.content}
                                <div className="user">
                                    <li className="fa fa-user"></li>
                                    {comment.quotation.user}
                                </div>
                            </div>
                            :
                            null
                        }
                        <div className="content">
                            {comment.content}
                        </div>
                        <div className="byline">
                            <span className="user">
                                <li className="fa fa-user"></li>
                                {comment.user}
                            </span>
                            <span className="date">
                                <li className="fa fa-calendar"></li>
                                {comment.createTime}
                            </span>
                            <span className="quote">
                                <a
                                    data-content={comment.content}
                                    data-user={comment.user}
                                    href="#"
                                    onClick={event => {
                                        event.preventDefault();

                                        dispatch({
                                            type: 'ARTICLE-COMMENT-POST-SET',
                                            value: {
                                                quotation: {
                                                    user: event.target.dataset.user,
                                                    content: event.target.dataset.content
                                                }
                                            }
                                        });

                                        setTimeout(() => {
                                            this.scrollToComments.bind(this)();
                                        }, 50);
                                    }}
                                >
                                    <li className="fa fa-quote-left"></li>
                                    引用
                                </a>
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>;
    }
}

export default ArticleCommentList;