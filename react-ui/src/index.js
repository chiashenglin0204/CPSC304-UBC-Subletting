import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Dashboard from './routes/dashboard/Dashboard';
import Subletter from './routes/dashboard/Subletter';
import Applicant from './routes/dashboard/Applicant';
import DashboardLanding from './routes/dashboard/DashboardLanding';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="/dashboard" element={<DashboardLanding />} />
          <Route path="/dashboard/subletter" element={<Subletter />} />
          <Route path="/dashboard/applicant" element={<Applicant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
