import '../../css/register.css';
import React from 'react';
import scroll from 'iscroll';
import Picker from 'better-picker'
import { $,$Ajax,$Param,$Next } from '../../js/common'

let iScroll;

export default class Register extends React.Component{
    componentDidMount(){
        iScroll = new scroll('#ul-wrapper',{click:true})
        let pos = this.refs.position;

        var data1 = [
            {
                text: '小美',
                value: 1
            }, {
                text: '猪猪',
                value: 2
            }
        ];

        var data2 = [
            {
                text: '张三',
                value: 1
            },
            {
                text: '李四',
                value: 2
            },
            {
                text: '王五',
                value: 3
            },
            {
                text: '赵六',
                value: 4
            },
            {
                text: '吴七',
                value: 5
            },
            {
                text: '陈八',
                value: 6
            },
            {
                text: '杜九',
                value: 7
            },
            {
                text: '黄十',
                value: 8
            },
            {
                text: '呵呵',
                value: 9
            },
            {
                text: '哈哈',
                value: 10
            },
            {
                text: '嘿嘿',
                value: 11
            },
            {
                text: '啦啦',
                value: 12
            }
        ];

        var data3 = [
            {
                text: '开心',
                value: 1
            }, {
                text: '生气',
                value: 2
            },
            {
                text: '搞笑',
                value: 3
            }, {
                text: '难过',
                value: 4
            }
        ];

        var picker = new Picker({
            data: [data1, data2, data3],
            selectedIndex: [0, 1, 2],
            title: '我们都是小学生'
        });

        picker.on('picker.select', function (selectedVal, selectedIndex) {
            pos.innerText = data1[selectedIndex[0]].text + ' ' + data2[selectedIndex[1]].text + ' ' + data3[selectedIndex[2]].text;
        })

        picker.on('picker.change', function (index, selectedIndex) {
            console.log(index);
            console.log(selectedIndex);
        });

        picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
            console.log(selectedVal);
            console.log(selectedIndex);
        });

        pos.addEventListener('click', function () {
            picker.show();
        });
    }
    render() {
        return (<div className="body-wrap P23">
            <div id="ul-wrapper">
                <ul className="scroll">
                    <div>
                        <li>
                            <p>姓名</p>
                            <input placeholder="请输入姓名"/>
                        </li>
                        <li className="choose">
                            <p>性别</p>
                            <span>请选择</span>
                        </li>
                        <li className="choose">
                            <p>生日</p>
                            <span>请选择</span>
                        </li>
                        <li className="choose">
                            <p>证件类型</p>
                            <span>请选择</span>
                        </li>
                        <li>
                            <p>证件号码</p>
                            <input placeholder="请输入证件号码"/>
                        </li>
                        <li className="choose">
                            <p>现居住</p>
                            <span ref="position">请选择</span>
                        </li>
                        <li>
                            <p>详细地址</p>
                            <input placeholder="请填写详细地址"/>
                        </li>
                    </div>
                    <div>
                        <li>
                            <p>手机号</p>
                            <input placeholder="请输入手机号"/>
                        </li>
                        <li>
                            <input placeholder="请输入验证码"/>
                        </li>
                    </div>
                </ul>
            </div>
            <a href="javascripy:;" id="submit">立即注册</a>
        </div>)
    }
}