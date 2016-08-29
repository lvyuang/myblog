import './signin.less';

import React from 'react';
import TemplateMain from 'templates/main';
import Link from 'react-router/lib/Link.js';

class Signin extends React.Component {
    render() {
        return (
            <TemplateMain id="signin">
                <div className="line">
                    <li className="fa fa-user"></li>
                    <input type="text" placeholder="用户名"/>
                </div>
                <div className="line">
                    <li className="fa fa-lock"></li>
                    <input type="password" placeholder="密码"/>
                </div>
                <div className="button-line">
                    <a className="button" href="#"><li className="fa fa-sign-in"></li>登录</a>
                    <div className="error-message">
                        用户不存在或者密码错误，请重试。
                    </div>
                </div>
                <div className="helper-line">
                    <Link to="/user/register" className="link"><li className="fa fa-question"></li>没有账号，我要注册</Link>
                    <br/>
                    <Link className="link" to="/user/forget-password"><li className="fa fa-question"></li>忘记密码</Link>
                </div>
            </TemplateMain>
        );
    }
}

export default Signin;