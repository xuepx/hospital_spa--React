import '../css/inhospital-record.css';
import React from 'react';
import { $,$Ajax } from '../js/common'

export default class InhospitalRecord extends React.Component{
    state = {
        Act:'',
        inHospitalNo:'',
        payList:{
            row:[],
            hosSection:'',
            patientName:'',
            patientGender:'',
            age:''
        }
    }
    constructor(props){
        super(props)
    }
    inputCode(e){
        this.setState({inHospitalNo:e.target.value})
    }
    chooseDate(){
        laydate.skin('yalan');//切换皮肤，请查看skins下面皮肤库
        laydate({
            elem:"#time",
            min: laydate.now(-90), //-1代表昨天，-2代表前天，以此类推
            max: laydate.now() //+1代表明天，+2代表后天，以此类推
        });
    }
    submit(){
        let time=this.refs.time.innerHTML;
        if(time){
            $Ajax('mu027',{
                inHospitalNo : this.state.inHospitalNo,
                startDate :time,
                endDate : time
            },(data)=>{
                this.setState({payList:data.obj.dataset.row,Act:'active'})
            })
        }else{
            alert('请先选择日期再查询')
        }
    }
    render(){
        let list=this.state.payList.row,
        items=list.map((item,i)=>{
            let time=String(list[i].itemDateTime);
            return (
                 <tr>
                    <td style={{width:'30%'}}>{time.substring(0,4)+'-'+time.substring(4,6)+'-'+time.substring(6,8)}</td>
                    <td style={{width:'30%'}}>{item.itemName}</td>
                    <td style={{width:'15%'}}>{item.itemNum}</td>
                    <td className="price">￥{item.itemPrice}</td>
                </tr>
            )
        })
        return (<div className="body-wrap P8">      <div className="route-shade"></div>
            <div id="number" className="clearfix">
                <p>住院号：</p>
                <input id="code" placeholder="请输入住院号" onChange={this.inputCode} />
                <a href="javascript:;" id="submit" onClick={this.submit}>查询</a>
                <span id="calendar" onClick={this.chooseDate.bind(this)}></span>
            </div>
            <div id="choose-time">
                <p>查询时间为：<span id="time" ref="time"></span></p>
            </div>
            <div className={this.state.Act} id="detail-wrap">
                {list.length && <h2>{list[0].hosSection}：{list[0].patientName}<span style={{float:'right'}}>{list[0].patientGender}，{list[0].age}</span></h2>}
                <ul className="title clearfix">
                    <li style={{width:'30%'}}>缴费日期</li>
                    <li style={{width:'30%'}}>类目名称</li>
                    <li style={{width:'15%'}}>数量</li>
                    <li>总金额</li>
                </ul>

                <div id="wrap">
                    <table className="clearfix">
                        {items}
                    </table>

                    <div id="tip">
                        <p>如需纸质费用清单，请到收费处或自助打印设备进行打印</p>
                    </div>
                </div>
            </div>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}