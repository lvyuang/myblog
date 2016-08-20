import './home.less';

import React from 'react';
import Link from 'react-router/lib/Link.js';
import TemplateMain from 'templates/main';

class Index extends React.Component {
    render() {
        return <TemplateMain id="home" className="home">
            <h1>hei</h1>
        </TemplateMain>;
    }
}

export default Index;