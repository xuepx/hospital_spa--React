import '../css/query-guahao.css';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import scroll from 'iscroll';
import { $,$Ajax,$Param } from '../js/common'
import Login from './login/login.jsx';
import Alert from './alert/alert.jsx';

let iScroll;

export default class extends React.Component{
    state = {
        loginDisplay:false,
        guahaoList:[],
        ALERT:false,
        alertCancel:false,
        alertContent:"",
        alertTitle:"",
        alertFn:null
    }
    constructor(){
        super()
        document.title="挂号记录查询"
    }
    componentWillMount(){
        this.getGuahaoList()
    }
    componentDidUpdate(){
        iScroll = new scroll('.P16 .scroll-wrapper',{click:true})
    }
    alert(text,title,cancel,fn){
        if(this.state.ALERT)return;
        this.setState({
            alertContent:text,
            alertCancel:cancel || false,
            alertTitle:title || "",
            alertFn:fn || null,
            ALERT:true
        });
    }
    alertYes(fn){
        this.setState({
            ALERT:false
        });
        if(fn)fn()
    }
    alertNo(){
        this.setState({
            ALERT:false
        });
    }
    getGuahaoList(){
        if(!localStorage.getItem("userId")){
            this.setState({loginDisplay:true})
        }else{
            $Ajax('guaHaoList',{
                userId:localStorage.getItem("userId")
            },(data)=>{
                this.setState({guahaoList:data.obj})
                if(!data.obj.length){
                    this.alert("暂无挂号记录")
                }
            })
        }
    }
    cancel(item){
        this.alert("确认取消"+item.registerTime+" "+item.appointTime+" "+item.outdepName+" "+item.docName+item.fanghaoType+"的预约吗？","取消确认",true,()=>{
            $Ajax('cancelGuaHao',{
                userId:localStorage.getItem("userId"),
                ghId:item.ghId
            },(data)=>{
                this.alert("取消成功");
                this.getGuahaoList()
            })
        })
    }
    closeLoginThen(){
        this.setState({loginDisplay:false},()=>{
            this.alert("登录成功")
        })
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
                <li key={ghId} className="doc-list clearfix">
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
                    <span className="cancel" onClick={this.cancel.bind(this,item)}>取消预约</span>
                </li>
            )
        });
        let login;
        if(this.state.loginDisplay){
            login = <Login from="guahao-by-time" history={this.props.history} callback={this.closeLoginThen.bind(this)}/>
        }
        return (<div className="body-wrap P16">      <div className="route-shade"></div>
            <div className="scroll-wrapper">
                <ul className="scroll">
                    {items}
                </ul>
            </div>

            <ReactCSSTransitionGroup transitionName="login">
                {login}
            </ReactCSSTransitionGroup>

            {   this.state.ALERT && <Alert
                yes={this.alertYes.bind(this,this.state.alertFn)}
                no={this.state.alertCancel ? this.alertNo.bind(this) : null}
                content={this.state.alertContent}
                title={this.state.alertTitle} />
            }

            <footer><p>{$.copyright}</p></footer>
        </div>)
    }
}