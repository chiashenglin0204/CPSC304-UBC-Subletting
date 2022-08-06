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

/**
 * 
 * @returns { object, function } returns an object containing the currently logged in user's SID and Phone#
 * How to use:
 *    const { user, setUser } = useUserContext()
 * now you can use the user variable to access the user info
 * setUser can be used to set new values by inputting an object containing sid and phone#
 * e.g.
 *    setUser({
 *      ...user,        // <- this line uses the spread operator which inputs all the user's old properties, it's unnecessary if you are changing both sid and phone#
 *      sid: '420',
 *    })
 */
const useUserCountext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export { UserContextProvider, useUserCountext };
