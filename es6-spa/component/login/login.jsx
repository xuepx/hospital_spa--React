import '../../css/login.css';
import React from 'react';
import { $,$Ajax,$Param,$Next } from '../../js/common'

export default class Login extends React.Component{
    toRegister(){
        $Next();
        this.props.history.push({
            pathname: '/register'
        })
    }
    render() {
        return (<div className="login-shade">
            <div id="login-wrap">
                <h3>用户登录</h3>
                <input placeholder="请输入手机号"/>
                <input placeholder="请输入密码"/>
                <a href="javascript:;">登录</a>
                <p>
                    <span onClick={this.toRegister.bind(this)}>注册</span>
                    <span >忘记密码</span>
                </p>
            </div>
        </div>)
    }
}