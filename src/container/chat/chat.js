import React from 'react';
import {List, InputItem, NavBar, Icon} from 'antd-mobile';
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux';
import {connect} from 'react-redux';
import { getChatID } from '../../util';
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {text:"",msg:[]}
    }
    componentDidMount(){
        // socket.on('recvmsg',(data)=>{
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // })
        // console.log(this.state)
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        // this.setState({text:""})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({text:""})
    }
    render(){
        const userId = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        const chatid = getChatID(userId, this.props.user._id)
        // console.log(chatid)
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid == chatid)
        console.log(this.props)
        if(!users[userId]){return false;}
        return (
          <div id="chat-page">
            <NavBar  
                mode='dark'
                icon = {<Icon type="left" />}
                onLeftClick={()=>{
                    this.props.history.goBack()
                }}
            >
                {users[userId].name}
            </NavBar>
            <div className="chat-body">
            {chatmsg.map((v,index)=>{
                const avator = require(`../../component/img/${users[v.from].avator}.png`)
                return v.from == userId ? (
                    <List key={index}>
                        <Item
                            thumb={avator}
                        >{v.content}</Item>
                    </List>
                ) : (
                    <List key={index}>
                        <Item
                            extra={<img src={avator} alt="" />}
                            className="chat-me">
                            {v.content}
                        </Item>
                    </List>
                )
                // return <p key={v._id}>{v.content}</p>
            })}
            </div>
            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.text}
                        onChange={v=>{
                            this.setState({text:v})
                        }}
                        extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
                    >
                    </InputItem>
                </List>
            </div>
          </div>
        )
    }
}
export default Chat