import React from 'react';
import { $ } from '../../js/common';
import Detail from './detail.jsx';
import Time from './time.jsx'

export default class Doclist extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let items=new Array(),
            list=this.props.list,
            detail=this.props.detail,
            docTop={top:'2.15rem'};
        if(this.props.type != 'doc'){
            list=detail
        }
        items=list.map((item,i)=>{
            return (
                <li key={i} className="doc">
                    <div className="wrap-1 clearfix">
                        <img src="../img/photo.png" />
                        <p className="name">{item.doctorName}</p>
                        <p className="info" style={{top:'.84rem'}}><span>{item.deptName}</span> <span>{item.doctorTitle}</span></p>
                        {/*<p className="order">预约：<span></span>号</p>*/}
                    </div>
                    {this.props.type && <Time type={this.props.type} chooseDate={this.props.chooseDate} docId={item.doctorId} index={i} />}
                    {detail[i] && <Detail 
                        detail={this.props.type ? detail[i] : detail} 
                        date={this.props.type ? this.props.dateList[i] : this.props.date} 
                        about={{
                            type:item.doctorTitle,   depart:item.deptName,    name:item.doctorName,
                            level:item.doctorTitle,  deptId:item.deptId,  doctorId:item.doctorId
                        }} />
                    }
                </li>
            )
        });
        return(<div>
            {!this.props.type && <Time accordingDate={this.props.accordingDate}/>}
            <div id="doc-wrap" style={!this.props.type ? docTop : null}>
                <ul id="doc">
                    {items}
                    <footer>
                        <p>{$.hosName}</p>
                        <p>{$.copyright}</p>
                    </footer>
                </ul>
            </div>
        </div>)
    }
}