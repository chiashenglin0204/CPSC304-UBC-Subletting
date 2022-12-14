import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { createUser } from '../requests/userRequests';
import './Signup.css';

const defaultValues = {
  sid: -1,
  phoneNum: '',
  userName: '',
  gender: '',
  email: '',
};

const Signup = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
  
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await createUser(JSON.stringify(formValues));
    /** TODO: error handling */
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="center" direction="column">
        <Grid item>
          <Typography variant="h3">Sign up!!!</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="sid-input"
            name="sid"
            label="Student ID"
            type="number"
            value={formValues.sid}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="phone#-input"
            name="phoneNum"
            label="Phone #"
            type="text"
            value={formValues.phoneNum}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="name-input"
            name="userName"
            label="Name"
            type="text"
            value={formValues.userName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel
                key="M"
                value="M"
                control={<Radio size="small" />}
                label="M"
              />
              <FormControlLabel
                key="F"
                value="F"
                control={<Radio size="small" />}
                label="F"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            id="email-input"
            name="email"
            label="Email"
            type="text"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default Signup;
