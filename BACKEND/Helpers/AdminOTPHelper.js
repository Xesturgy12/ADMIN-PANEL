require('dotenv').config()

const adminModel = require('../models/AdminModel')

const nodemailer = require('nodemailer');

const moment = require('moment')

const sender = process.env.MAIL_ID
const sender_pass = process.env.MAIL_PASS


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: sender,
        pass: sender_pass,
          },
    });    


    async function verifyAdminOTPController(req,res){
        const current_user = await adminModel.findOne({email:req.body.email})
        if(current_user){
            try{
                if(current_user?.otp){
                    let current = moment().format()
                    if(current_user.otp == req.body.otp){
                            if(moment(current).isBefore(current_user.otp_expiration_time)){
                            adminModel.updateOne({email:req.body.email},{otp_verified:true},{
                                new: true
                              },(err,docs)=>{
                                if(err) return false
                                else return docs
                            })
                            res.status(200).json({message:'otp verified', verified:true})
                        }
                            else{
                                await adminModel.updateOne({email:req.body.email},{$unset:{email_verified:'', otp:'', otp_verified:'',otp_expiration_time:''}})
                                res.status(400).json({message:'otp expired'})}
                        } 
                    else{
                        res.status(400).json({message:'wrong otp'})}
                } 
                else return res.status(400).json({message:'no otp generated'})
            }
            catch(err){
                res.status(400).json({message:err.message})
            }
        }
    }
    
    
    
async function sendAdminOTPController(req, res) {

        try {
            var userinfo = await verifyEmail(req.body);
            if (userinfo) {
                if(userinfo?.is_admin){

                    let OTP = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

                    let verificationType = 'email';
                    let templateBody = {
                        type: verificationType,
                        OTP: OTP
                        };
                    let emailBody = {
                        recipientsAddress: req.body.email,
                        subject: 'OTP for password reset',
                        body: passwordOTPEmail(templateBody)
                        };

                    let emailInfo = await sendOTPtoEmail(emailBody);
                    if (!emailInfo) {
                        res.status(400).json({message:'failed to send OTP to the requested email, please try again'})
                    } else {
                        
                        try{
                            setopt(userinfo, OTP);
                            res.status(200).json({message:'successfully sent the otp'});
                        }
                        catch(err){
                            res.status(400).json({message:err});
                        }
                    }
                }
                else{
                    res.status(400).json({message:'No such Admin account found'})
                    }
            } else {
                console.log('no such user exists');
                return res.status(400).json({message:'no such user exists'})
            }


        } catch(error) {
            console.log('error sending OTP:',error.message);
            res.status(400).json({message:error})
        }

}




//service
async function verifyEmail(values) {
    var result = await adminModel.findOne({email: values.email});
    
    if (result != null) {
        return result
    } else {
        return false
    }
}



function passwordOTPEmail(data){
    let templateBody = `<h2>You requested for an OTP</h2><br><h3>OTP is ${data.OTP}</h3>
    <br><p>This OTP is valid for approximate 60 seconds before it expires.
    Please do not share this with anyone.</p>`;
    return templateBody;
  }



async function sendOTPtoEmail (emailBody){
    try {
        // send mail with defined transport object
        let emailInfo = {
            from: sender, // sender address
            to: emailBody.recipientsAddress, // list of receivers
            subject: emailBody.subject, // Subject line
            html: emailBody.body
        };
        transporter.sendMail(emailInfo);
        return true;
    }
    catch (error) {
        return error;
    }
}

function setopt(values,otp){

    let toUpdate = {
        otp:otp,
        otp_expiration_time:moment().add(1,'minute').format()
    }

    const doc = adminModel.updateOne({email:values.email},toUpdate,{
        new: true
      },(err,docs)=>{
        if(err) return false
        else return docs
    })
}



module.exports = {verifyAdminOTPController,sendAdminOTPController}