import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {userInfo} from '../../redux/user.redux';
import {connect} from 'react-redux';
@withRouter
@connect(
    state => state,
    {userInfo}
)
class AuteRoute extends React.Component{
    componentDidMount() {
        //获取用户信息
        const publickList = ['/login','/register'];
        const pathName = this.props.location.pathname;
        if(publickList.indexOf(pathName)> -1){
            return null;
        }
        axios.get('/user/info')
            .then(res => {
                if(res.status==200){
                    if(res.data.code == 0){
                        //有登陆信息
                        this.props.userInfo(res.data.msg)
            console.log(this.props.user)

                    }else{
                        this.props.history.push('/login')
                    }
                }
            })

        //是否登录 
        // 现在url地址， login是不是要跳转 
        // 用户的type身份是boss还是牛人
        // 用户信息是否完善(选择头像 个人简介)
    }
    render() {
        return null
    }

}
export default AuteRoute