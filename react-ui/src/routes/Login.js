import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../components/UserContext';
import { getUser } from '../requests/userRequests';
import './Login.css';

const defaultValues = {
  sid: '',
  phoneNum: '',
};

const Login = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await getUser(
      new URLSearchParams({
        ...formValues,
      })
    );
    if (!res || res.error || res.length === 0) setOpen(true);
    else {
      setUser({
        sid: res[0].sid,
        phoneNum: res[0]['phone#'],
      });
      navigate('/dashboard');
    }
    console.log(res);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <Typography variant="h2">Welcome to UBC Subletting!</Typography>
        <Typography variant="subtitle1">
          please login with your student ID and phone number as your password to
          continue
        </Typography>
        <Typography variant="subtitle2">
          (input phone number with no formatting e.g. 123456789)
        </Typography>
        <TextField
          id="phoneNum-input"
          name="phoneNum"
          label="Phone Number"
          variant="outlined"
          value={formValues.phoneNum}
          onChange={handleInputChange}
        />
        <TextField
          id="sid-input"
          name="sid"
          label="Student ID"
          variant="outlined"
          type="password"
          value={formValues.sid}
          onChange={handleInputChange}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
        <Button LinkComponent={'a'} variant="contained" href="/Signup">
          Sign up
        </Button>
      </form>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {'Either Phone Number or Student ID was incorrect'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please re-enter your login information correctly or signup as a new
            user
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
