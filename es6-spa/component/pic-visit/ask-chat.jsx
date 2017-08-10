import React from 'react';
import scroll from 'iscroll';
import { $,$Ajax } from '../../js/common';

const photo = require("../../img/ghjz-icon.png");
//const photo2 = require("../../img/aphoto.png");

export default class AskChat extends React.Component{
    static defaultProps = {
        obj:{
            canchoose : false,
            ifresult : true
        }
    }
    constructor(props){
        super(props)
        this.state = {
            arr:this.props.th2,
            isnotResult:this.props.isnotResult+' ! '
        }
    }
    componentWillMount(){
        let arr = this.state.arr;
        if(!arr.length){
            arr.push({
                ...this.props.obj,
                pbname:[this.state.isnotResult,<br/>,'====================',<br/>,'点击下方快速挂号~'],
                ifask:false
            })
            this.setState({arr:arr})
        }else{
            let newArr = arr.map((item,i)=>{
                item.askresult=item.pbname.match(/(是否)/g) ? '不是的' : '感觉还好';
                item.ifchoose=true;
                item.canchoose=true;
                item.ifask=false;
                !i ? item.ifresult=true : item.ifresult=false;
                return item
            })
            this.setState({arr:newArr})
        }
    }
    componentDidMount(){
        let iScroll=this.props.iScroll;
        iScroll.refresh();
    }
    componentDidUpdate(){
        let iScroll=this.props.iScroll;
        iScroll.refresh()
        iScroll.scrollTo(iScroll.maxScrollX, iScroll.maxScrollY, 1000, scroll.utils.ease.bounce)
    }
    chooseNext(yes_or_no,i,can){
        if(!can)return;
        let arr = this.state.arr;
        arr[i].ifchoose=false;
        arr[i].ifask=true;
        if(yes_or_no){
            arr[i].askresult='我想是的!'
            arr[i+1]={
                ...this.props.obj,
                pbname:[arr[i].pbResult,<br/>,'====================',<br/>,'点击下方快速挂号~']
            }
        }else{
            if(i==arr.length-1){
                arr[i+1]={
                    ...this.props.obj,
                    pbname:['人工智能“医依帮”也懵逼啦，为了您的健康，',this.state.isnotResult,<br/>,'====================',<br/>,'点击下方快速挂号~']
                }
            }else{
                arr[i+1].ifresult=true;
            }
        }
        this.setState({arr:arr})
    }
    toGuahao(){
        window.location.href="http://yiyibang.com.cn/syydc/yeb_web/yeb_application/Mobile/zfb-guahao.html"
    }
    render(){
        let list=this.state.arr,
            items=list.map((item,i)=>{
                let askSentence,chooseRes;
                if(item.canchoose){
                    chooseRes=(
                        <ul className="clearfix">
                            <li onClick={this.chooseNext.bind(this,true,i,item.ifchoose)}>是</li>
                            <li onClick={this.chooseNext.bind(this,false,i,item.ifchoose)}>否</li>
                        </ul>
                    )
                }else{
                    chooseRes=(
                        <ul className="clearfix to-order">
                            <li onClick={this.toGuahao}>预约专家</li>
                        </ul>
                    )
                }
                if(item.ifask){
                    askSentence=(
                        <div className="ask-wrap wrap clearfix">
                            <img src={$.photoUrl || photo}/>
                            <div>
                                <p>{item.askresult}</p>
                            </div>
                        </div>
                    )
                }
                if(item.ifresult){
                    return (
                        <li className="clearfix">
                            <div className="res-wrap wrap clearfix">
                                <img src={photo}/>
                                <div>
                                    <p>{item.pbname}</p>
                                    {chooseRes}
                                </div>
                            </div>
                            {askSentence}
                        </li>
                    )
                }
            })
        return(
            <ul className="ask active">
                {items}
            </ul>
        )
    }
}