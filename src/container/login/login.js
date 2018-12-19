import React from 'react';
import {Redirect} from 'react-router-dom';
import Logo from '../../component/logo/logo';
import {connect} from 'react-redux';
import {login} from '../../redux/user.redux';
import fromInfo from '../../component/from-info/from-info';
import {List, InputItem,WingBlank, WhiteSpace, Button} from 'antd-mobile' 
@connect(
    state=>state.user,
    {login}
)
@fromInfo
class Login extends React.Component{
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
       
    }
    register() {
        this.props.history.push('/register');
    }
    handleLogin() {
        this.props.login(this.props.state)
    }
    render (){
        return (
            <div>
                {(this.props.redirectTo && this.props.redirectTo != '/login') ? <Redirect to={this.props.redirectTo} /> : null}                
                <Logo />
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='err-msg'>{this.props.msg}</p> : null}
                        <InputItem 
                            onChange={v => this.props.handleChange('user',v)}
                        > 用户 </InputItem>
                        <WhiteSpace />
                        <InputItem 
                            type="passworl"
                            onChange={v => this.props.handleChange('pwd',v)}
                        > 密码 </InputItem>
                    </List>
                    <Button onClick={this.handleLogin} type="primary"> 登录 </Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary"> 注册 </Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login