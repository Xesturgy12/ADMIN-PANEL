import React, { useState , useEffect } from "react";
import Sidebar from "../Functionality/SideBar/Sidebar";
import './UserDetails.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik} from 'formik'
import { toast , ToastContainer} from 'react-toastify'
import { useLocation } from 'react-router-dom'



function checkMobileNumber(e){
    if(e.key =='e'|| e.key == 'E' || e.key == '+'|| e.key == '-') return e.preventDefault();
}



export default function UserDetailsUpdate(){

    
    const navigate = useNavigate()

    const {data} = useLocation()?.state


    const [disabledSubmit,setDisabledSubmit] = useState(false)


    // const validate = values =>{
    //     const errors = {};
    //     if(values.mobileNumber < 1){
    //         errors.mobileNumber = '';
    //     }
    //     else if(values.mobileNumber >=9999999999999 || values.mobileNumber <9999999999){
    //         errors.mobileNumber = 'Number must be between 10-13 digits';
    //     }
    //     else if(values.email == ''){
    //         return null
    //     }
    //     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //         errors.email = 'Invalid email address';
    //     }
    //     return errors
    // }


    const formik = useFormik({
        initialValues: {
          email: '',
          name: '',
          mobileNumber: '',
        },
        onSubmit: async (values) => {
                setDisabledSubmit(true)
                try {
                    let res = await axios.put(`/admin/user/update/${data.id}`, values)
                    // console.log(res);

                    toast(res.data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        type: 'success'
                      });

                    navigate('/users')
                    
                } 
                catch (errors) {
                    console.log(errors);
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





    return(
        <div>
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
        <Sidebar/>
        <div className='hold-transition login-page'>
        <div className="login-box">

        <div className="card text-secondary border-info">
            <div className="card-header text-center">
            <h3 className="h1 text-dark"><b>Update User Details</b></h3>
            </div>
            <div className="card-body">

            <form onSubmit={formik.handleSubmit} method="post">
                <label htmlFor='name'>Username</label>
                <div className="input-group mb-4">
                    <input type="text" name='name'
                            className="form-control"
                            autoComplete="off"
                            value={formik.values.name}
                            onChange={formik.handleChange} 
                            placeholder={data.userName}/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-user"></span>
                        </div>
                    </div>
                </div>
                
                    {formik.errors.email ? <div style={{opacity:.8}} className='text-danger'>{formik.errors.email}</div> : null}
                <label htmlFor='email'>E-mail</label>
                <div className="input-group mb-4">
                    <input name='email' 
                            type="email"
                            autoComplete="off"
                            value={formik.values.email}
                            onChange={formik.handleChange} 
                            className="form-control" placeholder={data.email}/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                        </div>
                    </div>
                </div>
                

                {formik.errors.mobileNumber ? <div style={{opacity:.8}} className='text-danger'>{formik.errors.mobileNumber}</div> : null}
                <label htmlFor='mobileNumber'>Mobile Number</label>
                <div className="input-group mb-4">
                    <input name='mobileNumber' 
                            type="number"
                            min = '0000000000'
                            max='99999999999999'
                            value={formik.values.mobileNumber}
                            onChange={formik.handleChange} 
                            onKeyDown={checkMobileNumber}
                            className="form-control" placeholder={data.phoneNumber}/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-phone"></span>
                        </div>
                    </div>
                </div>


                <div className="row">
                <div className="col-5 m-auto mb-4">
                            <button type="submit" className="btn btn-info btn-block" disabled={disabledSubmit}>
                            {
                                disabledSubmit ? (
                                    <div>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>  Updating
                                </div>
                                ) : 'Update Info'
                            }
                            </button>
                        </div>
                </div>
            </form>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}
