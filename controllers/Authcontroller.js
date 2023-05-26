const User = require("../models/userSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signToken = id=>{
    return jwt.sign({id},'hello world',{
        expiresIn:'1m'
    })
}
 exports.registerUser = async(req,res)=>{
    const {name,email,password} = req.body
    
  try{
    const user = await User.create({name,email,password})
    res.status(201).json({
        status:'success',
        data:user
    })
  }catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                status:"failed",
                message:'user not found'
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                auth:false,
                message:"wrong password"
            })
        }
        const token = signToken(user._id)
        console.log(token)
        return res.status(200).json({
            auth:true,
            message:'login successful',
            token
        })
 
}catch(err){
    console.log(err)
    return res.status(400).json({
        status:"failed",
        message:err.message
    })
}

}

exports.verifyUser = async(req,res,next)=>{
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(400).json({
            status:"failed",
            message:"no token provided"
            })
    }

    try{
     const decoded = jwt.verify(token,'hello world')
        req.user = decoded
        next()

    }catch(err){
        return res.status(403).json({ message: 'Invalid token' });
    }
}

exports.getUsers = async(req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json({
            status:"success",
            no_of_results:users.length,
            data:users
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
}