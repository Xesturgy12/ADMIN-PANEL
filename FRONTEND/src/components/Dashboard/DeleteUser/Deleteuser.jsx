import React ,{ useState , useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';



export default function Deleteuser({open,user,setopen,setPop}){

  function handleDisagree(){
    setPop(false)
    setopen(false)
  }

  function handleAgree(){
    console.log(user.id);
    axios.delete(`http://localhost:5000/user/remove/${user.id}`)
      setPop(false)
      setopen(false)
      window.location.reload()
  }

  return (
        <Dialog
        open={open}
        
        keepMounted
         disablePortal
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Selected User's Account?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to remove this user from the database? Remember
            that all login related information to this user will be removed from the database
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>DisAgree</Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
  )
}
