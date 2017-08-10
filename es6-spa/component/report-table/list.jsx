import React from 'react';
import { $ } from '../../js/common';

export default class List extends React.Component{
    render(){
        let items=[];
        for(let i=0;i<3;i++){
            items.push(
                <ul className="clearfix">
                    <li style={{color:'#3f9ff3'}}>乙肝表面抗原</li>
                    <li>检查值：16.5</li>
                    <li>单位：kg</li>
                    <li>结果：</li>
                    <li style={{border:'none'}}>参考值：0-1</li>
                </ul>
            )
        }
        return(
            <div id="list">
                {items}
            </div>
        )
    }
}