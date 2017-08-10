import '../css/choose-depart.css';
import React from 'react';
import { $,$Ajax,$Fuck } from '../js/common'
import DepartUl from './choose-depart/depart-ul.jsx'

export default class ChooseDepart extends React.Component{
    state = {
        areaName:$.area,
        org:$.org,
        Act:['active',''],
        bigDepartName:[]
    }
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.chooseArea(0,this.state.org[0],this.state.areaName[0])
    }
    chooseArea(i,org,name){
        let arr=['',''];
        arr[i]='active'
        this.setState({Act:arr});
        localStorage.setItem('org',org);
        localStorage.setItem('orgName',name);
        $Ajax('getYuyueKeshiList',{
            org:org,
        },(data)=>{
            this.setState({bigDepartName:$Fuck(data.obj.dataset.row)})
        })
    }
    chooseDepaet(i,id){
        $Ajax('getYuyueKeshiList',{
            org:localStorage.getItem('org'),
            sectionCode:id,
            deptType:''
        },(data)=>{
            let arr=_this.state.bigDepartName;
            arr[i].small=$Fuck(data.obj.dataset.row);
            this.setState({bigDepartName:arr})
        })
    }
    render(){
        let Depart=this.state.bigDepartName,
            items=Depart.map((item,i)=>{
                return (
                    <div key={item.deptId} className="depart-wrap">
                        <p onClick={this.chooseDepaet.bind(this,i,item.deptId)}>{item.deptName}</p>
                        {item.small && <DepartUl small={item.small} />}
                    </div>
                )
            })
        let area=this.state.areaName,
            org=this.state.org;
        return (<div className="body-wrap P3">      <div className="route-shade"></div>
            <ul id="area">
                <li onClick={this.chooseArea.bind(this,0,org[0],area[0])} className={this.state.Act[0]}>{area[0]}</li>
                <li onClick={this.chooseArea.bind(this,1,org[1],area[1])} className={this.state.Act[1]}>{area[1]}</li>
                <li onClick={this.chooseArea.bind(this,2,org[2],area[2])} className={this.state.Act[2]}>{area[2]}</li>
            </ul>

            <div id="depart">
                <div id="depart-wrap">
                    {items}
                    <footer>
                        <p>{$.hosName}</p>
                        <p>{$.copyright}</p>
                    </footer>
                </div>
            </div>
        </div>)
    }
}