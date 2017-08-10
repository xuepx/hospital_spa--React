import '../css/depart-list.css';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import scroll from 'iscroll';
import { $,$Ajax,$Param,$Next } from '../js/common'
import Login from './login/login.jsx'

let iScroll,iScroll2;

export default class DepartList extends React.Component{
    state = {
        shadeAct:false,
        chooseBigDepartName:'',
        bigDepart:[],
        smallDepart:[]
    }
    componentWillMount(){
        $Ajax('getDepartmentList',{},(data)=>{
            this.setState({bigDepart:data.obj})
        })
    }
    componentDidMount(){
        iScroll = new scroll('#ul-wrapper',{click:true})
    }
    componentDidUpdate(){
        if(this.state.shadeAct){
            iScroll2 = new scroll('#ul-wrapper2',{click:true})
        }
    }
    getSmallDepart(id,name){
        /*$Ajax('getMenZhenList',{
            departmentId:id
        },(data)=>{
            this.setState({chooseBigDepartName:name,shadeAct:true,smallDepart:data.obj})
        })*/
    }
    closeShade(){
        this.setState({shadeAct:false})
    }
    toDoctorList(id){
        $Next();
        this.props.history.push({
            pathname: '/doctor-list',
            search:'?'+$Param({
                id:id
            })
        })
    }
    render() {
        let items = this.state.bigDepart.map((item,i)=>{
            return (
                <li key={item.departmentId} onClick={this.getSmallDepart.bind(this,item.departmentId,item.departmentName)}><span>{item.departmentName}</span></li>
            )
        }),
        items2 = this.state.smallDepart.map((item,i)=>{
            return (
                <li key={item.outDepId} onClick={this.toDoctorList.bind(this,item.outDepId)}><span>{item.outDepName}</span></li>
            )
        }),
        shadeList;
        if(this.state.shadeAct) {
            shadeList = (
                <div id="shade-wrapper">
                    <p id="close-shade" onClick={this.closeShade.bind(this)}/>
                    <div id="shade-list">
                        <h3>{this.state.chooseBigDepartName}</h3>
                        <div id="ul-wrapper2">
                            <ul className="scroll">
                                {items2}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
        return (<div className="body-wrap P20">      <div className="route-shade"></div>
            <div id="ul-wrapper">
                <ul className="scroll">
                    {items}
                </ul>
            </div>

            <ReactCSSTransitionGroup transitionName="shade">
                {shadeList}
            </ReactCSSTransitionGroup>

            <Login history={this.props.history}/>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}