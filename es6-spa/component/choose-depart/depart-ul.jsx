import React from 'react';
import { $Param } from '../../js/common'

export default class DepartUl extends React.Component{
    constructor(props){
        super(props)
    }
    pageGo(deptId){
        this.props.history.push({
            pathname: '/day-order',
            search: '?'+$Param({
                deptId:deptId,
                org:localStorage.getItem('org')
            })
        })
    }
    render(){
        let smallDepart=this.props.small,
            items=smallDepart.map((item,i)=>{
                return (
                    <li key={item.deptId} onClick={this.pageGo.bind(this,item.deptId)}>{item.deptName}</li>
                )
            });
        return(
            <ul className="clearfix">
                {items}
            </ul>
        )
    }
}