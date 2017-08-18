import '../css/query-guahao.css';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import scroll from 'iscroll';
import { $,$Ajax,$Param } from '../js/common'
import Login from './login/login.jsx';

let iScroll;

export default class extends React.Component{
    state = {
        loginDisplay:false,
        guahaoList:[]
    }
    componentWillMount(){
        setTimeout(() => this.getGuahaoList(),300)
    }
    componentDidUpdate(){
        iScroll = new scroll('.scroll-wrapper',{click:true})
    }
    getGuahaoList(){
        if(!localStorage.getItem("userId")){
            this.setState({loginDisplay:true})
        }else{
            $Ajax('guaHaoList',{
                userId:localStorage.getItem("userId")
            },(data)=>{
                this.setState({guahaoList:data.obj})
                if(!data.obj.length)alert("暂无挂号记录")
            })
        }
    }
    cancel(item){
        if(confirm("确认取消"+item.registerTime+" "+item.appointTime+" "+item.outdepName+" "+item.docName+item.fanghaoType+"的预约吗？")){
            $Ajax('cancelGuaHao',{
                userId:localStorage.getItem("userId"),
                ghId:item.ghId
            },(data)=>{
                alert("取消成功")
                this.state.guahaoList.forEach((item,i)=>{
                    if(item.ghId==id){
                        this.state.guahaoList.splice(i,1)
                    }
                })
                this.setState({guahaoList:this.state.guahaoList})
            })
       }
    }
    closeLoginThen(){
        this.setState({loginDisplay:false})
        this.getGuahaoList()
    }
    docLevel(id){
        switch(Number(id)){
            case 1 : return "专家";
            case 2 : return "主任";
            case 3 : return "副主任";
            case 4 : return "主治";
        }
    }
    render() {
        let items=this.state.guahaoList.map((item,i)=>{
            let {ampm,appointTime,docName,fanghaoType,ghId,outdepName,regFee,registerTime} = item
            return (
                <li className="doc-list clearfix">
                    <span className="doc-img"></span>
                    <div className="doclist-wrap">
                        <p className="wrap1">
                            <h4>{outdepName}</h4>
                            <span>{docName}</span>
                            <span>{fanghaoType}</span>
                        </p>
                        <p className="wrap2">
                            {registerTime+' '+ampm+' '+appointTime}
                        </p>
                        <p className="wrap3">
                            挂号费用：<span>{regFee}元</span>
                        </p>
                    </div>
                    <a className="cancel" onClick={this.cancel.bind(this,item)}>取消预约</a>
                </li>
            )
        });
        let login = () => {
            if(this.state.loginDisplay){
                return (
                    <Login from="guahao-by-time" history={this.props.history} callback={this.closeLoginThen.bind(this)}/>
                )
            }
        }
        return (<div className="body-wrap P16">      <div className="route-shade"></div>
            <div className="scroll-wrapper">
                <ul className="scroll">
                    {items}
                </ul>
            </div>

            <ReactCSSTransitionGroup transitionName="login">
                {login()}
            </ReactCSSTransitionGroup>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}