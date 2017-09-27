import '../../css/alert.css';
import React from 'react';
import { $,$Next } from '../../js/common'

export default class extends React.Component{
    render() {
        let cssObj = {};
        if(!this.props.no){
            cssObj = {
                width:"100%",
                borderLeft:"none"
            }
        }
        return (<div className="alert-shade">
            <div id="alert-wrap">
                <h3>{this.props.title || "提示"}</h3>
                <p>{this.props.content}</p>
                <ul>
                    {
                        this.props.no &&
                        <li onClick={this.props.no}>取消</li>
                    }
                    <li id="alert-true" onClick={this.props.yes} style={cssObj}>确认</li>
                </ul>
            </div>
        </div>)
    }
}