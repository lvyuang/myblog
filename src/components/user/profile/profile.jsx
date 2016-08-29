import './profile.less';

import React from 'react';
import TemplateMain from 'templates/main';

class Profile extends React.Component {
    render() {
        return (
            <TemplateMain id="profile">
                <div className="line">
                    <li className="fa fa-user"></li>
                    <span>username</span>
                </div>
                <div className="line">
                    <li className="fa fa-envelope"></li>
                    <span>username@email.com</span>
                </div>
            </TemplateMain>
        );
    }
}

export default Profile;