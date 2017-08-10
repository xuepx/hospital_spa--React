import '../css/query-type.css';
import React from 'react';
import { $ } from '../js/common'

export default class QueryType extends React.Component{
    state = {
        inputVal:""
    }
    constructor(props){
        super(props)
    }
    inputCode(e){
        let reg = /^[A-z]*$/;
        if(reg.test(e.target.value)){
            this.setState({inputVal:e.target.value})
        }
    }
    clear(){
        this.setState({inputVal:''})
    }
    pageGo(inx){
        this.props.history.push({
            pathname: '/query-list',
            search: '?'+$Param({
                pyCode:this.state.inputVal,
                type:inx
            })
        })
    }
    render(){
        return (<div className="body-wrap P16">     <div className="route-shade"></div>
            <div id="wrap-1">
                <div><input value={this.state.inputVal}  onChange={this.inputCode.bind(this)} placeholder="请输入药品诊疗服务拼音首字母"  /><span onClick={this.clear.bind(this)}></span></div>
            </div>
            <div id="tip">
                <p>如:查询奥美拉唑，请输入AMLZ，然后点击药品信息查询；查询奥美拉唑，请输入AMLZ，然后点击药品信息查询</p>
            </div>
            <div id="search-type">
                <a onClick={this.pageGo.bind(this,1)}>诊疗服务查询</a>
                <a onClick={this.pageGo.bind(this,0)}>药品信息查询</a>
            </div>
            <footer>
                <p>{$.hosName}</p>
                <p>{$.copyright}</p>
            </footer>
        </div>)
    }
}