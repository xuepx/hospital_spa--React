import React from 'react';
import { $Time } from '../../js/common'

export default class Time extends React.Component{
    constructor(props){
        super(props)
        let arr=[],i=0;
        while(i<7){
            arr.push('')
        }
        this.Act=arr
    }
    setWeek(n){
        switch(n){
            case 1:return '一';break;
            case 2:return '二';break;
            case 3:return '三';break;
            case 4:return '四';break;
            case 5:return '五';break;
            case 6:return '六';break;
            case 0:return '日';break;
        }
    }
    choose(time,inx){
        let arr=[];
        for(var i=0;i<this.state.Act.length;i++){
            arr[i]='';
            if(i==inx)arr[i]='active'
        }
        this.setState({Act:arr})
        if(this.props.type == 'doc'){
            this.props.chooseDate(this.props.index,this.props.docId,time)
        }else{
            this.props.accordingDate(time)
        }
    }
    render(){
        let today=new Date(),
            noBorder={
                borderBottom:'none',
                borderLeft:'none',
                borderRight:'none',
                position:'relative',
                top:'0'
            },
            type=this.props.type,
            items=this.state.Act.map((item,i)=>{
                return (
                    <li className={tiem} onClick={this.choose.bind(this,$Time(today),i)}>
                        <p>{this.setWeek(today.getDay())}</p>
                        <p>{today.getDate()}</p>
                    </li>
                )
            })
        return (
            <ul className="wrap-time clearfix"  style={this.props.type && noBorder}>{items}</ul>
        )
    }  
}