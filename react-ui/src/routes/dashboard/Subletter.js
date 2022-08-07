import React from 'react';
import ValidateUserType from '../../components/ValidateUserType';
import {
  createSubletter,
  getSubletter,
} from '../../requests/subletterRequests';

const Subletter = () => {
  return (
    <ValidateUserType
      createUserType={createSubletter}
      getUserType={getSubletter}
      registerUserTypeButtonLabel="Become Subletter"
    />
  );
};

export default Subletter;
