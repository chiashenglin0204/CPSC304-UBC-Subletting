import ValidateUserType from '../../components/ValidateUserType';
import React from 'react';
import { createApplicant, getApplicant } from '../../requests/applicantRequests';

const Applicant = () => {
  return (
    <ValidateUserType
      createUserType={createApplicant}
      getUserType={getApplicant}
      registerUserTypeButtonLabel="Become Applicant"
    />
  );
};

export default Applicant;
