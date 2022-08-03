import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import './Login.css'

const Login = () => {


  return (
    <div>
      <form className="form">
        <Typography variant="h2">Welcome to UBC Subletting!</Typography>
        <Typography variant="subtitle1">please login with your student ID and phone number as your password to continue</Typography>
        <Typography variant="subtitle2">(input phone number with no formatting e.g. 123456789)</Typography>
        <TextField id="outlined-basic" label="Student ID" variant="outlined" />
        <TextField id="outlined-basic" label="Phone Number" variant="outlined" type="password" />
        <Button variant="contained" >Login</Button>
        <Button LinkComponent={'a'} variant="contained" href='/Signup'>Sign up</Button>
      </form>
    </div>
  )
}

export default Login
