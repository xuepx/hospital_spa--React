import '../css/subscription.css';
import React from 'react';
import scroll from 'iscroll';
import { $,$Ajax,$Parse,$Next } from '../js/common'
import Alert from './alert/alert.jsx';

let iScroll,dataObj=$Parse(decodeURI(window.location.href));

export default class extends React.Component{
    constructor(){
        super()
        document.title="订阅提醒"
        this.state={
            ALERT:false,
            alertContent:"",
            alertFn:null
        }
    }
    alert(text,fn){
        this.setState({
            alertContent:text,
            ALERT:true,
            alertFn:fn
        });
    }
    alertYes(fn){
        this.setState({
            ALERT:false
        });
        if(fn)fn()
    }
    componentDidUpdate(){
        iScroll = new scroll('.P13 .scroll-wrapper',{click:true})
    }
    cancel(){
       this.alert("确定取消订阅用药提醒吗？",()=>{
           $Ajax("cancelSubscription",{
               mrfId:dataObj.mrfId
           },function(data){
               this.alert(data.msg)
           })
       })
    }
    render() {
        return (<div className="body-wrap P13">      <div className="route-shade"></div>
            <div className="scroll-wrapper">
                <ul className="scroll">
                    <li className="wrap">
                        <h3>温馨提醒您，按时服药哦！</h3>
                        <div className="wrap-1">
                            <p>药品名称：{dataObj.drugName}</p>
                            <p>服用方式：{dataObj.drugUse}</p>
                            <p>服用剂量：{dataObj.amount+dataObj.amountUnit}</p>
                            <p>服用时间：{dataObj.scheduledTime}</p>
                        </div>
                        <div className="wrap-2">
                            <p>祝您早日康复！</p>
                            <span id="cancel" onClick={this.cancel.bind(this)}>取消订阅</span>
                        </div>
                    </li>
                </ul>
            </div>
            {this.state.ALERT &&
                <Alert yes={this.alertYes.bind(this,this.state.alertFn)}
                   no={this.alertYes.bind(this)}
                   content={this.state.alertContent}
                />
            }
        </div>)
    }
}