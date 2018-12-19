import React from 'react';
import {Redirect} from 'react-router-dom';
import Logo from '../../component/logo/logo';
import fromInfo from '../../component/from-info/from-info';
import {List, InputItem,WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile' 
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';

@connect(
    state => state.user,
    {register}
)
@fromInfo
class Register extends React.Component{
    constructor(props){
        super(props)
        this.register = this.register.bind(this)
    }
    componentDidMount(){
        this.props.handleChange("type","genius")
    }
    register() {
        console.log(this.props.props)
        this.props.register(this.props.state)
    }
    render (){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                <List>
                    {this.props.msg ? <p className='err-msg'>{this.props.msg}</p> : null}
                    <InputItem
                     onChange = {v => this.props.handleChange('user',v)}
                    >用户名</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type="password"
                        onChange = {v => this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type="password"
                        onChange = {v => this.props.handleChange('repeatpwd', v)}
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem
                        onChange = {v => this.props.handleChange('type','genius')} 
                        checked = {this.props.state.type === 'genius'}>牛人</RadioItem>
                    <WhiteSpace />
                    <RadioItem 
                        onChange = {v => this.props.handleChange('type','boss')} 
                        checked = {this.props.state.type === 'boss'}>老板</RadioItem>
                </List>
                <Button type='primary' onClick = {this.register} >注册</Button>
            </div>
        )
    }
}
export default Register