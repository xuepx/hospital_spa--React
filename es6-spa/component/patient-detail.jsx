import '../css/patient-detail.css';
import React from 'react';
import { $,$Ajax } from '../js/common'

export default class PatientDetail extends React.Component{
    constructor(props){
        super(props)
    }
    deletePatient(){
        if(confirm('确认删除“'+$.urlObj.name+'”就诊人？')){
            $Ajax('shanchuJiuzhenren',{
                id:$.urlObj.id
            },(data)=>{
                alert(data.msg)
                this.props.history.go(-1)
            })
        }
    }
    render(){
        return (<div className="body-wrap P13">     <div className="route-shade"></div>
            <ul>
                <li id="title">
                    <p>{$.urlObj.name}</p>
                </li>
                {/*<li>
                    <p>住院号：</p>
                    <p className="gray"></p>
                </li>*/}
                <li>
                    <p>就诊卡号：</p>
                    <p className="gray">{$.urlObj.cardNo}</p>
                </li>
                <li>
                    <p>身份证号：</p>
                    <p className="gray">{$.urlObj.idNo}</p>
                </li>
                <li>
                    <p>联系电话：</p>
                    <p className="gray">{$.urlObj.phone}</p>
                </li>
                <li>
                    <p>性别：</p>
                    <p className="gray">{$.urlObj.gender}</p>
                </li>
                <li>
                    <p>出生日期：</p>
                    <p className="gray">{$.urlObj.birthday}</p>
                </li>
            </ul>

            <a href="javascript:;" className="submit" onClick={this.deletePatient.bind(this)}>删除此就诊人</a>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}