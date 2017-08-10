import '../css/order-record.css';
import React from 'react';
import { $,$Ajax,$Fuck } from '../js/common'

export default class OrderRecord extends React.Component{
    state = {
        orderList:[]
    }
    constructor(props){
        super(props)
    }
    componentWillMount(){
        $Ajax('chaxunYuyueGuahaoJilu',{
            org : localStorage.getItem('org'),
            patientId : $.urlObj.sourceId,
            startDate : '',
            endDate : ''
        },(data)=>{
            this.setState({orderList:$Fuck(data.obj.dataset.row)})
        })
    }
    choosePatient(){
        this.props.history.go(-1)
    }
    render(){
        let list=this.state.orderList,
        items=list.map((item,i)=>{
            return (
                 <tr className="clearfix">
                    <td style={{margin:'.225rem 0',lineHeight:'.45rem'}}>{item.sectionName}</td>
                    <td>{item.regDateTime}</td>
                    <td>{Number(item.regFee)+Number(item.clinicFee)}</td>
                    <td>{item.drName}</td>
                </tr>
            )
        })
        return (<div className="body-wrap P11">     <div className="route-shade"></div>
            <div id="patient" className="clearfix" onClick={this.choosePatient.bind(this)}>
                <p>就诊人：</p>
                <span>{$.urlObj.name}</span>
            </div>
            <ul id="title" className="clearfix">
                <li>科室</li>
                <li>就诊时间</li>
                <li>价格</li>
                <li>医生</li>
            </ul>
            <table>
                {items}
            </table>
            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}