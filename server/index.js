const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./user');
const cookieParser = require('cookie-parser');
const model = require('./model');
const Chat = model.getModel('chat');
const app = express()


const server = require('http').Server(app)

const io = require('socket.io')(server)



io.on('connection',(socket)=>{
    socket.on('sendMsg',(data)=>{
        const {from, to, msg} = data.from;
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},(err,doc)=>{
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user',userRouter)


app.get('/',function(req,res){
    res.send('<h1>hello</h1>')
})


server.listen(9093,()=>{
    console.log(1111)
})