import '../css/outpatients-pay.css';
import React from 'react';
import { $,$Ajax,$Fuck } from '../js/common'
import PayTable from './outpatients-pay/pay-table.jsx';

export default class OutpatientsPay extends React.Component{
    state = {
        list:[],
        nullClass:'',
        priceList:[],
        totalPrice:0,
        payList:[],
        payListItem:"",
        Act:[]
    }
    constructor(props){
        super(props)
    }
    componentWillMount(){
        $Ajax('chaxunChufangLiebiao',{
            patientId:$.urlObj.sourceId,
            payStatus:1,
            org:localStorage.getItem('org')
        },(data)=>{
            data = $Fuck(data.obj.dataset.row);
            this.setState({list:data});
            if(!data.length){
                this.setState({nullClass:'active'})
            }else{
                let arr=[];
                for(let i=0;i<data.length;i++){
                    arr.push('')
                }
                this.setState({Act:arr})
            }
        })
    }
    choosePay(inx){
        let arr=[];
        for(let i=0;i<this.state.Act.length;i++){
            arr[i]='';
            if(inx==i){arr[i]='active'}
        }
        this.setState({
            Act:arr,
            totalPrice:this.state.priceList[inx].toFixed(2),
            payListItem:this.state.payList[inx]
        })
    }
    setPriceList(i,p){
        let arr=this.state.priceList;
        arr[i]=p;
        this.setState({priceList:arr})
    }
    setPayList(i,data){
        let arr=this.state.payList;
        arr[i]=data;
        this.setState({payList:arr})
    }
    toPay(){
        if(this.state.totalPrice){
            $Ajax('tuisongJiaofeiDingdan',{
                cardNo : $.urlObj.cardNo,
                orderAmount : this.state.totalPrice,
                context : $.type,
                name : $.urlObj.name,
                sourceId : $.urlObj.sourceId,
                pres : [this.state.payListItem]
            },function(data){
                location.replace($.reqHost+'/hrwgzyy/rest/jiaofei?' + 'merBillNo='+data.obj.MerBillNo+'&productName=门诊缴费&price='+this.state.totalPrice+'&payAccount='+$.urlObj.sourceId)
            })
        }else{
            alert('请先选择处方再支付！')
        }
    }
    render() {
        let list=this.state.list,
            bodyWrap={width:'100%',paddingBottom: '2.1rem'},
        items=list.map((item,i)=>{
            return (
                <ul>
                    <li>
                        <h2 onClick={this.choosePay.bind(this,i)} className={this.state.Act[i]}>处方：{item.flowNo}</h2>
                        <PayTable list={item} setPriceList={this.setPriceList} setPayList={this.setPayList} index={i} />
                    </li>
                </ul>
            )
        })
        return (<div className="body-wrap P12" style={bodyWrap}>        <div className="route-shade"></div>
            <div id="wrap">
                <div id="null" className={this.state.nullClass}>暂无相关记录</div>
                {items}
            </div>

            <div id="total">
                {/*<p id="choose-all" className="active"><span></span>全选</p>*/}
                <a id="to-pay" href="javascript:;" onClick={this.toPay}>去支付</a>
                <p id="price">总金额：￥{this.state.totalPrice}</p>
            </div>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}