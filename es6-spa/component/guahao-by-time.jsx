import '../css/guahao-by-time.css';
import '../js/picker/calendar.css';
import React from 'react';
import { connect } from 'react-redux';
import { guahao } from '../store/actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Calendar from '../js/picker/calendar'; 
import scroll from 'iscroll';
import { $,$Ajax,$Param,$Next } from '../js/common';
import Login from './login/login.jsx';
import Alert from './alert/alert.jsx';

let iScroll,Dispatch;

@connect (
    state => {return { guahaoInf:state.guahaoInf } }
)
export default class extends React.Component{
    state = {
        loginDisplay:false,
        alertContent:"",
        ALERT:false,
        docList:[]
    }
    constructor(props){ 
        super(props)
        Dispatch = props.dispatch;
        document.title="预约挂号(选择医生)"
    }
    componentWillMount(){
        this.getDocList()
    }
    componentDidMount(){
        let _this=this,today = new Date(),startDay=new Date(),endDay = new Date(),
            chooseTime = new Date(this.props.guahaoInf.time);
            startDay.setDate(today.getDate()+1);
            endDay.setDate(today.getDate()+28);
        new Calendar({
            container: 'calendar',
            isMask: false,
            beginTime: [startDay.getFullYear(), startDay.getMonth()+1, startDay.getDate()],
            endTime: [endDay.getFullYear(), endDay.getMonth()+1, endDay.getDate()],
            recentTime: [chooseTime.getFullYear(), chooseTime.getMonth()+1, chooseTime.getDate()],
            isSundayFirst: true,
            isShowNeighbor: true, 
            isToggleBtn: true,
            isChinese: true,
            monthType: 1,
            canViewDisabled: false,
            beforeRenderArr: [{
                stamp: new Date(chooseTime.getFullYear(),chooseTime.getMonth(), chooseTime.getDate()).getTime(),
                className: 'calendar-active',
            }],
            success: function (item, arr, cal) {
                let allDay = document.querySelectorAll('.calendar-item-body li')
                for(let i=0;i<allDay.length;i++){
                    allDay[i].classList.remove('calendar-active')
                }
                let chooseDay = document.getElementsByClassName('calendar-item-' + item)
                for(let i=0;i<chooseDay.length;i++){
                    chooseDay[i].classList.add('calendar-active')
                }
                Dispatch(guahao('time',item))
                setTimeout(_this.getDocList.bind(_this),0)
            },
            switchRender: function (year, month, cal) {
                iScroll.refresh()
            }
        });
        iScroll = new scroll('.P18 .scroll-wrapper',{click:true})
    }
    componentDidUpdate(){
        iScroll.refresh();
    }
    getDocList(){
        this.setState({docList:[]})
        $Ajax("getSignalSource",{
            outDeptId:this.props.guahaoInf.departId,
            regDate:this.props.guahaoInf.time
        },(data)=>{
            this.setState({docList:data.obj})
        },(data)=>{
            this.alert("未获取到排班记录")
        })
    }
    closeLoginThen(){
        this.setState({loginDisplay:false},()=>{
            this.alert("登录成功")
        })
    }
    timeType(id){
        switch(Number(id)){
            case 1 : return "上午";
            case 2 : return "下午";
            case 3 : return "晚上";
        }
    }
    alert(text){
        this.setState({
            alertContent:text,
            ALERT:true
        });
    }
    alertYes(){
        this.setState({
            ALERT:false
        });
    }
    toConfirm(item){
        if(!localStorage.getItem("userId")){
            this.setState({loginDisplay:true})
        }else if(Number(item.regleaveCount)<=0){
            this.alert("该时段已无可挂号源")
        }else{
            $Next();
            this.props.history.push({
                pathname:"/guahao-confirm",
                state:{
                    regDate : this.props.guahaoInf.time,
                    outDeptId : this.props.guahaoInf.departId,
                    ...item
                }
            })
        }
    }
    render() {
        let items = this.state.docList.map((item,i) => {
            let {ampm,appointTime,doctorId,doctorName,doctorTitle,outDeptId,outDeptName,pbId,regDate,regFee,regleaveCount,scheduleDetailNumber} = item;
            return (
                <li className="doc-list clearfix">
                    <span className="doc-img"></span>
                    <div className="doclist-wrap">
                        <p className="wrap1">
                            <h4>{doctorName}</h4>
                            <span>{doctorTitle}</span>
                        </p>
                        <p className="wrap2">
                            {outDeptName}
                        </p>
                    </div>
                    <ul className="source-wrapper">
                        <li onClick={this.toConfirm.bind(this,item)}>
                            <p className="time">{regDate + ' ' + this.timeType(ampm) + ' ' + appointTime}</p>
                            <p className="price">￥{regFee}</p>
                            <p className="surplus">余:{regleaveCount}号</p>
                        </li>
                    </ul>
                </li>
            )
        });
        let login = () => {
            if(this.state.loginDisplay){
                return (
                    <Login from="guahao-by-time" history={this.props.history} callback={this.closeLoginThen.bind(this)}/>
                )
            }
        }
        return (<div className="body-wrap P18">      <div className="route-shade"></div>
            <div className="scroll-wrapper">
                <ul className="scroll">
                    <div id="calendar"></div>
                    {items}
                </ul>
            </div>

            <ReactCSSTransitionGroup transitionName="login">
                {login()}
            </ReactCSSTransitionGroup>

            {this.state.ALERT && <Alert yes={this.alertYes.bind(this)} content={this.state.alertContent} />}
        </div>)
    }
}