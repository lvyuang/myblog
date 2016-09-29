import './article.less';

import React from 'react';
import Link from 'react-router/lib/Link.js';
import ArticleCommentList from 'components/article-comment-list';
import connect from 'react-redux/lib/components/connect.js';
import ajax from 'utils/ajax.js';

@connect(
    state => {
        return {
            ...state.article
        };
    }
)
class TemplateArticle extends React.Component {
    getArticleInfo(articleId) {
        const {dispatch} = this.props;

        ajax({
            url: '/api/article/info',
            method: 'get',
            params: {
                articleId
            }
        }).then(result => {
            dispatch({
                type: 'ARTICLE-INFO-GET',
                article: result
            });
        }).catch(err => {
            console.error(err);
        });
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
        const {articleId} = this.props;

        this.getArticleInfo(articleId);


        if (this.props.params.action === 'show-comments') {
            setTimeout(() => {
                this.scrollToComments();
            }, 50);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps.article) === JSON.stringify(this.props.article)) {
            return false;
        }

        return true;
    }

    componentWillUnmount() {
        const {dispatch} = this.props;

        dispatch({
            type: 'ARTICLE-CLEAR'
        });
    }

    render() {
        const props = this.props;
        const {articleId, params} = props;
        const {title, subtitle, createTime, commentListLength, categories = [], content} = props.article;

        return <div id={articleId || null} className={articleId ? `${articleId} template-article` : 'template-article'}>
            <header>
                <div className="container">
                    <div className="title">
                        <Link to="/">
                            <li className="fa fa-envira"></li>
                            吕权的个人网站
                        </Link>
                    </div>
                </div>
            </header>
            <div className="body container">
                <h1>
                    <li className="fa fa-leaf"></li>
                    {title}
                </h1>
                <div className="subtitle">{subtitle}</div>
                <div className="byline">
                    <span className="date">
                        <li className="fa fa-calendar"></li>
                        {createTime}
                    </span>
                    <a
                        href="#"
                        className="comments"
                        onClick={this.scrollToComments.bind(this)}>
                        <li className="fa fa-comments"></li>
                        {commentListLength}
                    </a>
                </div>
                <div className="categories">
                    {categories.map((catItem, catIndex) =>
                        <Link key={catItem.categoryId} to={`/category/${catItem.categoryId}/${catItem.categoryName}`} className="category">
                            <li className="fa fa-folder-open"></li>
                            {catItem.categoryName}
                            {catIndex < categories.length - 1 ? '，' : null}
                        </Link>
                    )}
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html: content}}></div>
                <ArticleCommentList articleId={articleId}/>
            </div>
            <footer>
                <div className="container">
                    <div className="left">
                        © 2016 LQ Research Center . All rights reserved.
                    </div>
                    <div className="right">
                        <a href="mailto:yuang2008@gmail.com">联系我</a>
                        <a target="_blank" href="https://github.com/lvyuang/myblog">本站源码</a>
                    </div>
                    <div className="beian">
                        <a target="_blank" href="http://www.miitbeian.gov.cn/"><li className="fa fa-shield"></li>京ICP备16049711号</a>
                    </div>
                </div>
            </footer>
        </div>;
    }
}

export default TemplateArticle;