import React from 'react';
import SubletterContent from '../../components/SubletterContent';
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
      content={<SubletterContent />}
    />
  );
};

export default Subletter;
