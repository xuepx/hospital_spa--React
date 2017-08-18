import '../css/guahao-confirm.css';
import React from 'react';
import scroll from 'iscroll';
import { connect } from 'react-redux';
import { $,$Ajax,$Param,$Next } from '../js/common'; 

let iScroll;

@connect (
    state => {return { guahaoInf:state.guahaoInf } }
)
export default class extends React.Component{
    componentDidMount(){
        iScroll = new scroll('.scroll-wrapper',{click:true})
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
            alert("您好！您已成功预约北京清华长庚医院"+guahaoInf.time+"眼科刘瑄的副主任号，序号"+data.obj.scheduleDetailNumber+"号，"+
                  "就诊时间约"+data.obj.appointTime+"。"+
                  "初诊病患及首次以医保身份于本院就医病患，请于就诊当天至少提前15分钟携身份证、社保卡等至门诊大厅挂号窗口建档、取号。"+
                  "温馨提示：因故不能就诊，请于周一至周五8:00-11:30 12:30-16:30拨打我院人工电话56118899-1进行取消，否则按爽约处理。")
            $Next();
            this.props.history.push({
                pathname : "/query-guahao"
            })
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
                            <p>挂号类型</p>
                            <span>{state.doctorTitle}</span>
                        </li>
                        <li>
                            <p>门诊科室</p>
                            <span>{state.outDeptName}</span>
                        </li>
                        <li>
                            <p>门诊医生</p>
                            <span>{state.doctorName}</span>
                        </li>
                        <li>
                            <p>就诊时间</p>
                            <span>{guahaoInf.time}</span>
                        </li>
                        <li>
                            <p>挂号费用</p>
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
                        <span id="excuse-text">1.本系统挂号需要支付挂号费<br/>2.若挂号当天不就诊，过期医院不再安排就诊及退费</span>
                    </div>
                </ul>
            </div>
            <a href="javascripy:;" id="submit" onClick={this.submit.bind(this)}>挂号</a>
        </div>)
    }
}