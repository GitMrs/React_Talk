import axios from 'axios';
const USER_LIST = 'USER_LIST';


const initState = {
    userlist:[]
}

export function chatuser(state = initState, action){
    switch(action.type){
        case USER_LIST:
            state =  {...state, userlist:action.payLoad}
            console.log(state)
            return state
        default:
            return state
    }
}


function userListFn(data){
    return {
        type:USER_LIST,
        payLoad:data
    }
}

export function getUserList(type){
    return dispatch =>{
        axios.get('/user/list?type=' + type)
        .then(res=>{
            if(res.data.code == 0){
                console.log(res.data.msg)
                dispatch(userListFn(res.data.msg))
            }
        })
    }
}




