const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
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
    is_admin: {
        type: Boolean,
        trim: true,
        default: false
    },
    is_sub_admin: {
        type: Boolean,
        trim: true,
        default: false
    },
    profile_img:{
        type:String,
        default:"http://localhost:5000//admin_default.jpg"
    },
})


module.exports = new mongoose.model('Admins', AdminSchema)