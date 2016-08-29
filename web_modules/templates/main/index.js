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
                    人生就是一次修行
                </div>
            </div>
        </header>
        <div className="body container">
            {props.children}
        </div>
        <footer>
            <div className="container">
                © 2016 LQ Research Center . All rights reserved.
            </div>
        </footer>
    </div>
;