import '../css/hospitalization-pay.css';
import React from 'react';
import { $,$Ajax } from '../js/common'

export default class HospitalizationPay extends React.Component{
    state = {
        areaName:$.area,
        org:$.org,
        Act:['','',''],
        payList:[],
        inHospitalNo:""
    }
    constructor(props){
        super(props)
    }
    componentWillMount(){
        for(let i=0;i<this.state.areaName.length;i++){
            if(localStorage.getItem('orgName')==this.state.areaName[i]){
                this.state.Act[i]='active';
                this.setState({Act:this.state.Act})
            }
        }
    }
    changeArea(i,org,name){
        let arr=['','',''];
        arr[i]='active';
        this.setState({Act:arr});
        localStorage.setItem('org',org);
        localStorage.setItem('orgName',name);
    }
    inputCode(e){
        this.setState({inHospitalNo:e.target.value})
    }
    queryNo(){
        if(this.state.inHospitalNo){
            $Ajax('huoquZhuyuanXinxi',{
                org : localStorage.getItem('org'),
                inHospitalNo : this.state.inHospitalNo
            },(data)=>{
                let obj = data.obj.dataset.row;
                this.props.history.push({
                    pathname: '/confirm-patient',
                    search: '?'+$Param({
                        patientNo:_this.state.inHospitalNo,
                        patientId:obj.patientId || obj.inHospitalNo,
                        name:obj.patientName,
                        sex:obj.patientGender,
                        age:obj.age,
                        departName:obj.hosSectionName,
                        bedNo:obj.hosBedNo,
                        hosNo:obj.inHospitalNo,
                        idCardNo:obj.idCardNo,
                        date:obj.inDate,
                        balance:obj.hosBalance
                    })
                })
            })
        }else{
            alert('请输入患者住院号')
        }
    }
    render(){
        let area=this.state.areaName,
            org=this.state.org;
        return (<div className="body-wrap P6">      <div className="route-shade"></div>
            <ul id="area" className="clearfix">
                <li onClick={this.changeArea.bind(this,0,org[0],area[0])} className={this.state.Act[0]} >{area[0]}</li>
                <li onClick={this.changeArea.bind(this,1,org[1],area[1])} className={this.state.Act[1]} >{area[1]}</li>
                <li onClick={this.changeArea.bind(this,2,org[2],area[2])} className={this.state.Act[2]} >{area[2]}</li>
            </ul>

            <div id="number" className="clearfix">
                <p>住院号：</p>
                <input placeholder="请输入住院号" onChange={this.inputCode} value={this.state.inHospitalNo}/>
            </div>

            <div id="tip">
                <p>输入住院号查询住院患者信息，确认信息正确后输入金额进行预缴住院金</p>
            </div>

            <a href="javascript:;" className="submit" onClick={this.queryNo.bind(this)} >查询</a>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}