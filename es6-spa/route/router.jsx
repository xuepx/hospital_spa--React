import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { HashRouter as Router,Route } from 'react-router-dom'
import { Provider,connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as action from '../store/actions'

import Index from '../index.jsx';
import AddPatient from '../component/add-patient.jsx';
import ChooseDepart from '../component/choose-depart.jsx';
import ChoosePatient from '../component/choose-patient.jsx';
import ConfirmPatient from '../component/confirm-patient.jsx';
import DayOrder from '../component/day-order.jsx';
import HospitalizationPay from '../component/hospitalization-pay.jsx';
import InhospitalPayrecord from '../component/inhospital-payrecord.jsx';
import InhospitalRecord from '../component/inhospital-record.jsx';
import InputPrice from '../component/input-price.jsx';
import OrderDetail from '../component/order-detail.jsx';
import OrderRecord from '../component/order-record.jsx';
import OutpatientsPay from '../component/outpatients-pay.jsx';
import PatientDetail from '../component/patient-detail.jsx';
import PayRecord from '../component/pay-record.jsx';
import PicVisit from '../component/pic-visit.jsx';
import QueryList from '../component/query-list.jsx';
import QueryType from '../component/query-type.jsx';
import ReportTable from '../component/report-table.jsx';
import SearchReport from '../component/search-report.jsx';
import DepartList from '../component/depart-list.jsx';
import DoctorList from '../component/doctor-list.jsx';
import HospitalIntroduce from '../component/hospital-introduce.jsx';
import Register from '../component/login/register.jsx';

@connect (
    state => state,
    dispatch => bindActionCreators(action, dispatch)
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
                                <Route location={location} path="/add-patient" component={AddPatient}/>
                                <Route location={location} path="/choose-depart" component={ChooseDepart}/>
                                <Route location={location} path="/choose-patient" component={ChoosePatient}/>
                                <Route location={location} path="/confirm-patient" component={ConfirmPatient}/>
                                <Route location={location} path="/day-order" component={DayOrder}/>
                                <Route location={location} path="/hospitalization-pay" component={HospitalizationPay}/>
                                <Route location={location} path="/inhospital-payrecord" component={InhospitalPayrecord}/>
                                <Route location={location} path="/inhospital-record" component={InhospitalRecord}/>
                                <Route location={location} path="/input-price" component={InputPrice}/>
                                <Route location={location} path="/order-detail" component={OrderDetail}/>
                                <Route location={location} path="/order-record" component={OrderRecord}/>
                                <Route location={location} path="/outpatients-pay" component={OutpatientsPay}/>
                                <Route location={location} path="/patient-detail" component={PatientDetail}/>
                                <Route location={location} path="/pay-record" component={PayRecord}/>
                                <Route location={location} path="/pic-visit" component={PicVisit}/>
                                <Route location={location} path="/query-list" component={QueryList}/>
                                <Route location={location} path="/query-type" component={QueryType}/>
                                <Route location={location} path="/report-table" component={ReportTable}/>
                                <Route location={location} path="/search-report" component={SearchReport}/>
                                <Route location={location} path="/depart-list" component={DepartList}/>
                                <Route location={location} path="/doctor-list" component={DoctorList}/>
                                <Route location={location} path="/hospital-introduce" component={HospitalIntroduce}/>
                                <Route location={location} path="/register" component={Register}/>
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