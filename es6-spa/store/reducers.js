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

const todoApp = combineReducers({
    routecss
})

export default todoApp;