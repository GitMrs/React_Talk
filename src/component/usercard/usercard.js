import React from 'react';
import {withRouter} from 'react-router-dom';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import PropTypes from 'prop-types';
@withRouter
class UserCard extends React.Component{
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                {this.props.userlist.map(v => (
                    v.avator ? (
                        <Card 
                            key={v._id}
                            onClick={()=>this.handleClick(v)}>
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avator}.png`)}
                            extra={<span>{v.title}</span>}
                        ></Header>
                    <Body>
                        {v.desc.split('\n').map(v => (
                            <span key={v}>v</span>
                        ))}
                    </Body>
                    </Card>) : null 
                ))}
            </WingBlank>
        )
    }
}
export default UserCard;

