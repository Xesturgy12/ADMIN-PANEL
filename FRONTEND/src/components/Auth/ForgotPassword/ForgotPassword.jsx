import React, { useState , useEffect } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import './forgotpassword.css'
import { toast , ToastContainer} from 'react-toastify'
import axios from 'axios'


export default function ForgotPassword(params) {
    const {setIsAllowedReset} = params
  const [disabledBtn, setDisabledBtn] = useState(false)
    const [showOTPbox, setshowOTPbox] = useState(false)
    const [disabledInput, setdisabledInput] = useState(false)
    const [otp_user, setotp_user] = useState('')
    const [user_email,setuser_email] = useState('')
    const navigate = useNavigate()
    const [error_msg,setError_msg] = useState('')




    async function formit(){
      if (!user_email) {
        setError_msg('Email is required')
        // errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user_email)) {
        setError_msg('Invalid email address')
        // errors.email = 'Invalid email address';
      }
      else{

        let values = {email:user_email}
        setDisabledBtn(true)
              try {
                let res = await axios.post(`/admin/forgotPassword`, values)
                setshowOTPbox(true)
                setdisabledInput(true)
                setError_msg('')
                setDisabledBtn(false)
                // navigate('/reset')
                
              } catch (errors) {
                console.log(errors)
                toast(errors.response.data.message, {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  type: 'error'
                });
                setDisabledBtn(false)
              }
      }
        }



async function verifyOTP(){
    let values = {email:user_email, otp:otp_user}
    try {
      setDisabledBtn(true)
        let res = await axios.post(`/admin/verifyforgotPassword`, values)
        setDisabledBtn(false)
        if(res.data?.verified)navigate('/reset',{state:{isallowed:res.data.verified, email:user_email}})
      } catch (errors){
        toast(errors.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'error'
        });
        setDisabledBtn(false)
      }
}


  return (
    <div className='hold-transition login-page'>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <div className="login-box">
        <div className="card card-outline card-primary">
            <div className="card-header text-center">
            <h2><b>FORGOT PASSWORD</b></h2>
            </div>
            <div className="card-body">
            <p className="login-box-msg">Please Enter your E-mail to recieve an OTP to reset your password.</p>
            
            <div>
                <div className="input-group mb-3">
                <input type="email" className="form-control" onChange={(e)=>{setuser_email(e.target.value);console.log(e.target.value)}} placeholder="Email" disabled={disabledInput}/>
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                    </div>
                </div>
                </div>
                <div className='text-danger'>{error_msg}</div>
                </div>
            {(showOTPbox)?
                (
                <div>
                    <p className="login-box-msg">Enter the OTP sent to your email</p>
                    <div className="input-group mb-3 w-25 otp_box">
                    <input type="text" maxLength='4' onChange={(e)=>{setotp_user(e.target.value);}} className="form-control otp_input" placeholder="_ _ _ _"/>
                    </div>
                    <button type="button" disabled={disabledBtn} onClick={verifyOTP} className="btn btn-primary btn-block w-50 otp_box">
                    {
                            disabledBtn ? (
                              <div>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                              </div>
                            ) : 'Submit OTP'
                          }
                    </button>
                    <Link onClick={formit} className='otp_box '>resend otp?</Link>
                </div>
                )
            
            :
                (
                    <div className="row">
                    <div className="col-12">
                        <button type="button" disabled={disabledBtn} className="btn btn-primary btn-block" onClick={formit}>
                        {
                            disabledBtn ? (
                              <div>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                              </div>
                            ) : 'Request new password'
                          }
                          </button>
                    </div>
                    </div>
                )
            }
            </div>
                
            <p className="mt-2 mb-2 ml-4">
                <Link to='/login'>Login</Link>
            </p>
        </div>
        </div>
        </div>
  )
}
