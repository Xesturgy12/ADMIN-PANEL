const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNumber:Number,
    avatar:{
        type:String,
        default:'avatar.png'
    },
    email_verified: {
        type: Boolean,
        trim: true,
        default: false
    },
    otp: {
        type: String,
        default: ''
    },
    otp_expiration_time: {
        type: Date
    },
    otp_verified: {
        type: Boolean,
        trim: true,
        default: false
    },
    is_active:{
        type: Boolean,
        trim: true,
        default: true
    }
})


module.exports = new mongoose.model('User', UserSchema)