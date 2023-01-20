import React , { useEffect , useState , useContext } from 'react'
import Sidebar from '../Functionality/SideBar/Sidebar'
import UserTable from '../UserTable/UserTable'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'

// send id in query simply as /id and body needs to include content to be updated


export default function userManagement() {

    const [usersList, setusersList] = useState()
    const navigate = useNavigate()

    const [loadingMessage, setLoadingMessage] = useState({
      heading:`Loading Data from the server....`,
      sub_heading:`Please wait`,
      spinner:true,
    })
    const [perPage,setPerPage] = useState(5)
    const [pageNumber,setPageNumber] = useState(1)
    const [rowCount,setRowCount] = useState(4)

  useEffect(() => {
    try{
      axios.get(`http://localhost:5000/admin/user/get?perPage=${perPage}&pageNumber=${pageNumber}`)
      .then((res)=>{
        setusersList(res.data.message)
        setRowCount(res.data.rowCount)
      }
      )
      .catch((err)=>{
        console.log(err);
        if(err.response.status == 400){
          setLoadingMessage({
            heading:`Error occured accessing data from server`,
            sub_heading:`Json Web Token Tinkered`,
            spinner:false,
          })

          setTimeout(()=>{
            localStorage.removeItem('usr_sess_id')
            localStorage.removeItem('transact_auth_back')
            navigate('/login')
          },3000)
        }
        else console.log('sos');
        // navigate()
      })
    }catch(err){
    }
  }, [perPage,pageNumber])
 

  return (
    <div className='d-flex'>
        <Sidebar/>
        { usersList?.length>0 ?(
              <div className='m-auto'>
                    {/* <div>Dashboard</div> */}
                    <UserTable usersList = {usersList} setPerPage={setPerPage} setPageNumber={setPageNumber} perPage={perPage} rowCount={rowCount}/>
                </div>
            ):(
              <div className='m-auto mt-xl-5 '>
              <h4>
              {(loadingMessage.spinner)?
              (<span className="spinner-border spinner-border-lg" style={{margin:'2px 25px'}}/>)
              :(null)
            }
              
                <strong>{loadingMessage.heading}</strong>
                <br/><center>{loadingMessage.sub_heading}</center>
                </h4>
              </div>
            )
          }
          </div>
          )
}
