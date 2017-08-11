import { combineReducers } from 'redux'

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

const loginInformation = (state={
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
        stayDetai:"",
        tel:"",
        code:"",
        password:""
    }, action) => {
    return {
        ...state,
        [action.type]:action.value
    }
}

const todoApp = combineReducers({
    routecss,
    loginInformation
})  

export default todoApp;