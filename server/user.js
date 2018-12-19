const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {'pwd':0,'__v':0}
// Chat.remove({},()=>{

// })
// User.remove({},()=>{

// })
Router.get('/lists',function(req,res){
    Chat.find({},function(err,doc){
     return  res.json(doc)
    })
    // console.log(type)
})
Router.get('/list',function(req,res){
    const {type} = req.query
    User.find({type:type},function(err,doc){
        if(err){
            return res.json({code:1,msg:"数据库出错"})
        }else{
            return res.json({code:0,msg:doc})
        }
    })
    console.log(type)
})

Router.get('/getMsgList',function(req,res){
    const userId = req.cookies.userId;
    console.log(userId)
    User.find({},function(e,userDoc){
        let users = {};
        userDoc.forEach(v=>{
            users[v._id] = {name:v.user,avator:v.avator}
        })
        Chat.find({"$or":[{from:userId},{to:userId}]},function(err,doc){
            if(!err){
                return res.json({code:0,msg:doc,users:users})
            }
        })
    })
    
})

Router.post('/updata',function(req, res){
    const userId = req.cookies.userId;
    if(!userId){
        return res.json({code:1})
    }
    const body = req.body;
    User.findByIdAndUpdate(userId,body,function(err,doc){
        if(err){
            return res.json({code:1,msg:'数据库出错'})
        }else{
            const data = Object.assign({},{
                user:doc.user,
                type:doc.type
            },body)
            return res.json({code:0,msg:data})
        }
    })
})
Router.post('/login',function(req,res){
    const {user,pwd} = req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err, doc){
        console.log(doc)
        if(!doc){
            return res.json({code:1,msg:"用户名或者密码错误"})
        }else{
            res.cookie('userId',doc._id)
            return res.json({code:0,msg:doc})
        }
    })
})

Router.post('/register',function(req, res){
    const {user, pwd, type } = req.body
    console.log(user)
    User.find({user},function(err,doc){
        console.log(doc)
        if(doc.length !=0 ){
            return res.json({code:1,msg:"用户名重复"})
        }

        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(err,doc){
            if(err) {
                return res.json({code:1,msg:"数据库出错"})
            }
            console.log(doc)
            const {user, type, _id} = doc;
            res.cookie('userId',_id)
            return res.json({code:0,msg:{user, type, _id}})
        })
    })
})
Router.get('/info',function(req, res){
    //用户cookie
    const {userId} = req.cookies

    if(!userId) {
        return res.json({code:1})
    }
    User.findOne({_id:userId},_filter ,function(err, doc){
        if(err){
            return res.json({code:1,msg:'数据库出错'})
        }
        if(doc){
            return res.json({code:0,msg:doc})
        }
    })
})

//加盐

function md5Pwd(pwd){
    const url = 'react-lis-yhauj-2515-#!#';
    return utils.md5(utils.md5(pwd+url))
}


module.exports = Router;