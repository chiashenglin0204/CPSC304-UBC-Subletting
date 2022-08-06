import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useUserCountext } from '../../components/UserContext';

const pages = [
  ['Subletter', '/dashboard/subletter'],
  ['Applicant', '/dashboard/applicant'],
];
const settings = [
  ['Profile', '/'],
  ['Account', '/'],
  ['Dashboard', '/'],
  ['Logout', '/'],
];

const Dashboard = () => {
  const {user} = useUserCountext();
  
  /**
   * testing function to validate that user context is working after redirecting from Login
   */
  useEffect(() => console.log(user)
  , []);
  
  return (
    <>
      <ResponsiveAppBar pages={pages} settings={settings} />
      <Outlet />
    </>
  );
};

export default Dashboard;
