import React,{ PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as action from './store/actions';
import { $Next,$ } from './js/common';

export default class extends React.Component {
    constructor(props){
        super(props)
    }
    jump(){
        $Next()
    }
    render(){
        return (<div className="body-wrap" style={{overflow:"auto"}}> <div className="route-shade"></div>
                <div id="index-nav">
                    <Link to="/depart-list/guahao"  onClick={this.jump.bind(this)} >挂号</Link>
                    <Link to="/query-guahao" onClick={this.jump.bind(this)} >挂号查询与取消</Link>
                    <Link to="/depart-list/chaxun"  onClick={this.jump.bind(this)} >科室信息查询</Link>
                </div>
            </div>
        );
    }
};
