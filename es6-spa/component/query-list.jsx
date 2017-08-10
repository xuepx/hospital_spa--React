import '../css/query-list.css';
import React from 'react';
import { $,$Ajax,$Fuck } from '../js/common'

export default class QueryList extends React.Component{
    state = {
       searchList:[]
    }
    constructor(props){
        super(props)
    }
    componentWillMount(){
        if(Number($.urlObj.type)){

        }else{
            $Ajax('mu048',{
                pyCode:$.urlObj.pyCode
            },(data)=>{
                this.setState({searchList:$Fuck(data.obj.dataset.row)})
            })
        }
    }
    render(){
        let list=this.state.searchList,
        items=list.map((item,i)=>{
            return (
                 <li>
                    <h3>{i+1}.{item.drugName}</h3>
                    <p>剂型：<span>{item.drugName}</span></p>
                    <p>编码：<span>{item.drugCode}</span></p>
                    <p>单价：<span>{item.drugPrice+"/"+item.drugUnit}</span></p>
                    <p>规格：<span>{item.drugNorms}</span></p>
                </li>
            )
        })
        return (<div className="body-wrap P15">     <div className="route-shade"></div>
            <header>
                包含<span>{$.urlObj.pyCode}</span>的记录
            </header>
            <ul>
                {items}
            </ul>
            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}