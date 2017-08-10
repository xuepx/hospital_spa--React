import '../css/input-price.css';
import React from 'react';
import { $,$Ajax } from '../js/common'

export default class InputPrice extends React.Component{
    state = {
        price:""
    }
    constructor(props){
        super(props)
    }
    inputPrice(e){
        if(isNaN( Number(e.target.value) )  || Number(e.target.value)>100000)return;
        this.setState({price:e.target.value})
    }
    recharge(){
        var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if(reg.test(this.state.price)){
            $Ajax('zhuYuanChongZhiTiJiao',{
                org:localStorage.getItem('org'),
                inpatientno:$.urlObj.patientNo,
                patientId:$.urlObj.patientId,
                payPrice:_this.state.price
            },function(data){
                location.replace($.reqHost+'/hrwgzyy/rest/jiaofei?' + 'merBillNo='+data.obj.MerBillNo+'&productName=住院预缴&price='+this.state.price+'&payAccount='+$.urlObj.patientId)
            })
        }else{
            alert('请输入正确充值金额')
        }
    }
    render(){
        return (<div className="body-wrap P9">      <div className="route-shade"></div>
            <ul>
                {/*<li>
                    <p>住院总费用：</p>
                    <p className="gray"></p>
                </li>*/}
                <li>
                    <p>可用余额：</p>
                    <p className="red">￥{$.urlObj.balance}</p>
                </li>
                <li>
                    <p>住院预缴金额：</p>
                    <input placeholder="请输入预缴金额" value={this.state.price} onChange={this.inputPrice.bind(this)} />
                </li>
            </ul>

            <a href="javascript:;" className="submit" onClick={this.recharge.bind(this)}>确认</a>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}