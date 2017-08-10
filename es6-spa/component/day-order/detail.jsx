import React from 'react';
import { $Param } from '../../js/common'

export default class Detail extends React.Component{
    constructor(props){
        super(props)
    }
    timeFilter(time){
        switch(time){
            case 1:return '上午';break;
            case 2:return '下午';break;
            case 3:return '全天';break;
        }
    }
    leaveNoFilter(n){
        if(n){
            return {
                class:'next',
                name:'余'+n+'号',
                pageGo:true
            }
        }else{
            return {
                class:'next unable',
                name:'号满',
                pageGo:false
            }
        }
    }
    pageGo(time,regFee,treatFee,regDate,timeFlag,noType,can){
        if(can){
            let obj=this.props.about,
                price=Number(regFee)+Number(treatFee);
            this.props.history.push({
                pathname: '/order-detail',
                search: '?'+$Param({
                    type:obj.type,
                    depart:obj.depart,
                    name:obj.name,
                    level:obj.level,
                    deptId:obj.deptId,
                    doctorId:obj.doctorId,
                    noType:noType,
                    time:time,
                    regFee:regFee,
                    treatFee:treatFee,
                    regDate:regDate,
                    timeFlag:timeFlag
                })
            })
        }else{
            alert('该时段已经没有号源了！')
        }
    }
    render(){
        let detail=this.props.detail,
            items=[];
        for(var i=0;i<detail.length;i++){
            if(detail[i].regDate != this.props.date )continue;
            var obj = this.leaveNoFilter(detail[i].regleaveCount),
                time=detail[i].regDate+' '+this.timeFilter(detail[i].timeFlag),
                pay=( Number(detail[i].regFee) + Number(detail[i].treatFee) ).toFixed(2);
            items.push(
                <div className="detail clearfix">
                    <p className="time">{time}</p>
                    <p className="price">挂号费:<span>￥{pay}</span></p>
                    <a href="javascript:;" className={obj.class} onClick={this.pageGo.bind(this,time,detail[i].regFee,detail[i].treatFee,detail[i].regDate,detail[i].timeFlag,detail[i].noType,obj.pageGo)}>{obj.name}</a>
                </div>
            )
        }
        return (
            <div className="wrap-2">{items}</div>
        )
    }
}