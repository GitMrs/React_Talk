import React from 'react';
import {Grid,List} from 'antd-mobile';
import  PropTypes from 'prop-types';


class AuatarSelector extends React.Component{
    static propTypes = {
        selectAvator:PropTypes.func
    }
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        const avatarList = 'boy,girl,woman,man,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                            .split(',')
                            .map(v => ({
                                icon:require(`../img/${v}.png`),
                                text:v
                            }))
        const gridHeader = this.state.text
                            ? 
                            (<div>
                                <span>已选择头像</span>
                                <img style={{width:13}} src={this.state.icon} />
                            </div>)
                            : '请选择头像';
        return (
            <div className="page-content">
                <List renderHeader={()=>gridHeader}>
                    <Grid data={avatarList} columnNum='5' onClick={elm=>{
                        this.setState(elm)
                        this.props.selectAvator(elm.text)
                    }}></Grid>  
                </List>
            </div>
        )
    }
}
export default AuatarSelector;