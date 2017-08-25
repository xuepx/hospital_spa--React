import '../../css/register-confirm.css';
import React from 'react';
import scroll from 'iscroll';
import { connect } from 'react-redux';
import { $,$Ajax,$Param,$Next } from '../../js/common';

let iScroll;

@connect (
    state => {return { loginInf:state.loginInf } }
)
export default class extends React.Component{
    constructor(){
        super()
        document.title="确认注册信息"
    }
    componentDidMount(){
        iScroll = new scroll('.scroll-wrapper',{click:true})
    }
    submit(){
        let { loginInf } = this.props;
        $Ajax("register",{
            openId:$.openId,
            environment:$.type,
            userName:loginInf.name,
            gender:loginInf.sex,
            maritalStatus:loginInf.marry,
            birthday:loginInf.birth,
            certificatesTypeId:loginInf.identity.id,
            certificatesNumber:loginInf.idNum,
            password:loginInf.password,
            areaCode:loginInf.county.id,
            areaInfo:loginInf.province.value+loginInf.city.value+loginInf.county.value,
            nowAddress:loginInf.stay,
            phoneNumber:loginInf.tel
        },(data)=>{
            localStorage.setItem("userId",data.obj.userId)
            localStorage.setItem("userName",loginInf.name)
            this.props.history.go(-2)
        })
    }
    render() {
        const { loginInf } = this.props;
        return (<div className="body-wrap P24"> <div className="route-shade"></div>
            <div className="scroll-wrapper">
                <ul className="scroll">
                    <div>
                        <li>
                            <p>姓名</p>
                            <span>{loginInf.name}</span>
                        </li>
                        <li>
                            <p>性别</p>
                            <span>{loginInf.sex}</span>
                        </li>
                        <li>
                            <p>生日</p>
                            <span>{loginInf.birth}</span>
                        </li>
                        <li>
                            <p>证件类型</p>
                            <span>{loginInf.identity.value}</span>
                        </li>
                        <li>
                            <p>证件号码</p>
                            <span>{loginInf.idNum}</span>
                        </li>
                        <li>
                            <p>婚姻状况</p>
                            <span>{loginInf.marry}</span>
                        </li>
                        <li>
                            <p>地址</p>
                            <span>{loginInf.province.value+loginInf.city.value+loginInf.county.value+loginInf.stay}</span>
                        </li>
                        <li>
                            <p>手机号</p>
                            <span>{loginInf.tel}</span>
                        </li>
                        <li>
                            <p>注册密码</p>
                            <span>{loginInf.password}</span>
                        </li>
                    </div>
                    <div id="tip-wrap">
                        <span id="excuse">注意：</span>
                        <span id="excuse-text">请核对以上注册信息是否与就诊者本人信息一致，以确保您可要正常取号就诊。</span>
                    </div>
                </ul>
            </div>
            <a href="javascripy:;" id="submit" onClick={this.submit.bind(this)}>提交注册</a>
        </div>)
    }
}