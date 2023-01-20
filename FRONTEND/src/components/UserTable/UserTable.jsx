import React , { useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import Deleteuser from '../Dashboard/DeleteUser/Deleteuser'






export default function UserTable({usersList,setPerPage,setPageNumber,perPage,rowCount}) {
   console.log(usersList);
  const [showPopup, setshowPopup] = useState(false)
  const [userData, setuserData] = useState()
  const [open, setOpen] = useState(false)

  

  const columns = [
    {
      field: 'userName',
      headerName: 'User Name',
      width: 220,
      editable: false,
    },
    {
      field: 'mobileNumber',
      headerName: 'Mobile Number',
      width: 180,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 250,
      editable: false,
    },{
      field: 'isactive',
      headerName: 'is Active',
      width: 120,
      editable: false,
      sortable:false,
      disableColumnMenu:true,
      renderCell: (cellValues) => {
        return(
        cellValues?.row?.isactive?(
          <div className='online butn'></div>
        ):(
          <div className='offline butn'></div>
        )
      )}
    },


    {
      field: "adminTools",
      headerName: 'Admin Tools',
      sortable:false,
      disableColumnMenu:true,
      width:150,
      renderCell: (cellValues) => {
        return (
          <div className='m-auto'>
            <Button
              variant="dark"
              startIcon={<DeleteIcon/>}

              onClick={(event) => {
                setshowPopup(true)
                setOpen(true)
                //displays the row content, send this through api
                setuserData(cellValues.row)
              }}/>
              <Link style={{color:'black'}} to='/user/update' state={{data: cellValues.row}}>
                <Button
                  variant="dark"
                  startIcon={<EditIcon/>}
                  />
              </Link>
          </div>
        );
      }
    },
  ];



  return (
    <div style={{width:'950px'}}className='content-wrapper '>
      {
        (showPopup)?(<Deleteuser user={userData} open={open} setopen={setOpen} setPop={setshowPopup}/>):(null)
      }
      
      <DataGrid
        autoHeight
        rowCount={rowCount}
        rows={usersList}
        columns={columns}
        pageSize={perPage}
        paginationMode="server"
        onPageSizeChange={(newPageSize) => {
        setPerPage(newPageSize)
        }}
        onPageChange={(page_number)=>{setPageNumber(page_number+1)
        // +1 to the page number
        }}
        sortingMode="server"
        filterMode="server"
        rowsLoadingMode="server"
        rowsPerPageOptions={[ 2, 5, 10, 20]}
        pagination
        
      />
      </div>
  )
}
