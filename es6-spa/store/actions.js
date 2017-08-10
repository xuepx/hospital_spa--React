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
/*export function requestPosts() {
    return function (dispatch)  {
        setTimeout(
            () => {dispatch({
                type:"ADD_TODO",
                    id:333,
                    text:"思思"
            })},2000
        )
    }
}

export function begin() {
    return {
        type:"ADD_TODO",
        id:1,
        text:"哦？"
    }
}
*/