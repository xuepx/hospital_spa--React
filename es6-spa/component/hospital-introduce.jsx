import '../css/hospital-introduce.css';
import React from 'react';
import { connect } from 'react-redux';
import scroll from 'iscroll';
import { $,$Ajax,$Param,$Next } from '../js/common'

let iScroll;

@connect (
    state => {return { guahaoInf:state.guahaoInf } }
)
export default class extends React.Component{
    state = {
        text:{}
    }
    componentWillMount(){
        let type = this.props.location.state;
        if(type == "chaxun-dep"){
            document.title="科室简介"
            $Ajax('getMenZhenList',{
                outDepId : this.props.guahaoInf.departId
            },(data)=>{
                this.setState({text:data.obj})
                let img = new Image();
                img.src=data.obj.departmentPic
                img.onload=()=>{
                    iScroll.refresh()
                }
            })
        }else{
            document.title="医院简介"
            $Ajax('getHospitalInfo',{},(data)=>{
                this.setState({text:data.obj})
                let img = new Image();
                img.src=data.obj.hosPic
                img.onload=()=>{
                    iScroll.refresh()
                }
            })
        }
    }
    componentDidUpdate(){
        iScroll = new scroll('.scroll-wrapper',{click:true})
    }
    render() {
        let text=this.state.text;
        return (<div className="body-wrap P22">      <div className="route-shade"></div>
            <div className="scroll-wrapper">
                <ul className="scroll">
                    <img src={text.hosPic || text.departmentPic}/>
                    <h3>{this.props.match.params.type == "chaxun-dep" ? "科室简介" : "医院简介"}</h3>
                    <p>{text.introduce}</p>
                </ul>
            </div>
        </div>)
    }
}