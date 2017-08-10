import '../css/pay-record.css';
import React from 'react';
import { $,$Ajax,$Fuck } from '../js/common'

export default class PayRecord extends React.Component{
    state = {
        payList:[]
    }
    constructor(props){
        super(props)
    }
    componentWillMount(){
        $Ajax('getMenZhenQingdanList',{
            org : localStorage.getItem('org'),
            patientId : $.urlObj.sourceId,
            startDate : '',
            endDate : ''
        },(data)=>{
            let dataList=$Fuck(data.obj.dataset.row),
                arr=_this.state.payList;
            for(let i=0;i<dataList.length;i++){
                ((i)=>{
                    $Ajax('getMenZheXiaoFeiList', {
                        org: localStorage.getItem('org'),
                        serialNo:dataList[i].serialNo
                    },(data)=>{
                        arr[i]=data.obj.dataset.row;
                        arr[i].date=dataList[i].chargeDate;
                        this.setState({payList:arr})
                    })
                })(i)
            }
        })
    }
    pageGo(){
        this.props.history.go(-1)
    }
    render(){
        let list=this.state.payList,
        items=list.map((item,i)=>{
            return (
                <tr>
                    <td>{item.date}</td>
                    <td>{item.itemType}</td>
                    <td>{item.itemNum}</td>
                    <td className="price">￥{item.totalFee}</td>
                </tr>
            )
        })
        return (<div className="body-wrap P14">     <div className="route-shade"></div>
            <h2 onClick={this.pageGo}>{$.urlObj.name}：就诊号 {$.urlObj.cardNo}</h2>
            <ul className="title clearfix">
                <li>缴费日期</li>
                <li>类目名称</li>
                <li>数量</li>
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

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}