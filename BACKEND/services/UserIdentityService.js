const Auth = require('../Helpers/Auth')
const userModel = require('../models/userModel')


class User{

    async Adduser(req,res){
        Auth.jwtAssignment(req,res)
        const request = req.body
        if(request){

            const newUser = new userModel({
                name:request.name,
                email:request.email,
                password:request.password
            })
            try{
                Auth.jwtAssignment(request,res)
                await newUser.save()

            }
            catch(err){
                res.json({message:err})
            }
        }
        else return res.json({error:'invalid request parameters'})

    }

    async Removeuser(req,res){
        try{
            await userModel.deleteOne({_id:req.params.id})
            res.json({message:'successfully removed user'})
        }
        catch(err){
            res.status(500).json({message:err})
        }
    }


    async LoginUser(req,res){
        const request = req.body
        try{
            const result = await userModel.findOne({email:request.email})

            if(result){

                if(result.password != request.password)
                    {res.status(404).json({message:'Wrong password entered'})}
                else
                    {await userModel.updateOne({email:request.email},{is_active:true})
                    const id = result._id
                     Auth.jwtAssignment(req,res,id)}
            }
            else{   res.status(404).json({message:'No such user exists'})   }
        }
        catch(err){
            res.status(500).json({message:err})
        }
    }

    async LogOutUser(req,res){
        const request = req.body
        try{
            const result = await userModel.findOne({email:request.email})
            if(result){
                if(result?.is_active){
                    await userModel.updateOne({email:request.email},{is_active:false})
                    res.status(200).json({message:'logged out successfully'})
                }
                else{
                    res.status(400).json({message:'user is already logged out'})
                }
            }
            else{   res.status(404).json({message:'No such user exists'})   }
        }
        catch(err){
            res.status(500).json({message:"internal server error"})
        }
    }


    async IsValiduser(req){

        //requires email for validation 
        const found = await userModel.findOne({email:req.body.email})
        if(found) return true
        else return false
      }


    async resetPassword(req,res){
        console.log(req);
        console.log(req.body);
        const current_user = await userModel.findOne({email:req.body.email})
        if(current_user){
            if(current_user?.otp_verified){
                userModel.updateOne({email:req.body.email},{otp_verified:false, password:req.body.password},{
                    new: true
                  },(err,docs)=>{
                    if(err) return false
                    else return docs
                })
                
                //as the OTP has been verified and the user password been reset, remove these fields from document to prevent any security issues
                await userModel.updateOne({email:req.body.email},{$unset:{email_verified:'', otp:'', otp_verified:'',otp_expiration_time:''}})
                res.status(200).json({message:'password has been reset'})
            }
            else{
                res.status(400).json({message:'verify the OTP first'})
            }
        }
        else{
            res.status(400).json({message:'no such user exists'})
        }
    }

}


module.exports = new User()