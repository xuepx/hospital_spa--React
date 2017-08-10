import '../css/inhospital-payrecord.css';
import React from 'react';
import { $,$Ajax } from '../js/common'
import Detail from './inhospital-payrecord/detail.jsx'

export default class InhospitalPayrecord extends React.Component{
    state={
        Act:'',
        inHospitalNo:'',
        detail:"",
    }
    constructor(props){
        super(props)
    }
    inputCode(e){
        this.setState({inHospitalNo:e.target.value})
    }
    submit(){
        $Ajax('getZhuYuanXIaoFeiList',{
            org : localStorage.getItem('org'),
            inHospitalNo : this.state.inHospitalNo,
            startDate : '',
            endDate : ''
        },(data)=>{
            this.setState({detail:data.obj.dataset.row,Act:'active'})
        })
    }
    render() {
        return (<div className="body-wrap P7">      <div className="route-shade"></div>
            <div id="number" className="clearfix">
                <p>住院号：</p>
                <input placeholder="请输入住院号" onChange={this.inputCode.bind(this)} />
                <a href="javascript:;" id="submit" onClick={this.submit.bind(this)}>查询</a>
            </div>

            <div className={this.state.Act} id="detail-wrap">
                {this.state.detail != null && <Detail detail={this.state.detail} />}
            </div>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}