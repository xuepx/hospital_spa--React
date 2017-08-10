import '../css/report-table.css';
import React from 'react';
import { $ } from '../js/common';
import Detail from './report-table/detail.jsx'

export default class ReportTable extends React.Component{
    render(){
        return (<div className="body-wrap P18">     <div className="route-shade"></div>
            <div className="top clearfix" style={{marginBottom:0,borderBottom:'none'}}>
                <p>就诊人：</p>
                <span>刘明</span>
            </div>
            <div className="top clearfix">
                <p style={{backgroundImage:'url("img/rt-1.png")'}}>检验时间：</p>
                <span>2017-06-11</span>
            </div>
            <div className="top clearfix">
                <p style={{backgroundImage:'url("img/rt-2.png")'}}>检验项目：</p>
                <span>血常规</span>
            </div>
            <Detail />
            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}