import '../css/search-report.css';
import React from 'react';
import { $,$Ajax,$Fuck,$Go } from '../js/common'

export default class SearchReport extends React.Component{
    state = {
       Act:['active',''],
       reportList:[]
    }
    constructor(props){
        super(props)
    }
    componentWillMount(){
        $Ajax('getDaYinShuJu',{
            org:localStorage.getItem('org'),
            patientId:$.urlObj.sourceId
        },(data)=>{
            this.setState({reportList:$Fuck(data.obj.dataset.row)})
        })
    }
    change(i){
        let arr=['',''];
        arr[i]='active'
        this.setState({Act:arr});
    }
    pageGo(){
        this.props.history.go(-1)
    }
    reportImg(no){
        $Go('../img/base64-pdf.html?inNo='+no+'&sourceId='+$.urlObj.sourceId)
    }
    render() {
        let list=this.state.reportList,
        items=list.map((item,i)=>{
            return (
                <li key={i} onClick={this.reportImg.bind(this,item.inNo)}>
                    <p>{item.tranName}</p>
                    <span>{item.confirmda}</span>
                </li>
            )
        })
        return (<div className="body-wrap P17">     <div className="route-shade"></div>
            <div id="patient" className="clearfix" onClick={this.pageGo}>
                <p>就诊人：</p>
                <span>{$.urlObj.name}</span>
            </div>
            <ul id="type">
                <li className={this.state.Act[0]} onClick={this.change.bind(this,0)}>检查报告</li>
                <li className={this.state.Act[1]} onClick={this.change.bind(this,1)}>检验报告</li>
            </ul>
            <ul id="title" className="clearfix">
                {items}
            </ul>
            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}