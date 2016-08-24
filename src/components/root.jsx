import './root.less';

import React from 'react';

class Root extends React.Component {
    render() {
        return <div id="root">
            {this.props.children}
        </div>;
    }
}

export default Root;