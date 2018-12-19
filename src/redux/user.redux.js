import axios from 'axios';
import {getRedirectPath} from '../util';


// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOGO_OUT = 'LOGO_OUT';
//reducer



const initState = {
    redirectTo:'',
    msg:'',
    pwd:'',
    type:''
}

export function user(state = initState, action) {
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payLoad),...action.payLoad}
        case LOAD_DATA:
            return {...state, ...action.payLoad}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOGO_OUT:
            return {...initState,redirectTo:"/login"}
        default:
            return state
    }
    return state
}

function errorMsg(msg) {
    return {
        msg,
        type: ERROR_MSG
    }
}
// function registerSuccess(data){
//     return {
//         type:"REGISTER_SUCCESS",
//         payLoad:data
//     }
// }
// function loginSuccess(data) {
//     return {
//         type:"LOGIN_SUCCESS",
//         payLoad:data
//     }
// }
function autoSuccess(data){
    return {
        type:AUTH_SUCCESS,
        payLoad:data
    }
}
function loadData(userInfo) {
    return {
        type:LOAD_DATA,
        payLoad:userInfo
    }
}
export function update(data) {
    return dispatch => {
        axios.post('/user/updata',data)
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    console.log(res.data)
                    dispatch(autoSuccess(res.data.msg))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function login({user,pwd}) {
    if(!user || !pwd){
        return errorMsg('请输入用户名或者密码')
    }
    return dispatch => {
        axios.post('/user/login', {
                user,
                pwd
            })
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    console.log(res.data)
                    dispatch(autoSuccess(res.data.msg))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function userInfo(userData) {
    return dispatch => {
            dispatch(loadData(userData))           
        }
}
export function register({
    user,
    pwd,
    repeatpwd,
    type
}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名不能为空')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码输入不一致')
    }

    return dispatch => {
        axios.post('/user/register', {
                user,
                pwd,
                type
            })
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(autoSuccess({user,pwd,type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}
export function logoutSubmint(){
   return {type:LOGO_OUT}
}