import React , { useEffect , useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useLocation , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast , ToastContainer} from 'react-toastify'
import { useFormik } from 'formik';

export default function resetPassword() {
    
    const location = useLocation();
    const [resetSuccessful, setResetSuccessful] = useState(false)
    const navigate = useNavigate();

    //get the state from previous component which passed it as a prop in useNavigate
    const user_email = location.state?.email


    const validate = values => {
        const errors = {};
    
        if (!values.password) {
          errors.password = 'password cannot be empty';
        }
        return errors;
      };
    
      const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },validate,
        onSubmit: async (values) => {
          try {
            let res = await axios.post('/admin/resetPassword', {
                password : values.password , 
                email : user_email ,    
            })
            setResetSuccessful(true)
            
          } catch (errors) {
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
          }
        },
      });
    

    

    useEffect(() => {
        if (location.state?.isallowed == null){
        navigate('/login')
        }
        else{
            null
        }
    },[])

    if(location.state?.isallowed)
    {
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
                
              <div className="card card-outline card-info">
              <div className="card-header text-center">
                    <h2><b>RESET PASSWORD</b></h2>
              </div>
                {
                    (resetSuccessful)?(
                        <div className="card-header text-center">
                            <h2>Password has been reset successfully.</h2>
                            <Link to='/login'>Go to login page</Link>
                        </div>
                    ):(
                    <div className="card-body">
                    <p className="login-box-msg">Enter your new password</p>
                    <form onSubmit={formik.handleSubmit} method="post">
                      <div className="input-group mb-3">
                      <input type='text'
                      autoComplete='off'
                      className="form-control"
                      name='password'
                      placeholder="password" 
                      onChange={formik.handleChange} />

                      <div className="input-group-append">
                          <div className="input-group-text">
                          <span className="fas fa-eye"></span>
                          </div>
                      </div>
                      </div>
                      <div className="row">
                      <div className="col-12">
                          <button type="submit" className="btn btn-info btn-block">submit new password</button>
                      </div>
                      {/* <!-- /.col --> */}
                      </div>
                    </form>
                    <p className="mt-3 mb-1">
                        <Link to='/login'>Login</Link>
                    </p>
                  </div>
                    )
                }
                </div>
              </div>
          </div>
        )
    }
}
