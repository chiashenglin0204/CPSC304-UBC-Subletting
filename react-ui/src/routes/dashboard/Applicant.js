import ValidateUserType from '../../components/ValidateUserType';
import React from 'react';
import { createApplicant, getApplicant } from '../../requests/applicantRequests';
import { Typography } from '@mui/material';

const Applicant = () => {
  return (
    <ValidateUserType
      createUserType={createApplicant}
      getUserType={getApplicant}
      registerUserTypeButtonLabel="Become Applicant"
      content={<Typography>Bullshit</Typography>}
    />
  );
};

export default Applicant;
