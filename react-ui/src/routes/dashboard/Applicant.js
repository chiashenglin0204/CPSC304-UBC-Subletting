import ValidateUserType from '../../components/ValidateUserType';
import React from 'react';
import { createApplicant, getApplicant } from '../../requests/applicantRequests';
import ApplicantContent from '../../components/ApplicantContent';

const Applicant = () => {
  return (
    <ValidateUserType
      createUserType={createApplicant}
      getUserType={getApplicant}
      registerUserTypeButtonLabel="Become Applicant"
      content={<ApplicantContent />}
    />
  );
};

export default Applicant;
