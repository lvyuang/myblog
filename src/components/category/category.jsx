import './category.less';

import React from 'react';
import TemplateMain from 'templates/main';
import ArticleList from 'components/article-list';
import connect from 'react-redux/lib/components/connect.js';

@connect(
    state => {
        return {
            articleList: state.category.articleList
        };
    }
)
class Category extends React.Component {
    render() {
        const {articleList} = this.props;

        return <TemplateMain id="category">
            <div className="category-title-container">
                <div className="category-title">
                    <li className="fa fa-hashtag"></li>
                    {this.props.params.name}
                </div>
            </div>
            <ArticleList data={articleList}></ArticleList>
        </TemplateMain>;
    }
}

export default Category;