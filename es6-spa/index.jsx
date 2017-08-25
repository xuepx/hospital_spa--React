import React,{ PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { $Next,$ } from './js/common';

export default class extends React.Component {
    constructor(){
        super()
        document.title="医依帮"
    }
    jump(){
        $Next()
    }
    render(){
        return (<div className="body-wrap" style={{overflow:"auto"}}> <div className="route-shade"></div>
                <div id="index-nav">
                    <Link to="/depart-list/guahao"  onClick={this.jump.bind(this)} >挂号</Link>
                    <Link to="/query-guahao" onClick={this.jump.bind(this)} >挂号查询与取消</Link>
                    <Link to="/depart-list/chaxun-doc"  onClick={this.jump.bind(this)} >医生信息查询</Link>
                    <Link to="/depart-list/chaxun-dep"  onClick={this.jump.bind(this)} >科室信息查询</Link>
                    <Link to="/hospital-introduce"  onClick={this.jump.bind(this)} >医院介绍</Link>
                    <Link to="/setting"  onClick={this.jump.bind(this)} >设置</Link>
                </div>
            </div>
        );
    }
};
