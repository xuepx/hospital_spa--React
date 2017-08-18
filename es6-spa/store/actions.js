import { $parseDate } from '../js/common'

export const pageGo = () => {
    return {
        type:'left'
    }
}
export const pageBack = () => {
    return {
        type:'right'
    }
}
export const setInf = (key,val) => {
    return {
        type:"degister",
        value:val,
        key:key
    }
}

export const guahao = (key,val) => {
    if(key=="time"){
        let date = new Date();
        date.setTime(val);
        val = $parseDate(date)
    }
    return {
        type:"guahao",
        value:val,
        key:key
    }
}