import '../css/setting-bind.css';
import React from 'react';
import { connect } from 'react-redux';
import { guahao } from '../store/actions';
import scroll from 'iscroll';
import { $,$Ajax,$checkPhone,$Next } from '../js/common'

let iScroll,timer;

export default class extends React.Component{
    state={
        clinic:"",
        oldPassword:"",
        newPassword:"",
        newPasswordConfirm:"",
        tel:"",
        code:"",
        countDown:"获取验证码"
    }
    constructor(props){
        super(props)
        const { state } = props.location;
        switch (state.type){
            case 1: document.title="病历号绑定" ;break;
            case 1: document.title="修改密码" ;break;
            case 1: document.title="重置密码" ;break;
        }
    }
    setInf(key,e){
        let val = e.target.value
        this.setState({[key]:val})
    }
    getCode(){
        if(timer)return
        if(!$checkPhone(this.state.tel)){
            alert("请输入正确的手机号码！")
            return
        }
        $Ajax("getMobileMsgCode",{
            phoneNumber:this.state.tel
        },(data)=>{
            timer = setInterval(()=>{
                let time = parseInt(this.state.countDown);
                if(time==0){
                    this.setState({countDown:"获取验证码"});
                    clearInterval(timer);
                    timer=null;
                    return
                }
                if(Number(time)){
                    time -= 1; time += "s"
                }else{
                    time = "30s"
                }
                this.setState({countDown:time})
            },1000)
        })
    }
    toBind(type){
        let checkCode = fn =>{
            $Ajax("checkMobileMsgCode",{
                phoneNumber:this.state.tel,
                dxcode:this.state.code
            },(data)=>{
                fn()
            });
        }
        if(type==2){
            if( !this.state.oldPassword ){
                alert("请输入原始密码");   return;
            }else if( !this.state.newPassword ){
                alert("请输入新密码");   return;
            }else if( !this.state.newPasswordConfirm ){
                alert("请再次输入新密码");   return;
            }else if( !$checkPhone(this.state.tel) ){
                alert("请输入正确手机号");   return;
            }else if( !this.state.code ){
                alert("请输入验证码");   return;
            }
            if(this.state.newPassword != this.state.newPasswordConfirm){
                alert("两次输入密码不一致！")
                return;
            }
            checkCode(() => {
                $Ajax("updatePassword",{
                    phoneNumber:this.state.tel,
                    password : this.state.oldPassword,
                    newPassword : this.state.newPassword
                },(data)=>{
                    alert(data.msg)
                    this.props.history.go(-1)
                })
            })
        }else if(type==3){
            if( !this.state.newPassword ){
                alert("请输入新密码");   return;
            }else if( !this.state.newPasswordConfirm ){
                alert("请再次输入新密码");   return;
            }else if( !$checkPhone(this.state.tel) ){
                alert("请输入正确手机号");   return;
            }else if( !this.state.code ){
                alert("请输入验证码");   return;
            }
            if(this.state.newPassword != this.state.newPasswordConfirm){
                alert("两次输入密码不一致！")
                return;
            }
            checkCode(() => {
                $Ajax("setPassword",{
                    phoneNumber:this.state.tel,
                    password : this.state.newPassword
                },(data)=>{
                    alert(data.msg)
                    this.props.history.go(-1)
                })
            })
        }
    }
    render(){
        const { state } = this.props.location;
        let items;
        if(state.type==1){
            items = (
                <li>
                    <p>{state.name}</p>
                    <input placeholder={state.placeholder} type="number" value={this.state.clinic} onChange={this.setInf.bind(this,"clinic")} />
                </li>
            )
        }else if(state.type==2){
            items = (<ul>
                <li>
                    <p>{state.name2}</p>
                    <input placeholder={state.placeholder2} type="password" value={this.state.oldPassword} onChange={this.setInf.bind(this,"oldPassword")} />
                </li>
                <li>
                    <p>{state.name}</p>
                    <input placeholder={state.placeholder} type="password" value={this.state.newPassword} onChange={this.setInf.bind(this,"newPassword")} />
                </li>
                <li>
                    <p>确认新密码</p>
                    <input placeholder="请再次输入新密码" type="password" value={this.state.newPasswordConfirm} onChange={this.setInf.bind(this,"newPasswordConfirm")} />
                </li>
            </ul>)
        }else if(state.type==3){
            items = (<ul>
                <li>
                    <p>{state.name}</p>
                    <input placeholder={state.placeholder} type="number" value={this.state.newPassword} onChange={this.setInf.bind(this,"newPassword")} />
                </li>
                <li>
                    <p>确认新密码</p>
                    <input placeholder="请再次输入新密码" type="password" value={this.state.newPasswordConfirm} onChange={this.setInf.bind(this,"newPasswordConfirm")} />
                </li>
            </ul>)
        }
        return (<div className="body-wrap P14">      <div className="route-shade"></div>
            <div>
                {items}
                <li>
                    <p>手机号</p>
                    <input placeholder="请输入就诊人手机号" type="number" value={this.state.tel} onChange={this.setInf.bind(this,"tel")} />
                </li>
                <li id="last">
                    <span id="get-code" onClick={this.getCode.bind(this)}>{this.state.countDown}</span>
                    <input id="test-code" placeholder="请输入验证码"  value={this.state.code} onChange={this.setInf.bind(this,"code")} />
                </li>
            </div>
            <a id="bind" onClick={this.toBind.bind(this,state.type)}>{state.submit}</a>
        </div>)
    }
}