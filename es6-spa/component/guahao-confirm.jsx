import '../css/guahao-confirm.css';
import React from 'react';
import scroll from 'iscroll';
import { connect } from 'react-redux';
import { $,$Ajax,$Param,$Next } from '../js/common';
import Alert from './alert/alert.jsx';

let iScroll;

@connect (
    state => {return { guahaoInf:state.guahaoInf } }
)
export default class extends React.Component{
    constructor(){
        super()
        document.title="确认挂号信息"
        this.state={
            ALERT:false,
            alertContent:""
        }
    }
    componentDidMount(){
        iScroll = new scroll('.P17 .scroll-wrapper',{click:true})
    }
    submit(){
        const { guahaoInf } = this.props;
        const { state } = this.props.location;
        $Ajax("guaHao",{
            userId:localStorage.getItem("userId"),
            regDate:guahaoInf.time,
            doctorId:state.doctorId,
            outDeptId:state.outDeptId,
            ampm:state.ampm,
            appointTime:state.appointTime,
            scheduleDetailNumber:state.scheduleDetailNumber
        },(data)=>{
            this.setState({ALERT:true,alertContent:"您好！您已成功预约北京清华长庚医院"+guahaoInf.time+state.outDeptName+state.doctorName+state.doctorTitle+"号，序号"+data.obj.scheduleDetailNumber+"号，"+
                  "就诊时间约"+data.obj.appointTime+"。"+
                  "初诊病患及首次以医保身份于本院就医病患，请于就诊当天至少提前15分钟携身份证、社保卡等至门诊大厅自助服务机或挂号窗口建档、取号。"+
                  "温馨提示：因故不能就诊，请于看前一日23:00之前至清华长庚医院公众号[挂号]-[挂号记录]进行取消，或周一至周五8:00-11:30、12:30-16:30拨打我院人工电话56118899-1进行取消，否则按爽约处理"
            })
        })
    }
    alertYes(){
        $Next();
        this.props.history.replace({
            pathname : "/query-guahao"
        })
    }
    render() {
        const { guahaoInf } = this.props;
        const { state } = this.props.location;
        return (<div className="body-wrap P17"> <div className="route-shade"></div>
            <div className="scroll-wrapper">
                <ul className="scroll">
                    <div>
                        <li>
                            <p>门诊科室</p>
                            <span>{state.outDeptName}</span>
                        </li>
                        <li>
                            <p>门诊医生</p>
                            <span>{state.doctorName}</span>
                        </li>
                        <li>
                            <p>医生级别</p>
                            <span>{state.doctorTitle}</span>
                        </li>
                        <li>
                            <p>就诊序号</p>
                            <span>{state.regleaveCount}</span>
                        </li>
                        <li>
                            <p>就诊时间</p>
                            <span>{state.regDate + " " +state.appointTime}</span>
                        </li>
                        <li>
                            <p>医事服务费</p>
                            <span>{state.regFee}元</span>
                        </li>
                    </div>
                    <div>
                        <li id="choose-patient">
                            <p>就诊人：</p>
                            <span>{localStorage.getItem("userName")}</span>
                        </li>
                    </div>
                    <div id="tip-wrap">
                        <span id="excuse">注意：</span>
                        <span id="excuse-text">就诊当日，请您参考预约成功后提示的时间先至自助设备【取号】——缴纳医事服务费取得挂号单后，再至相应诊区候诊。初诊患者请携带病患本人医保卡或身份证至自助设备【取号】，无有效身份证件之婴幼儿童需至人工柜台办理取号。</span>
                    </div>
                </ul>
            </div>
            <a href="javascripy:;" id="submit" onClick={this.submit.bind(this)}>挂号</a>
            {this.state.ALERT && <Alert yes={this.alertYes.bind(this)} title="挂号成功" content={this.state.alertContent} />}
        </div>)
    }
}