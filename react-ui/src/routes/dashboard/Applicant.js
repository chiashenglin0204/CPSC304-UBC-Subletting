import { Typography } from '@mui/material';
import React from 'react';
import { useUserContext } from '../../components/UserContext';

const Applicant = () => {
  const { user } = useUserContext();

  

  return <Typography>THIS IS APPLICANT TAB</Typography>;
};

export default Applicant;
