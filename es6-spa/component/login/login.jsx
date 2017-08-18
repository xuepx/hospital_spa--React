import '../../css/login.css';
import React from 'react';
import { $,$Ajax,$Param,$Next } from '../../js/common'

export default class extends React.Component{
    state = {
        tel:"",
        password:""
    }
    constructor(props){
        super(props)
    }
    input(type,e){
        let reg = /^[a-zA-Z0-9]*$/,
            value = e.target.value;
        if(reg.test(value)){
            this.setState({[type]:e.target.value})
        }
    }
    login(){
        $Ajax("userLogin",{
            phoneNumber:this.state.tel,
            password:this.state.password
        },(data)=>{
            localStorage.setItem("userId",data.obj.userId)
            localStorage.setItem("userName",data.obj.userName)
            this.props.callback()
        })
    }
    toRegister(){
        $Next();
        this.props.history.push({
            pathname: '/register-input',
            state:this.props.from
        })
    }
    render() {
        return (<div className="login-shade">
            <div id="login-wrap">
                <h3>用户登录</h3>
                <input placeholder="请输入手机号" value={this.state.tel} onChange={this.input.bind(this,"tel")} />
                <input placeholder="请输入密码" type="password" value={this.state.password} onChange={this.input.bind(this,"password")}/>
                <a href="javascript:;" onClick={this.login.bind(this)}>登录</a>
                <p>
                    <span onClick={this.toRegister.bind(this)}>注册</span>
                    {/*<span>忘记密码</span>*/}
                </p>
            </div>
        </div>)
    }
}