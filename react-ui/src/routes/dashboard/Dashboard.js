import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import React from 'react';
import { Outlet } from "react-router-dom";

const pages = [['Subletter', '/dashboard/subletter'], ['Applicant', '/dashboard/applicant']];
const settings = [['Profile', '/'], ['Account', '/'], ['Dashboard', '/'], ['Logout', '/']];

const Dashboard = () => {
	
	return (
		<>
			<ResponsiveAppBar pages={pages} settings={settings}/>
			<Outlet />
		</>
	);
};

export default Dashboard;
