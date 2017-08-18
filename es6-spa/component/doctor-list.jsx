import '../css/doctor-list.css';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { guahao } from '../store/actions';
import scroll from 'iscroll';
import { $,$Ajax,$Param } from '../js/common'

let iScroll;

@connect (
    state => {return { guahaoInf:state.guahaoInf } }
)
export default class extends React.Component{
    state = {
        docList:[]
    }
    componentWillMount(){
        $Ajax('getDoctorList',{
            outDepId:this.props.guahaoInf.departId
        },(data)=>{
            this.setState({docList:data.obj})
            setTimeout(()=>{if(!data.obj.length)alert("该科室暂无医生介绍")},300)
        })
    }
    componentDidUpdate(){
        iScroll = new scroll('.scroll-wrapper',{click:true})
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
        let items=this.state.docList.map((item,i)=>{
            let img = {
                backgroundImage:"url('"+item.doctorPhone+"')",
                backgroundSize:"cover"
            }
            return (
                <li className="doc-list clearfix">
                    <span className="doc-img" style={img}></span>
                    <div className="doclist-wrap">
                        <p className="wrap1">
                            <h4>{item.doctorName}</h4>
                            <span>{this.docLevel(item.fanghaoType)}</span>
                        </p>
                        <p className="wrap2">
                            {item.outDepName}
                        </p>
                        <p className="wrap3">
                            {item.doctorExpertise}
                        </p>
                    </div>
                </li>
            )
        })
        return (<div className="body-wrap P21">      <div className="route-shade"></div>
            <div className="scroll-wrapper">
                <ul className="scroll">
                    {items}
                </ul>
            </div>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}