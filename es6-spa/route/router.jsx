import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { HashRouter as Router,Route } from 'react-router-dom'
import { Provider,connect } from 'react-redux'
import * as action from '../store/actions'

import Index from '../index.jsx';
import GuahaoByTime from '../component/guahao-by-time.jsx';
import GuahaoConfirm from '../component/guahao-confirm.jsx';
import QueryGuahao from '../component/query-guahao.jsx';
import PicVisit from '../component/pic-visit.jsx';
import DepartList from '../component/depart-list.jsx';
import DoctorList from '../component/doctor-list.jsx';
import HospitalIntroduce from '../component/hospital-introduce.jsx';
import RegisterInput from '../component/login/register-input.jsx';
import RegisterConfirm from '../component/login/register-confirm.jsx';

@connect (
    state => {return {routecss:state.routecss} } 
)
class Main extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        const { store } = this.props
        return (
            <Router hashType="noslash">
                <Provider store={store}>
                <Route render={({ location }) => {
                    return(
                        <ReactCSSTransitionGroup transitionName={this.props.routecss}>
                            <div key={location.pathname} name={location.pathname}  style={{height:"100%",width:"100%",position:"absolute"}}>
                                <Route location={location} exact path="/" component={Index}/>
                                <Route location={location} path="/guahao-by-time" component={GuahaoByTime}/>
                                <Route location={location} path="/guahao-confirm" component={GuahaoConfirm}/>
                                <Route location={location} path="/query-guahao" component={QueryGuahao}/>
                                <Route location={location} path="/depart-list/:type" component={DepartList}/>
                                <Route location={location} path="/doctor-list" component={DoctorList}/>
                                <Route location={location} path="/hospital-introduce" component={HospitalIntroduce}/>
                                <Route location={location} path="/register-input" component={RegisterInput}/>
                                <Route location={location} path="/register-confirm" component={RegisterConfirm}/>
                                <Route location={location} path="/pic-visit" component={PicVisit}/>
                            </div>
                        </ReactCSSTransitionGroup>
                    )
                }}/>
                </Provider>
            </Router>
        )
    }
}

export default Main ;