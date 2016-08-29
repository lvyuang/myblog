import './home.less';

import React from 'react';
import TemplateMain from 'templates/main';
import ArticleList from 'components/article-list';
import connect from 'react-redux/lib/components/connect.js';
import ajax from 'utils/ajax.js';

@connect(
    state => {
        return {
            articleList: state.home.articleList
        };
    }
)
class Index extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;

        ajax({
            url: '/api/article/list',
            method: 'get'
        }).then(result => {
            dispatch({
                type: 'ARTICLE-LIST-GET',
                articleList: result
            });
        }).catch(err => {
            if (err) {
                console.error(err);
            }
        });
    }

    render() {
        const {articleList} = this.props;

        return <TemplateMain id="home">
            <ArticleList data={articleList}></ArticleList>
        </TemplateMain>;
    }
}

export default Index;