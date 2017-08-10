import React from 'react';

export default class Detail extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
            return(
                <div id="wrap">
                    <ul>
                        <li>
                            <p>姓名：</p>
                            <p className="gray">{this.props.detail.patientName}</p>
                        </li>
                        <li>
                            <p>性别：</p>
                            <p className="gray">{this.props.detail.patientGender}</p>
                        </li>
                        <li>
                            <p>年龄：</p>
                            <p className="gray">{this.props.detail.age}</p>
                        </li>
                        <li>
                            <p>科室：</p>
                            <p className="gray">{this.props.detail.hosSection}</p>
                        </li>
                        <li>
                            <p>入院时间：</p>
                            <p className="gray">{this.props.detail.inDate}</p>
                        </li>
                        <li>
                            <p>出院时间：</p>
                            <p className="gray">{this.props.detail.outDate}</p>
                        </li>
                        <li>
                            <p>可用余额：</p>
                            <p className="red">￥{this.props.detail.hosBalance}</p>
                        </li>
                        <li>
                            <p>住院总费用：</p>
                            <p className="red">￥{this.props.detail.totalFee}</p>
                        </li>
                    </ul>

                    <div id="tip">
                        <p>如需纸质费用清单，请到收费处或自助打印设备进行打印</p>
                    </div>
                </div>
            )
        }
}
