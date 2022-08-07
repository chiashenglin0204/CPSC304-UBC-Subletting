import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

const ValidateUserType = (props) => {
  const {
    createUserType,
    getUserType,
    registerUserTypeButtonLabel,

  } = props;
  
  const { user, setUser } = useUserContext();
  const [isUserType, setIsUserType] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const closeDialogRedirect = () => {
    setOpenDialog(false);
    navigate('/');
  };

  useEffect(() => {
    if (!user) setOpenDialog(true);
    const fetchData = async () => {
      const res = await getUserType(
        new URLSearchParams({
          sid: user.sid,
        })
      );
      const foundUserType = !(!res || res.error || res.length === 0);
      setIsUserType(foundUserType);
      if (foundUserType) setUser({ ...user, ...res[0] });
      console.log(res);
    };
    fetchData().catch((err) => console.log(err));
  }, []);

  const registerUserType = async () => {
    const res = await createUserType(JSON.stringify({ sid: user.sid }));
    if (res.success) setIsUserType(true);
    console.log(res);
  };

  return !isUserType ? (
    <>
      <Button variant="contained" onClick={registerUserType}>
        {registerUserTypeButtonLabel ?? 'Register'}
      </Button>
      <Dialog open={openDialog} onClose={closeDialogRedirect}>
        <DialogTitle>{'You are not logged in'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please re-enter your login information correctly or signup as a new
            user
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogRedirect}>Proceed to Login Page</Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <Typography variant="h2">CONTENT GOES HERE</Typography>
  );
};

ValidateUserType.propTypes = {
  createUserType: PropTypes.func.isRequired,
  getUserType: PropTypes.func.isRequired,
  registerUserTypeButtonLabel: PropTypes.string,

}

export default ValidateUserType;
