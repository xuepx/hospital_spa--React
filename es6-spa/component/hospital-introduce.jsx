import '../css/hospital-introduce.css';
import React from 'react';
import scroll from 'iscroll';
import { $,$Ajax,$Param,$Next } from '../js/common'

let iScroll;

export default class extends React.Component{
    state = {
        text:{}
    }
    componentWillMount(){
        $Ajax('getHospitalInfo',{},(data)=>{
            this.setState({text:data.obj})
        })
    }
    componentDidUpdate(){
        iScroll = new scroll('.scroll-wrapper',{click:true})
    }
    render() {
        let text=this.state.text;
        return (<div className="body-wrap P22">      <div className="route-shade"></div>
            <div className="scroll-wrapper">
                <ul className="scroll">
                    <img src={text.hosPic}/>
                    <h3>医院简介</h3>
                    <p>{text.introduce}</p>
                </ul>
            </div>

            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}