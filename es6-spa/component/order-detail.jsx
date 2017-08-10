import '../css/order-detail.css';
import React from 'react';
import { $,$Ajax } from '../js/common'

export default class OrderDetail extends React.Component{
    state = {
        patientName:'',
        canPay:0,
        sourceId:'',
        pmid:''
    }
    constructor(props){
        super(props)
    }

    componentWillMount(){
        if(localStorage.getItem('temporary-name')){
            this.setState({
                patientName:localStorage.getItem('temporary-name'),
                sourceId:localStorage.getItem('temporary-sourceId'),
                pmid:localStorage.getItem('temporary-pmid'),
                canPay:1
            });
            localStorage.removeItem('temporary-name');
            localStorage.removeItem('temporary-sourceId');
            localStorage.removeItem('temporary-pmid')
        }else{
            $Ajax('chaxunJiuzhenrenXinxi',{
                context:$.type,
                openId:$.openId
            },(data)=>{
                if(data.obj[0]){
                    let obj = data.obj[0];
                    this.setState({patientName:obj.name,sourceId:obj.sourceId,pmid:obj.pmid,canPay:1})
                }else{
                    this.setState({patientName:'请先添加就诊人'})
                }
            })
        }
    }
    choosePatient(){
        if(this.state.patientName=="请先添加就诊人"){
            this.props.history.push({
                pathname: '/choose-patient',
                search: '?'+$Param({
                    from:'orderDetail'
                })
            })
        }else{
            this.props.history.push({
                pathname: '/add-patient',
                search: '?'+$Param({
                    from:'orderDetail'
                })
            })
        }
    }
    timeFilter(time){
        switch(Number(time)){
            case 1:return '上午';break;
            case 2:return '下午';break;
            case 3:return '全天';break;
        }
    }
    submit(){
        let price=Number($.urlObj.treatFee)+Number($.urlObj.regFee);
        if(this.state.canPay){
            $Ajax('tuisongGuahaoDingdan',{
                org : localStorage.getItem('org'),
                deptCode : $.urlObj.deptId,
                deptName : $.urlObj.depart,
                doctCode : $.urlObj.doctorId,
                doctName : $.urlObj.name || "普通号",
                regTypeCode : $.urlObj.doctorId ? '1' : '2',
                regTypeName : $.urlObj.noType,
                orderAmount : Number($.urlObj.treatFee)+Number($.urlObj.regFee),
                regFee : Number($.urlObj.regFee),
                digFee : Number($.urlObj.treatFee),
                name : this.state.patientName,
                sourceId : this.state.sourceId,
                seeDate : $.urlObj.regDate,
                noon  : this.timeFilter($.urlObj.timeFlag),
                timerInterval : $.urlObj.timeFlag,
                patientId : this.state.pmid,
                regSpecies : $.urlObj.noType,
                visitTime : $.urlObj.regDate,
            },(data)=>{
                location.replace($.reqHost+'/hrwgzyy/rest/jiaofei?' + 'merBillNo='+data.obj.MerBillNo+'&productName=线上挂号&price='+(Number($.urlObj.treatFee)+Number($.urlObj.regFee))+'&payAccount='+this.state.sourceId)
            })
        }else{
            alert('请先添加就诊人')
            this.choosePatient()
        }
    }
    render(){
        return (<div className="body-wrap P10">     <div className="route-shade"></div>
            <ul>
                <li>
                    <p>挂号院区：</p>
                    <p className="gray">{localStorage.getItem('orgName')}</p>
                </li>
                <li>
                    <p>挂号类型：</p>
                    <p className="gray">{$.urlObj.level}</p>
                </li>
                <li>
                    <p>门诊科室：</p>
                    <p className="gray">{$.urlObj.depart}</p>
                </li>
                <li>
                    <p>门诊医生：</p>
                    <p className="gray">{$.urlObj.name || "普通号"}</p>
                </li>
                <li>
                    <p>就诊时间：</p>
                    <p className="gray">{$.urlObj.time}</p>
                </li>
                <li>
                    <p>挂号费用：</p>
                    <p className="red">￥{Number($.urlObj.treatFee)+Number($.urlObj.regFee)}</p>
                </li>
            </ul>

            <ul>
                <li id="choose" onClick={this.choosePatient}>
                    <p>选择就诊人：</p>
                    <p className="gray">{this.state.patientName}</p>
                </li>
            </ul>

            <div id="tip">
                <p>1.本系统挂号需要支付挂号费</p>
                <p>2.若挂号当天不就诊，过期医院不再安排就诊及退费</p>
            </div>

            <a href="javascript:;" className="submit" onClick={this.submit}>提交</a>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}