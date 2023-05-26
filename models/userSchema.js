const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide your name']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'please provide email']
    },password:{
        type:String,
        required:[true,'please provide email']
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified) return next()
    this.password = await bcrypt.hash(this.password,12)
 })

const User = mongoose.model('User',userSchema)

module.exports = User