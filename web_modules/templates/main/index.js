import './main.less';
import React from 'react';
import Link from 'react-router/lib/Link.js';

export default (props) =>
    <div id={props.id || null} className={props.id ? `${props.id} template-main` : 'template-main'}>
        <header>
            <div className="container">
                <div className="title">
                    <Link to="/">
                        <li className="fa fa-envira"></li>
                        吕权的个人网站
                    </Link>
                </div>
                <div className="subtitle">
                    终日而思不如须臾所学
                </div>
            </div>
        </header>
        <div className="body container">
            {props.children}
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
    </div>
;