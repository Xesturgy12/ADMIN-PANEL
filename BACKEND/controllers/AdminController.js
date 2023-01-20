// const UserIdentityService = require('../services/UserIdentityService')
const AdminModel = require('../models/AdminModel')
const AdminServices = require('../services/AdminServices')
const IdentityService = require('../services/UserIdentityService')


class AdminController{
    
    // Remove = (req,res)=>{
    //     IdentityService.Removeuser(req,res)
    // }

    Login = (req,res)=>{
        AdminServices.LoginAdmin(req,res)
    }

    GetUsers = (req,res)=>{
        AdminServices.GetUsers(req,res)
        
    }

    // CheckEmail = (req,res,next)=>{
    //     IdentityService.checkEmail(req,res,next)
    // }

    // ResetPassword = (req,res)=>{
    //     UserIdentityService.resetPassword(req,res)
    // }
    
    ResetPassword = (req,res)=>{
        AdminServices.resetAdminPassword(req,res)
    }

    UpdateUser = async(req,res)=>{
            let response = await IdentityService.IsValiduser(req,res)
            if(response){
                res.status(400).json({message:'user already exists'})
            }
            else{
                AdminServices.UpdateUser(req,res)
            }
        
    }


    
    UpdateAdmin = async(req,res)=>{
        console.log('inside admin controller');

        // let response = await IdentityService.IsValiduser(req,res)
        // console.log(req?.params?.id);
        let response = await AdminModel.findOne({_id:req?.params?.id})

        if(response){
            // console.log(req);
            console.log('response got');
            // AdminServices.UpdateAdmin(req,res)
            AdminServices.EditAdminDetails(req,res)

        }
        else{
            res.status(400).json({message:'no such user exists'})
        }
    
}



    AddNewUser = async(req,res)=>{
            let response = await IdentityService.IsValiduser(req,res)
            if(response){
                res.status(400).json({message:'user already exists'})
            }
            else{
                AdminServices.AddNewUser(req,res)
            }
    }


    GetAdminInfo = async(req,res)=>{
            AdminServices.GetAdminInfo(req,res)
    }

    EditAdminDetails = async(req,res)=>{
        AdminServices.EditAdminDetails(req,res)
    }

}

module.exports = new AdminController()