import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';



const handleLogout = () => {
    localStorage.removeItem('usr_sess_id')
    localStorage.removeItem('transact_auth_back')
    navigate('/login')
}



export default function Sidebar(){
  return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            
            <a href="/dashboard" className="brand-link">
            <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}}/>
            <span className="brand-text font-weight-light">Admin Panel</span>
            </a>
            
            <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="info">
                <a href="/adminInfo" className="d-block">Administrator</a>
                </div>
                <div className="img_custom">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqB8zhR5AsvQYMCqzqF-2vC-zsERgOEBZIGI6Ld2i&s" className="img-circle elevation-2" id='img_custom' alt="User Image"/>
                </div>
            </div>


            <div className="user-panel mt-3 pb-3 mb-3 d-flex text-white">
                <Link to='/users'>User Management</Link>
                <h3></h3>
            </div>


            <div className="user-panel mt-3 pb-3 mb-3 d-flex text-white">
                <Link to='/user/add'>Add New User</Link>
                <h3></h3>
            </div>

            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <Link to='/' id='tooltip_div' onClick={()=>handleLogout()}>
                    <ExitToAppIcon></ExitToAppIcon>Exit
                </Link>
            </div>
            
            </div>
            
        </aside>
  )
}
