import '../css/add-patient.css';
import React from 'react';
import { $,$Ajax,$Param } from '../js/common'

export default class AddPatient extends React.Component{
    state={
        cardNo: "",
        Act:['active',''],
        typeName:['身份证号','就诊卡号'],
        name:'身份证号'
    }
    constructor(props){
        super(props)
    }
    maxlength(e){
        let val = e.target.value
        this.setState({cardNo:val.substring(0,18)});
    }
    createPatient(){
        $Ajax('jiuzhenkaBangding',{
            context:$.type,
            cardType:this.state.name=='身份证号'?1:2,
            cardNo:this.state.cardNo,
            openId:$.openId,
            org:localStorage.getItem('org')
        },function(data){
            alert(data.msg)
            if($.urlObj.from="orderDetail"){
                this.props.history.go(-1)
            }else{
                this.props.history.push({
                    pathname: '/choose-patient',
                    search: '?'+$Param({
                        from:'addPatient'
                    })
                })
            }
        })
    }
    changeCard(i){
        let arr=['',''];
        arr[i]='active';
        this.setState({Act:arr,name:this.state.typeName[i]})
    }
    render() {
        return (<div className="body-wrap P1">      <div className="route-shade"></div>
            <ul id="wrap">
                <li className="clearfix" id="id-card">
                    <p>{this.state.name}：</p>
                    <input placeholder={'请输入'+this.state.name} type="text" value={this.state.cardNo} onChange={this.maxlength}/>
                </li>
            </ul>
            <ul id="type">
                <li className={this.state.Act[0]} onClick={this.changeCard.bind(this,0)}>{this.state.typeName[0]}</li>
                <li className={this.state.Act[1]} onClick={this.changeCard.bind(this,1)}>{this.state.typeName[1]}</li>
            </ul>
        
            <a href="javascript:;" className="submit" onClick={this.createPatient.bind(this)}>提交</a>
        
            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}