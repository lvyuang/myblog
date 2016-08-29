import './register.less';

import React from 'react';
import TemplateMain from 'templates/main';

class Register extends React.Component {
    render() {
        return (
            <TemplateMain id="register">
                <div className="line">
                    <li className="fa fa-user"></li>
                    <input type="text" placeholder="用户名"/>
                </div>
                <div className="line">
                    <li className="fa fa-lock"></li>
                    <input type="password" placeholder="密码"/>
                </div>
                <div className="line">
                    <li className="fa fa-lock"></li>
                    <input type="password" placeholder="确认密码"/>
                </div>
                <div className="button-line">
                    <a className="button" href="#"><li className="fa fa-registered"></li>注册</a>
                    <div className="error-message">
                        两次输入的密码不一致，请检查。
                    </div>
                </div>
            </TemplateMain>
        );
    }
}

export default Register;