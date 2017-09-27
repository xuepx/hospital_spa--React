import '../css/doctor-introduce.css';
import React from 'react';
import scroll from 'iscroll';
import { $,$Ajax,$Param,$Next } from '../js/common'

let iScroll;

export default class extends React.Component{
    constructor(){
        super()
        document.title="医生介绍"
    }
    componentDidMount(){
        iScroll = new scroll('.P25 .scroll-wrapper',{click:true})
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
        let item=this.props.location.state.item,
            img = {
                backgroundImage:"url('"+item.doctorPhone+"')",
                backgroundSize:"cover"
            }
        return (<div className="body-wrap P25">      <div className="route-shade"></div>
            <div className="scroll-wrapper">
                <ul className="scroll">
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
                        </div>
                    </li>
                    <h3>医生特长</h3>
                    <p className="detail">{item.doctorExpertise || "暂无介绍"}</p>
                    <h3>教育背景</h3>
                    <p className="detail">{item.docEducational || "暂无介绍"}</p>
                    <h3>工作经历</h3>
                    <p className="detail">{item.docExperience || "暂无介绍"}</p>
                    <h3>研究方向</h3>
                    <p className="detail">{item.docResearch || "暂无介绍"}</p>
                    <h3>学术职务</h3>
                    <p className="detail">{item.docAcademic || "暂无介绍"}</p>
                </ul>
            </div>
        </div>)
    }
}