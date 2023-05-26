const express = require('express')
const jwt =  require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRoute')
const port = 7000
const app = express()
app.use(express.json())
app.use(cors())
app.use(userRouter)
mongoose.connect('mongodb+srv://shaikahmadpasha8798:admin123@cluster0.wdjqjee.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('database connected'))
.catch((err)=>console.log(err))

app.listen(port,()=>{
    console.log(`app listening at port ${port}`)
})



