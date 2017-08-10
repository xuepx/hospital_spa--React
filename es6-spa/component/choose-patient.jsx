import '../css/choose-patient.css';
import React from 'react';
import { $,$Ajax,$Param } from '../js/common'

export default class ChoosePatient extends React.Component{
    state={
        person:[]
    }
    constructor(props){
        super(props)
    }
    componentWillMount(){
        $Ajax('chaxunJiuzhenrenXinxi',{
            context:$.type,
            openId:$.openId
        },(data)=>{
            this.setState({person:data.obj})
        })
    }
    pageGo(i,name,sourceId,pmid){
        let detail = this.state.person[i];
        if($.urlObj.from=='orderDetail'){
            localStorage.setItem('temporary-name',name);
            localStorage.setItem('temporary-sourceId',sourceId);
            localStorage.setItem('temporary-pmid',pmid);
            this.props.history.go(-1)
        }else if($.urlObj.from=='outpatientsPay'){
            this.props.history.push({
                pathname: '/outpatients-pay',
                search: '?'+$Param({
                    cardNo:detail.cardNo,
                    sourceId:detail.sourceId,
                    name:detail.name
                })
            })
        }else if($.urlObj.from=='orderRecord'){
            this.props.history.push({
                pathname: '/order-record',
                search: '?'+$Param({
                    sourceId:detail.sourceId,
                    name:detail.name
                })
            })
        }else if($.urlObj.from=='payRecord'){
            this.props.history.push({
                pathname: '/pay-record',
                search: '?'+$Param({
                    sourceId:detail.sourceId,
                    name:detail.name,
                    cardNo:detail.cardNo
                })
            })
        }else if($.urlObj.from=='queryReport'){
            this.props.history.push({
                pathname: '/query-report',
                search: '?'+$Param({
                    sourceId:detail.sourceId,
                    name:detail.name,
                    cardNo:detail.cardNo
                })
            })
        }else {
            this.props.history.push({
                pathname: '/patient-detail',
                search: '?'+$Param({
                    sourceId:detail.sourceId,
                    name:detail.name,
                    cardNo:detail.cardNo
                })
            })
        }
    }
    render(){
        let person=this.state.person,
            items=person.map((item,i)=>{
                return (
                    <li key={i} onClick={this.pageGo.bind(this,i,item.name,item.sourceId,item.pmid)}>
                        <p>{item.name}<span></span></p>
                    </li> 
                )
            })
        return (<div className="body-wrap P2">      <div className="route-shade"></div>
            <ul>
                <li>
                    {items}
                </li>
            </ul>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}