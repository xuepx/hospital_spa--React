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
        type:key,
        value:val
    }
}
/*export function requestPosts() {
    return function (dispatch)  {
        setTimeout(
            () => {dispatch({
                type:"1",
                id:333,
                text:""
            })},2000
        )
    }
}*/