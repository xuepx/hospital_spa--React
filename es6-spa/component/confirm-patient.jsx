import '../css/confirm-patient.css';
import React from 'react';
import { $,$Param } from '../js/common'

export default class ConfirmPatient extends React.Component{
    constructor(props){
        super(props)
    }
    pageGo(){
        this.props.history.push({
            pathname: '/input-price',
            search: '?'+$Param({
                patientId:$.urlObj.patientId,
                patientNo:$.urlObj.patientNo,
                balance:$.urlObj.balance
            })
        })
    }
    render() {
        return (<div className="body-wrap P4">      <div className="route-shade"></div>
            <ul>
                <li>
                    <p>院区：</p>
                    <p className="gray">{localStorage.getItem('orgName')}</p>
                </li>
                <li>
                    <p>姓名：</p>
                    <p className="red">{$.urlObj.name}</p>
                </li>
                <li>
                    <p>性别：</p>
                    <p className="gray">{$.urlObj.sex}</p>
                </li>
                <li>
                    <p>年龄：</p>
                    <p className="gray">{$.urlObj.age}</p>
                </li>
                <li>
                    <p>科室：</p>
                    <p className="red">{$.urlObj.departName}</p>
                </li>
                <li>
                    <p>床位号：</p>
                    <p className="gray">{$.urlObj.bedNo}</p>
                </li>
                <li>
                    <p>住院号：</p>
                    <p className="gray">{$.urlObj.hosNo}</p>
                </li>
                <li>
                    <p>身份证号：</p>
                    <p className="red">{$.urlObj.idCardNo}</p>
                </li>
                <li>
                    <p>入院日期：</p>
                    <p className="gray">{$.urlObj.date}</p>
                </li>
            </ul>

            <a href="javascript:;" className="submit" onClick={this.pageGo.bind(this)}>确认</a>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}