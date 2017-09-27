import { combineReducers } from 'redux'
import { $parseDate } from '../js/common'

const routecss = (state="left", action) => {
    switch (action.type) {
        case 'left':
            return "left"
        case 'right':
            return "right"
        default :
            return state
    }
}

const loginInf = (state={
        name:"",
        birth:"请选择生日",
        sex:"请选择性别",
        marry:"请选择婚姻状况",
        identity:{
            value:"请选择证件类型",
            id:NaN
        },
        idNum:"",
        stay:"",
        province:{
            value:"---选择省---",
            id:NaN
        },
        city:{
            value:"---选择市---",
            id:NaN
        },
        county:{
            value:"---选择县/辖区---",
            id:NaN
        },
        tel:"",
        code:"",
        password:""
}, action) => {
    switch(action.type) {
        case "degister":
            return {
                ...state,
                [action.key]:action.value
            }
        default :
            return state
    }
}

const guahaoInf = (state={
    time:guahaoInf.tomorrow(),
    departId:""
},action) => {
    switch(action.type) {
        case "guahao":
            return {
                ...state,
                [action.key]:action.value
            }
        default :
            return state
    }
}
guahaoInf.tomorrow = () => {
    let date = new Date();
    date.setDate(date.getDate()+1);
    return $parseDate(date)
}

const todoApp = combineReducers({
    routecss,
    loginInf,
    guahaoInf
})  

export default todoApp;