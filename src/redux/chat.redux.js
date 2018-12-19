import axios from 'axios';

import io from 'socket.io-client';
const socket = io('ws://localhost:9093')

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'



const initState = {
    chatmsg:[],
    users:{},
    unread:0
}


export function chat(state = initState, action){
    switch(action.type){
        case MSG_LIST:
            return {...state,chatmsg:action.payLoad.msg,users:action.payLoad.users,unread:action.payLoad.msg.filter(v=> !v.unread && v.to ==action.payLoad.userid).length};
        case MSG_RECV:
            const n = action.payLoad.to == action.payLoad.userid ? 1 : 0;
            return {...state,chatmsg:[...state.chatmsg,action.payLoad],unread:state.unread + n};
        // case MSG_RECV:
        //     return ;
        default: 
            return state
    }
}
function getList(msg,users,userid){
    let state = {type:MSG_LIST,payLoad:{msg,users,userid}}
    console.log(state)
    return state
}
function msgRecv({data,userid}){
    console.log(data)
    return {type:MSG_RECV,payLoad:{data,userid}}
}
export function getMsgList(){
    return (dispatch, getState) => {
        axios.get('/user/getMsgList')
            .then((res)=>{
                if(res.data.code == 0 ){
                    const userid = getState().user._id
                    dispatch(getList(res.data.msg,res.data.users,userid))
                }
            })
    }
}
export function sendMsg(from,to,msg){
    return dispatch => {
        socket.emit('sendMsg',{from,to,msg})
    }
}
export function recvMsg(){
    return (dispatch, getState) => {
        socket.on('recvmsg',(data)=>{
            console.log(data)
            const userid = getState().user.id
            dispatch(msgRecv(data,userid))
        })
    }
}