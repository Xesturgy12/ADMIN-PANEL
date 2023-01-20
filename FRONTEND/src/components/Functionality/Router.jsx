
import { Routes, Route ,Outlet , useNavigate , Navigate} from "react-router-dom";
import Login from "../Auth/Login/Login";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import Error from "./Error";
import UserManagement from "../Dashboard/UserManagement";
import ResetPassword from "../Auth/resetPassword/ResetPassword";
import UserDetailsUpdate from "../UserDetailsUpdate/UserDetailsUpdate";
import AddUserForm from "../AddUser/AddUserForm";
import axios from 'axios'
import { createContext ,useState } from "react";
import AdminInfoComponent from "../AdminInfo/AdminInfoComponent";



export default function Router(){
  axios.defaults.baseURL = 'http://localhost:5000/';

  let navigate = useNavigate()

  // request interceptor
  axios.interceptors.request.use(request => {
    let bearertoken = localStorage.getItem('transact_auth_back')
    // console.log(bearertoken);

    request.headers.authorization = bearertoken ?"Bearer "+bearertoken:' '
    return request
  },error=>{
    return Promise.reject(error)
  }
  )


  //  response interceptor
  axios.interceptors.response.use(response => {
    return response
  }, error => {
    if (error.response) {
      if (error.response.status === 401) {
        
        localStorage.removeItem()
        localStorage.removeItem('transact_auth_back')
        navigate('/')
      }
    }
      return Promise.reject(error);
              }
  )
  

  const ProtectedRoute = () => {
    if (!localStorage.getItem('transact_auth_back')) {
      return <Navigate to="/login" />
    }
    return <Outlet />
  }
  
  const PublicRoute = () => {
      if (localStorage.getItem('transact_auth_back')) {
      return <Navigate to="/userManagement" />
    }
    return <Outlet />
  }



  const UserContext = createContext()
    return(
        <Routes>
          <Route element={<PublicRoute/>} errorElement={<Error/>}>
            <Route path="/login" element={<Login/>} errorElement={<Error/>} />
            <Route path="*" element={<Login/>} errorElement={<Error/>} />
          </Route>
          <Route errorElement={<Error/>}>
            <Route path="/forgot" element={<ForgotPassword/>} errorElement={<Error/>} />
            <Route path="/reset" element={<ResetPassword/>} errorElement={<Error/>} />
          </Route>

          <Route element={<ProtectedRoute/>} errorElement={<Error/>}>
            <Route path="/reset" element={<ResetPassword/>} errorElement={<Error/>} />
            <Route path="/user/update" element={<UserDetailsUpdate/>} errorElement={<Error/>} />
            <Route path="*" element={<UserManagement/>} errorElement={<Error/>} />
            <Route path='/adminInfo' element={<AdminInfoComponent/>} errorElement={<Error/>}/>
            <Route path="/userManagement" element={<UserManagement/>} errorElement={<Error/>} />
            <Route path="/user/add" element={<AddUserForm/>} errorElement={<Error/>}/>
          </Route>
        </Routes>
    )
  }