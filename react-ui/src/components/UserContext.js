import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.node,
};

const useUserCountext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export { UserContextProvider, useUserCountext };
