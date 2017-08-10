import React from 'react';
import { $,$Fuck,$Ajax } from '../../js/common'

export default class PayTable extends React.Component{
    state = {
        detail:[]
    }
    constructor(props){
        super(props)
    }
    componentWillMount(){
        $Ajax('chaxunChufangMingxi',{
            flowNo:this.props.list.flowNo,
            orderId:this.props.list.orderId,
            org:localStorage.getItem('org')
        },(data)=>{
            let price=0;
            data=$Fuck(data.obj.dataset.row);
            this.setState({detail:data});
            for(var i=0;i<data.length;i++){
                price+=data[i].itemSum
            }
            this.props.setPriceList(this.props.index,price)
            this.props.list.itemList=this.state.detail
            this.props.setPayList(this.props.index,this.props.list)
        })
    }
    render(){
        let width={width:'50%'},
            detail=this.state.detail,
        items=detail.map((item,i)=>{
            return (
                <tr>
                    <td style={width}>{item.costName}</td>
                    <td>{item.costNum}</td>
                    <td className="price">￥{item.itemSum}</td>
                </tr>
            )
        })
        return(
            <table border="0">
                <tr className="title">
                    <th style={width}>类目名称</th>
                    <th>数量</th>
                    <th>总金额</th>
                </tr>
                {items}
            </table>
        )
    }
}