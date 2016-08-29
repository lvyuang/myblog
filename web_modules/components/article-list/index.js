import './article-list.less';

import React from 'react';
import Link from 'react-router/lib/Link.js';

class Index extends React.Component {
    render() {
        const {data} = this.props;

        return <div className="article-list">
            {data.map((item, index) =>
                <div key={item.articleId} className="article">
                    <Link to={item.url} className="title">
                        <li className="fa fa-leaf"></li>
                        {item.title}
                    </Link>
                    <div className="byline">
                        <span className="date">
                            <li className="fa fa-calendar"></li>
                            {item.createTime}
                        </span>
                        <Link to={`${item.url}/show-comments`} className="comments">
                            <li className="fa fa-comments"></li>
                            {item.comments}
                        </Link>
                    </div>
                    <div className="content">
                        <span dangerouslySetInnerHTML={{__html: item.desc}}></span>
                        <Link to={item.url} className="more">查看更多</Link>
                    </div>
                    <div className="categories">
                        {item.categories.map((catItem, catIndex) =>
                            <Link key={catItem.id} to={`/category/${catItem.name}`} className="category">
                                <li className="fa fa-folder-open"></li>
                                {catItem.name}
                                {catIndex < item.categories.length - 1 ? '，' : null}
                            </Link>
                        ) || null}
                    </div>
                </div>
            )}
        </div>;
    }
}

export default Index;