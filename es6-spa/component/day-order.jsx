import '../css/day-order.css';
import React from 'react';
import { $,$Fuck,$Ajax } from '../js/common'
import DocList from './day-order/doc-list.jsx';

export default class DayOrder extends React.Component{
    state = {
        Act:['active',''],
        docList:[],
        detail:[],
        date:"",
        dateList:[]
    }
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.change(0)
    }
    change(i){
        let arr=['',''];
        arr[i]='active';
        this.setState({Act:arr,detail:[]});
        if(!i){
            $Ajax('getYuyueYishengList',{
                org:localStorage.getItem('org'),
                sectionCode:$.urlObj.deptId
            },(data)=>{
                this.setState({docList:$Fuck(data.obj.dataset.row)})
            })
        }else{
            this.setState({docList:[]});
        }
    }
    chooseDate(i,id,time){
        $Ajax('getYuyueHaoyuanList',{
            org:localStorage.getItem('org'),
            sectionCode:$.urlObj.deptId,
            doctorId:id,
            startDate:time,
            endDate:time,
        },(data)=>{
            this.state.detail[i]=$Fuck(data.obj.dataset.row);
            this.state.dateList[i]=time;
            this.setState({detail:_this.state.detail,dateList:_this.state.dateList})
        })
    }
    accordingDate(time){
        $Ajax('getYuyueHaoyuanList',{
            org:localStorage.getItem('org'),
            sectionCode:$.urlObj.deptId,
            doctorId:'',
            startDate:time,
            endDate:time,
        },(data)=>{
            data=$Fuck(data.obj.dataset.row);
            this.setState({detail:data,date:time})
        })
    }
    render(){
        return (<div className="body-wrap P5">      <div className="route-shade"></div>
            <ul id="type">
                <li className={this.state.Act[0]} onClick={this.change.bind(this,0)}>按医生</li>
                <li className={this.state.Act[1]} onClick={this.change.bind(this,1)}>按日期</li>
            </ul>
            <DocList type={this.state.Act[0] && "doc"} list={this.state.docList} detail={this.state.detail} chooseDate={this.chooseDate} date={this.state.date} dateList={this.state.dateList} accordingDate={this.accordingDate} />
        </div>)
    }
}