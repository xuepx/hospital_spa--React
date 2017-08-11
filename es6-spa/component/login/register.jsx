import '../../css/register.css';
import '../../js/picker/date-picker.css';
import '../../js/picker/multi-picker.css';
import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions';
import scroll from 'iscroll';
import DateSelector from '../../js/picker/date-picker';
import MultiPicker from '../../js/picker/multi-picker';
import { $,$Ajax,$Param,$Next,$checkPhone } from '../../js/common';

let iScroll,timer;

@connect (
    state => {return { loginInformation:state.loginInformation } }
)
export default class Register extends React.Component{
    state={
        countDown:"获取验证码",
        province:{
            value:"---选择省---",
            id:NaN
        },
        city:{
            value:"---选择市---",
            id:NaN
        },
        county:{
            value:"---选择县/辖区---",
            id:NaN
        }
    }
    componentDidMount(){
        iScroll = new scroll('.P23 .scroll-wrapper',{click:true})
        let nowTime=new Date();
        new DateSelector({ 
            input:"choose-date",
            container:"select-1",
            type:0,
            param:[1,1,1],
            beginTime: [1900,1,1],
            endTime: [nowTime.getFullYear(), nowTime.getMonth()+1, nowTime.getDate()],
            recentTime: [nowTime.getFullYear(), nowTime.getMonth()+1, nowTime.getDate()],
            success:(arr1,arr2)=>{
                this.setState({birth:arr2[0]+'-'+arr2[1]+'-'+arr2[2]})
            }
        });
        new MultiPicker({ 
            input:"choose-sex",
            container:"select-2",
            jsonData:pickerData1,
            success:(arr)=>{
                this.setState({sex:arr[0].value})
            }
        });
        new MultiPicker({ 
            input:"choose-card-type",
            container:"select-3",
            jsonData:pickerData2,
            success:(arr)=>{
                this.setState({identity:arr[0]})
            }
        });
        new MultiPicker({ 
            input:"choose-marry",
            container:"select-4",
            jsonData:pickerData3,
            success:(arr)=>{
                this.setState({marry:arr[0].value})
            }
        });
        $Ajax("getDictArea",{},(data)=>{
            new MultiPicker({ 
                input:"province",
                container:"select-5",
                jsonData:data.obj,
                success:(arr)=>{
                    this.setState({province:arr[0],city:{value:"---选择市---",id:NaN},county:{value:"---选择县/辖区---",id:NaN}})
                    this.getCity(arr[0].id.substr(0,2))
                }
            })
        })
    }
    setInf(type,e){
        let val = e.target.value,
            key;
        switch(type){
            case "name" : key=type;break;
            case "idNum" : key=type;break;
            case "stayDeail" : key=type;break;
            case "tel" : key=type;break;
            case "code" : key=type;break;
            case "password" : key=type;break;
        }
        this.props.dispatch(action.setInf(key,val))
    }
    registerConfirm(){
        $Next();
        this.props.history.push({
            pathname:"/register-confirm"
        })
    }
    getCity(id){
        $Ajax("getDictArea",{
            areaCode:id
        },(data)=>{
            new MultiPicker({ 
                input:"city",
                container:"select-6",
                jsonData:data.obj,
                success:(arr)=>{
                    this.setState({city:arr[0],county:{value:"---选择县/辖区---",id:NaN}})
                    this.getCounty(arr[0].id.substr(0,4))
                }
            })
        })
    }
    getCounty(id){
        $Ajax("getDictArea",{
            areaCode:id
        },(data)=>{
            new MultiPicker({ 
                input:"county",
                container:"select-7",
                jsonData:data.obj,
                success:(arr)=>{
                    this.setState({county:arr[0]})
                }
            })
        })
    }
    getCode(){
        if(!$checkPhone(this.state.tel)){
            alert("请输入正确的手机号码！")
            return
        }
        $Ajax("getMobileMsgCode",{
            phoneNumber:this.state.tel
        },(data)=>{
            timer = setInterval(()=>{
                let time = parseInt(this.state.countDown);
                if(time==0){
                    this.setState({countDown:"获取验证码"})
                    clearInterval(timer)
                }
                if(Number(time)){
                    time -= 1; time += "s"
                }else{
                    time = "60s"
                }
                this.setState({countDown:time})
            },1000)
        })
    }
    render() {
        const { loginInformation } = this.props;
        return (<div className="body-wrap P23">
            <div className="scroll-wrapper">
                <ul className="scroll">
                    <div>
                        <li>
                            <p>姓名</p>
                            <input placeholder="请输入姓名" value={loginInformation.name} onChange={this.setInf.bind(this,"name")} />
                        </li>
                        <li className="choose">
                            <p>性别</p>
                            <span id="choose-sex">{loginInformation.sex}</span>
                        </li>
                        <li className="choose">
                            <p>生日</p>
                            <span id="choose-date">{loginInformation.birth}</span>
                        </li>
                        <li className="choose">
                            <p>证件类型</p>
                            <span id="choose-card-type">{loginInformation.identity.value}</span>
                        </li>
                        <li>
                            <p>证件号码</p>
                            <input placeholder="请输入证件号码" value={loginInformation.idNum} onChange={this.setInf.bind(this,"idNum")} />
                        </li>
                        <li className="choose">
                            <p>婚姻状况</p>
                            <span id="choose-marry">{loginInformation.marry}</span>
                        </li>
                        <li id="pos-wrap">
                            <p>现居住</p>
                            <div id="select-pos">
                                    <p>
                                        <b className="pos-icon"></b><b className="pos-choose" id="province">{this.state.province.value}</b>
                                    </p>
                                    <p>
                                        <b className="pos-icon"></b><b className="pos-choose" id="city">{this.state.city.value}</b>
                                    </p>
                                    <p>
                                        <b className="pos-icon"></b><b className="pos-choose" id="county">{this.state.county.value}</b>
                                    </p>
                            </div>
                        </li>
                        <li>
                            <p>详细地址</p>
                            <input placeholder="请填写详细地址" value={loginInformation.stayDetai} onChange={this.setInf.bind(this,"stayDetail")} />
                        </li>
                    </div>
                    <div>
                        <li>
                            <p>密码</p>
                            <input placeholder="请输入注册密码" type="password"  value={loginInformation.password} onChange={this.setInf.bind(this,"password")} />
                        </li>
                    </div>
                    <div>
                        <li>
                            <p>手机号</p>
                            <input placeholder="请输入手机号" type="number" value={loginInformation.tel} onChange={this.setInf.bind(this,"tel")} />
                        </li>
                        <li>
                            <span id="get-code" onClick={this.getCode.bind(this)}>{this.state.countDown}</span>
                            <input id="test-code" placeholder="请输入验证码"  value={this.state.code} onChange={this.setInf.bind(this,"code")} />
                        </li>
                    </div>
                </ul>
            </div>
            <a href="javascripy:;" id="submit" onClick={this.registerConfirm.bind(this)}>立即注册</a>
            <div id="select-1"></div>
            <div id="select-2"></div>
            <div id="select-3"></div>
            <div id="select-4"></div>
            <div id="select-5"></div>
            <div id="select-6"></div>
            <div id="select-7"></div>
        </div>)
    }
}

var pickerData1=[
        {
            id:'0',
            value:'男'
        },
        {
            id:'1',
            value:'女'
        }
    ],
    pickerData2=[
        {
            id:'1',
            value:'身份证'
        },
        {
            id:'4',
            value:'护照'
        },
        {
            id:'3',
            value:'军官证'
        },
        {
            id:'5',
            value:'台胞证'
        },
        {
            id:'99',
            value:'其他'
        }
    ],
    pickerData3=[
        {
            id:'1',
            value:'已婚'
        },
        {
            id:'2',
            value:'未婚'
        },
        {
            id:'3',
            value:'离异'
        },
        {
            id:'4',
            value:'丧偶'
        },
        {
            id:'99',
            value:'其他'
        }
    ]

