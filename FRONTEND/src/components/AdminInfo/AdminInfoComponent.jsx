import React , { useState , useEffect } from 'react'
import Sidebar from '../Functionality/SideBar/Sidebar'
import axios from 'axios'
import './AdminInfoStyle.css'
import { toast , ToastContainer} from 'react-toastify'



export default function AdminInfoComponent() {

    let id = localStorage.getItem('usr_sess_id')
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [profile, setProfile] = useState()
    const [file, setFile] = useState(null)
    const disabledSubmit = false


    const handleUsername = (e)=>{
        setName(e.target.value)
    }


    const handleImageChange = (e)=>{
        if (e.target.files && e.target.files[0]) {
            // let preview = URL.createObjectURL(e.target.files[0])
            // let data = e?.target?.files[0]
            setProfile(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0])
          }
        console.log(e.target.files[0])
    }

    
    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }


    const handleFormSubmit = (event)=>{
        event.preventDefault()

        let fd = new FormData()
        fd.append('image',file)
        fd.append('name',name)
        // fd.append('email',event?.target?.email?.value)
        fd.append('email',email)

        try{
            console.log(event.target);

            axios.put(`/admin/update/${localStorage.getItem('usr_sess_id')}`,fd )
                .then(res=>{
                    console.log(res)
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
                })


        }
        catch(error){
            console.log('error:',error.message);
            toast(error.response.data.message, {
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

    }


    useEffect(()=>{
        axios.get(`/admin/info?id=${id}`)
            .then(response=>{
                setEmail(response?.data?.message?.email)
                setName(response?.data?.message?.name)
                setProfile(response?.data?.message?.profile_img)
            })
    } , [])


  return (
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

    <div className="card card-outline">

        <div className="card-body">
        <form onSubmit={handleFormSubmit} method="post" encType="multipart/form-data">
        <div className="card-header text-center">

        <img name='profile_pic' alt='admin profile image' className='card-img-top card_dimensions' src={profile} height='155px' width='250px'/>
        <input type='file' id='userImg' name='profile_img' onChange={handleImageChange}/>
        </div>

            <label htmlFor='name'>Username</label>
            <div className="input-group mb-4">
                <input type="text" name='name'
                        className="form-control"
                        autoComplete="off"
                        value={name}
                        onChange={handleUsername}
                        required
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-user"></span>
                    </div>
                </div>
            </div>
            
            <label htmlFor='email'>E-mail</label>
            <div className="input-group mb-4">
                <input name='email' 
                        type="email"
                        autoComplete="off"
                        value={email}
                        onChange={handleEmail} 
                        className="form-control"
                        required
                        />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
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
                                <span className="sr-only"></span>  Updating Info
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
