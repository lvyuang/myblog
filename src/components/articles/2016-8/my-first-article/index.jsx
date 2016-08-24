import './index.less';

import React from 'react';
import TemplateArticle from 'templates/article';

const articleId = 'my-first-article';

class Index extends React.Component {
    render() {
        const {params} = this.props;

        return <TemplateArticle
            articleId={articleId}
            params={params}
        >
            <h2>
                我是标题我是标题
            </h2>
            <p>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
            <p>我是内容我是内容我是内容我是<a href="#">内容</a>我是内容我是内容我是内容我是内容我是内容我是内容</p>
            <img src={require('./resources/1.png')} alt="demo pic"/>
            <h2>
                我是标题我是标题
            </h2>
            <p>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
            <p>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
            <h2>
                我是标题我是标题
            </h2>
            <p>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
            <p>我是内容我是内容我是内容我是<a href="#">内容</a>我是内容我是内容我是内容我是内容我是内容我是内容</p>
            <img src={require('./resources/1.png')} alt="demo pic"/>
            <h2>
                我是标题我是标题
            </h2>
            <p>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
            <p>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
        </TemplateArticle>;
    }
}

export default Index;