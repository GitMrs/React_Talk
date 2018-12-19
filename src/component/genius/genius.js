import React from 'react';
import {getUserList} from '../../redux/chatuser.redux';
import { connect } from 'react-redux';
import UserCard from '../usercard/usercard';
@connect(
    state => state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    componentDidMount(){
        const path = this.props.location.pathname
        this.props.getUserList('boss')
    }
    render(){
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}
export default Boss;