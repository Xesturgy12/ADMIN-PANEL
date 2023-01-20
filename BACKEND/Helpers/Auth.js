

require('dotenv').config()
const jwt = require('jsonwebtoken')



class Auth {
  
  //Creates a JWT with 10h expiration time, after which verifying JWT will result in error
  jwtAssignment(req,res,id){
        console.log("email is", req.body.email);
        //do change the expiration date
        jwt.sign({email:req.email},process.env.JWT_SECRET_KEY,{expiresIn:'2hr'},(err,token)=>{
          if(err)return res.status(500).json({
            status: false,
            message: "Server Error"
          })
          console.log('token: ',token);
          console.log('user_id: ',id);
          return res.status(202).json({token:token, usr_id:id})
        })
      }


  //Verifies the JsonWebtoken
  async jwtAuthorization(req,res,next){
    // console.log(req.headers);
    const bearerHeader = await req.headers['authorization']
    const bearerToken = bearerHeader && bearerHeader.split(" ")[1]
    // console.log('bearer token : ',bearerToken);

    try{
      jwt.verify(bearerToken,process.env.JWT_SECRET_KEY,(err,data)=>{

        if(err) return res.status(400).json({message:err.message})
        // console.log('token accepted');
        return next()
      })
    }
      catch(err){
        res.status(500).json({message:err.message})
        // console.log('err2',err.message);
      }
    }
  


  async Authentication(req,res){
    //get the password from request body and encrypt it
    const Password = Encrypt(req.body.password)

    //check if there exists such user with email and password
    const isValid = await UserModel.find({password:Password, email:req.body.email})

    if(isValid.length > 0){

        return Authorization(isValid[0].email,res)
    }
    return res.json({message:'no such user found'})

  }
        
}

module.exports = new Auth()