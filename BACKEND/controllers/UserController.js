const IdentityService = require('../services/UserIdentityService')


class Controller{

    SignUp = async(req,res)=>{
        if(await IdentityService.IsValiduser(req,res)){
            console.log(IdentityService.IsValiduser(req,res));
            return res.status(400).json({message:'user already exists'})
        }
        IdentityService.Adduser(req,res)
    }

    Remove = (req,res)=>{
        IdentityService.Removeuser(req,res)
    }

    Login = (req,res)=>{
        IdentityService.LoginUser(req,res)
    }

    GetUsers = (req,res)=>{
        IdentityService.GetUsers(req,res)
    }

    CheckEmail = (req,res,next)=>{
        IdentityService.checkEmail(req,res,next)
    }

    ResetPassword = (req,res)=>{
        IdentityService.resetPassword(req,res)
    }

    LogOut = (req,res)=>{
        IdentityService.LogOutUser(req,res)
    }
}

module.exports = new Controller()