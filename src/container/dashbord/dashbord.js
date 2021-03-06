import React from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import {Switch,Route} from 'react-router-dom';
import {getMsgList, recvMsg} from '../../redux/chat.redux'
import NavLinkBar from '../navLink/navLink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import Msg from '../../component/msg/msg';
import User from '../../component/user/user';
@connect(
    state=>state,
    {getMsgList,recvMsg}
)
class Dashbord extends React.Component{
    componentDidMount(){
        // if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        // }
        console.log(this.props)
    }
    render(){
        const {pathname} = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path:"/boss",
                text:"牛人",
                icon:"boss",
                title:"牛人列表",
                component:Boss,
                hide:user.type == 'genius'
            },
            {
                path:"/genius",
                text:"boss",
                icon:"job",
                title:"Boss列表",
                component:Genius,
                hide:user.type == 'boss'
            },
            {
                path:"/msg",
                text:"msg",
                icon:"msg",
                title:"消息",
                component:Msg,
            },
            {
                path:"/me",
                text:"我",
                icon:"user",
                title:"个人中心",
                component:User,
            } 
        ]
        console.log(this.props)
        return(
            <div>
                <NavBar className='fixd-header' mode="dard">{navList.find(v=>v.path==pathname).title}</NavBar>
                <div style= {{marginTop:45}}>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}
export default Dashbord