import React,{ PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as action from './store/actions'
import { $Next,$ } from './js/common'

export default class Index extends React.Component {
    constructor(props){
        super(props)
    }
    jump(){
        $Next()
    }
    render(){
        return (<div className="body-wrap" style={{overflow:"auto"}}> <div className="route-shade"></div>
                <div id="index-nav">
                    <Link to="/add-patient">添加就诊人</Link>
                    <Link to="/choose-patient">选择科室</Link>
                    <Link to="/hospitalization-pay">住院预缴费</Link>
                    <Link to="/inhospital-payrecord">住院缴费查询</Link>
                    <Link to="/inhospital-record">住院清单查询</Link>
                    <Link to="/choose-patient">就诊人详情</Link>
                    <Link to="/order-record">挂号详情</Link>
                    <Link to="/outpatients-pay">门诊缴费</Link>
                    <Link to="/pay-record">门诊缴费记录</Link>
                    <Link to="/search-report">查询报告</Link>
                    <Link to="/query-type">诊疗药品信息</Link>
                    <Link to="/pic-visit" onClick={this.jump.bind(this)} >智能导诊</Link>
                    <Link to="/depart-list"  onClick={this.jump.bind(this)} >科室列表</Link>
                </div>
            </div>
        );
    }
};
