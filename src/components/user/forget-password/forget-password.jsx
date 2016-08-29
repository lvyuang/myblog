import './forget-password.less';

import React from 'react';
import TemplateMain from 'templates/main';

class ForgetPassword extends React.Component {
    render() {
        return (
            <TemplateMain id="forget-password">
                <div className="line">
                    <li className="fa fa-envelope"></li>
                    <input type="text" placeholder="请输入email地址"/>
                </div>
                <div className="button-line">
                    <a className="button" href="#"><li className="fa fa-send"></li>发送邮件</a>
                    <div className="success-message">
                        邮件已发送，请注意查收。
                    </div>
                </div>
            </TemplateMain>
        );
    }
}

export default ForgetPassword;