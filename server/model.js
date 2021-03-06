const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/chat';

const models = {
    user:{
        "user":{type:String,require:true},
        "pwd":{type:String,require:true},
        "type":{type:String,require:true},
        //头像
        "avator":{type:String},
        //简介
        "desc":{type:String}, 
        //职位
        "title":{type:String},
        //如果是boss 
        "company":{type:String},
        "money":{type:String}
    },
    chat:{
        "chatid":{type:String,require:true},
        "from":{type:String,require:true},
        "to":{type:String,require:true},
        "read":{type:Boolean,default:false},
        "content":{type:String,require:true,default:""},
        "create_time":{type:Number,default:new Date().getTime()}
    }
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name) {
        return mongoose.model(name)
    }
}

mongoose.connect(DB_URL, { useNewUrlParser: true });
