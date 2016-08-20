import './main.less';
import React from 'react';

export default (props) =>
    <div id={props.id || null} className={props.className ? `${props.className} template-main` : 'template-main'}>
        <header>
            <div className="container">
                <h1>吕权的个人网站</h1>
                <h2>人生就是一场修行</h2>
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