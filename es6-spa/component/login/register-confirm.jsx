import '../../css/register-confirm.css';
import React from 'react';
import scroll from 'iscroll';
import { $,$Ajax,$Param,$Next } from '../../js/common';

let iScroll;

export default class RegisterConfirm extends React.Component{
    state={
        name:"",
        birth:"请选择生日",
        sex:"请选择性别",
        marry:"请选择婚姻状况",
        identity:{
            value:"请选择证件类型",
            id:NaN
        },
        idNum:"",
        stay:"",
        stayDetai:"",
        tel:"",
        code:"",
        password:""
    }
    componentDidMount(){
        iScroll = new scroll('.P24 .scroll-wrapper',{click:true})
    }
    render() {
        return (<div className="body-wrap P24">
            <div className="scroll-wrapper">
                <ul className="scroll">
                    <div>
                        <li>
                            <p>姓名</p>
                            <span>XXXXXXXXXXXX</span>
                        </li>
                        <li>
                            <p>性别</p>
                            <span>XXXXXXXXXXXX</span>
                        </li>
                        <li>
                            <p>生日</p>
                            <span>XXXXXXXXXXXX</span>
                        </li>
                        <li>
                            <p>证件类型</p>
                            <span>XXXXXXXXXXXX</span>
                        </li>
                        <li>
                            <p>证件号码</p>
                            <span>XXXXXXXXXXXX</span>
                        </li>
                        <li>
                            <p>婚姻状况</p>
                            <span>XXXXXXXXXXXX</span>
                        </li>
                        <li>
                            <p>地址</p>
                            <span>XXXXXXXXXXXX</span>
                        </li>
                        <li>
                            <p>手机号</p>
                            <span>XXXXXXXXXXXX</span>
                        </li>
                        <li>
                            <p>注册密码</p>
                            <span>XXXXXXXXXXXX</span>
                        </li>
                    </div>
                    <div id="tip-wrap">
                        <span id="excuse">注意：</span>
                        <span id="excuse-text">请核对以上注册信息是否与就诊者本人信息一致，以确保您可要正常取号就诊。</span>
                    </div>
                </ul>
            </div>
            <a href="javascripy:;" id="submit">提交注册</a>
        </div>)
    }
}