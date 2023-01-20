const adminModel = require('../models/AdminModel')
const userModel = require('../models/userModel')
const Auth = require('../Helpers/Auth')
const {hashPassword,ComparePassword} = require('../Helpers/BcryptPasswordHashing')
const uploadFunction = require('../Helpers/UploadPhoto')


class AdminServices{

    async LoginAdmin(req,res){
        const request = req.body
        try{
            const result = await adminModel.findOne({email:request.email})
            // console.log('service result',result);

            if(result){
                let passwordmatch = await ComparePassword(request.password,result.password)
                console.log('did match? :',passwordmatch);
                if(passwordmatch === true){
                    if(result.is_admin == true || result.is_sub_admin == true){
                        const id = result._id
                        // console.log(id);
                        Auth.jwtAssignment(req,res,id)
                    }
                    else{
                        res.status(404).json({message:'User Access Denied. You need Admin Access.'})
                    }
                                                            }
                else{
                    res.status(404).json({message:'Wrong password entered'})
                    }
            }
            else{   res.status(404).json({message:'Access Denied'})   }
        }
        catch(err){
            console.log(err);
            res.status(500).json({message:"internal server error"})
        }
    }

          
    async GetUsers(req,res){
        try{
            if(Object.keys(req?.query).length){
                var per_page = parseInt(req.query.perPage) || 1
                var page_no = parseInt(req.query.pageNumber) || 1
                
                var pagination = {
                    limit: per_page ,
                    skip:per_page * (page_no - 1)
                }
        
                let document_count = await userModel.countDocuments({})
        
                if(document_count<=pagination.skip){
                    var users = await userModel.find()
                    .select({email:1,name:1,is_active:1,_id:1,mobileNumber:1})
                    }
                else{
                    var users = await userModel.find()
                    .select({email:1,name:1,is_active:1,_id:1,mobileNumber:1})
                    .limit(pagination.limit)
                    .skip(pagination.skip)
                }


            const response = users.map(user=>{
                    return{
                        userName:user.name,
                        isactive:user.is_active,
                        email:user.email,
                        id:user._id,
                        mobileNumber:user.mobileNumber,
                    }
                })
                res.json({message:response,rowCount:document_count})
            }
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    }


    async resetAdminPassword(req,res){
        console.log(req);
        console.log(req.body);
        const current_user = await adminModel.findOne({email:req.body.email})
        if(current_user){
            if(current_user?.otp_verified){
                let hashedpassword = await hashPassword(req?.body?.password)
                adminModel.updateOne({email:req.body.email},{otp_verified:false, password:hashedpassword},{
                    new: true
                  },(err,docs)=>{
                    if(err) return false
                    else return docs
                })

                //as the OTP has been verified and the user password been reset, remove these fields from document to prevent any security issues
                await adminModel.updateOne({email:req.body.email},{$unset:{email_verified:'', otp:'', otp_verified:'',otp_expiration_time:''}})
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


    async UpdateUser(req,res){
        // get id from parameters
            const id = req?.params?.id
            const to_update = req?.body
            try{
                if(to_update && id){

                    // userName,email,mobileNumber
                    Object.keys(to_update).forEach(key => {
                        if (to_update[key] === '') {
                          delete to_update[key];
                        }
                      });
                      console.log(to_update);
                    await userModel.findByIdAndUpdate(id,to_update)
                    res.status(200).json({message:'successfully updated user information'})
                }
                else{
                    res.status(400).json({message:'please provide user details and id'})
                }
            }
            catch(err){
                res.status(500).json({message:'server error'})
            }
            
    }




    async AddNewUser(req,res){

        const {password , ...rest} = req?.body
        let pass = await hashPassword(password)

        let to_update = {...rest , password:pass }
        console.log(to_update)
        
        if(to_update){

            Object.keys(to_update).forEach(key => {
                if (to_update[key] === '') {
                  delete to_update[key];
                }
              });
            try{
                let user = new userModel(to_update)
                await user.save()
                res.status(202).json({message:'user added successfully'})
            }
            catch(err){
                res.status(500).json({message:err})
            }
    
        }
        else{
            res.status(400).json({message:'bad request'})
        }
    }



    async GetAdminInfo(req,res){
        let admin_id = req.query.id
            try{
                try{
                    let admin_data  = await adminModel.findOne({_id:admin_id}).select({name:1,email:1,profile_img:1})
                    
                    res.json({message:admin_data})
                }
                catch(err){
                    res.status(401).json({message:'unauthorized access'})
                }
            }
            catch(err){
                res.json({message:err.message})
            }
            }


    async EditAdminDetails(req,res){
        let admin_id = req?.params?.id
        
        //url for the server this backend is hosted on
        let url = 'http://localhost:5000//'
        
        let filename = req?.file?.filename
        
        if(admin_id){
            try{
                const update_data =(filename)?{
                        name:req?.body?.name,
                        email:req?.body?.email,
                        profile_img:`${url}${filename}`
                        }
                        :
                        {
                            name:req?.body?.name,
                            email:req?.body?.email,
                        }
                        
                let result = await adminModel.findByIdAndUpdate(admin_id,update_data)

                res.status(201).json({message:'Admin Details updated successfully'})
            }
            catch(err){
                res.status(500).json({message:err.message})
            }
        }
        else{
            res.status(400).json({message:'missing some required parameter'})
        }
    }

}


module.exports = new AdminServices()