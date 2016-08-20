import './rules.less';

import React from 'react';
import Link from 'react-router/lib/Link.js';

export default (props) =>
    <div className="rules">
        Rules Page
        <Link to="/">首页</Link>
    </div>
;