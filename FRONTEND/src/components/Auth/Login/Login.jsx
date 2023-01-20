import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useFormik} from 'formik'
import { toast , ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



export default function Login() {
  
  const [disabledSubmit, setDisabledSubmit] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },validate,
    onSubmit: async (values) => {
      setDisabledSubmit(true)
      try {
        let res = await axios.post(`/admin/login`, values)
        console.log(typeof(res.data.token));

        localStorage.setItem('transact_auth_back',res.data.token)
        localStorage.setItem('usr_sess_id',res.data.usr_id)
        navigate('/dashboard')
        
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
      setDisabledSubmit(false)
    },
  });


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

      <div className="card card-outline card-yellow">
        <div className="card-header text-center">
          <a className="h1"><b>Login</b></a>
        </div>
        <div className="card-body">
          <p className="login-box-msg">LogIn to begin your session</p>

          <form onSubmit={formik.handleSubmit} method="post">
            <div className="input-group mb-3">

              <input type="email" name='email'
                    className="form-control"
                    value={formik.values.email}
                    onChange={formik.handleChange} 
                    placeholder="Email"/>

              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            {formik.errors.email ? <div className='text-danger'>{formik.errors.email}</div> : null}

            <div className="input-group mb-3">
              <input name='password' 
                    type={showPassword?'text':"password"}
                    value={formik.values.password}
                    onChange={formik.handleChange} 
                    className="form-control" placeholder="Password"/>
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" onClick={()=>{
                    setShowPassword(!showPassword)
                  }}></span>
                </div>
              </div>
            </div>
            {formik.errors.password ? <div className='text-danger'>{formik.errors.password}</div> : null}

            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember"/>
                  <label htmlFor="remember">
                    Remember Me
                  </label>
                </div>
              </div>

              <div className="col-4">
                        <button type="submit" className="btn btn-warning btn-block" disabled={disabledSubmit}>
                          {
                            disabledSubmit ? (
                              <div>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>  Signing In
                              </div>
                            ) : 'Sign In'
                          }
                        </button>
                      </div>
            </div>
          </form>

          <p className="mb-1">
            <Link to='/forgot'>I forgot my password</Link>
          </p>
         
          </div>
        
        </div>
      </div>
    </div>
  )
}
