import '../css/setting.css';
import React from 'react';
import { connect } from 'react-redux';
import { guahao } from '../store/actions';
import scroll from 'iscroll';
import { $,$Ajax,$Param,$Next } from '../js/common'

let iScroll;

export default class extends React.Component{
    constructor(){
        super()
        document.title="设置"
    }
    toNext(path,state){
        $Next()
        this.props.history.push({
            pathname : path,
            state : state
        })
    }
    render(){
        return (<div className="body-wrap P15">      <div className="route-shade"></div>
            <div className="scroll-wrapper">
                <ul className="scroll">
                    <li onClick={this.toNext.bind(this,"/register-input")}><span>注册</span></li>
                    {/*<li onClick={this.toNext.bind(this,"/setting-bind",{
                        type:1,
                        name:"病历号",
                        placeholder:"请输入要绑定的病历号",
                        submit:"绑 定"
                    })}><span>病历号绑定</span></li>*/}
                    <li onClick={this.toNext.bind(this,"/setting-bind",{
                        type:2,
                        name:"新密码",
                        name2:"原密码",
                        placeholder:"请输入新密码",
                        placeholder2:"请输入原始密码",
                        submit:"修 改"
                    })}><span>密码修改</span></li>
                    <li onClick={this.toNext.bind(this,"/setting-bind",{
                        type:3,
                        name:"新密码",
                        placeholder:"请输入新密码",
                        submit:"重 置"
                    })}><span>密码找回</span></li>
                </ul>
            </div>
        </div>)
    }
}