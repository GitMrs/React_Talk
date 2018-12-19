import React from 'react';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import AuatarSelector from '../../component/AuatarSelector/AuatarSelector';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {update} from '../../redux/user.redux';
@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            avator:'',
            title:'',
            company:'',
            money:'',
            desc:''
        }
    }
    onChange(key,val) {
        this.setState({
            [key]:val
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && path !== redirect ? <Redirect to ={this.props.redirectTo} ></Redirect> : null}
               <NavBar mode='dark'>
                    牛人完善信息页
                </NavBar> 
                <AuatarSelector selectAvator={(imageName) => {
                    this.setState({
                        avator:imageName
                    })
                    // console.log(this.state)
                }}></AuatarSelector>
                <InputItem
                    onChange = {v => this.onChange('title',v)} 
                >求职职位</InputItem>
                <TextareaItem
                    rows="3"
                    autoHeight
                    title="个人简介"
                    onChange = {v => this.onChange('desc',v)} 
                ></TextareaItem>
                <Button 
                    onClick={()=>{
                        this.props.update(this.state)
                    }} 
                    type="primary">保存</Button>
            </div>
        )
    }
}
export default GeniusInfo;