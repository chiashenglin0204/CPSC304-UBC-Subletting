// import { Typography } from '@mui/material';
import {
  Button,
  Divider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  getAllListings,
  getListingCountForRoomTypes,
  getPopularListings,
} from '../requests/listingRequests';
import {
  getAllApps,
  getUnfinishedApps
} from '../requests/applicantRequests';
import ListingsTable from './ListingsTable';
import ApplicationsTable from './ApplicationsTable';
import PopListingsTable from './PopListingsTable';
// import ValidateUserType from './ValidateUserType';
// import { useUserContext } from './UserContext';
// const { user, setUser } = useUserContext();


const ApplicantContent = () => {
  const [listingCountsByRoomType, setListingCountsByRoomType] = useState(null);
  const [listings, setListings] = useState(null);
  const [popListings, setPopListings] = useState(null);
  const [applications, setApplications] = useState(null);

  /**
   * i need help extracting the student id from the validated user info
   */
  const sid = 99999999;
  const applicantID = 1;

  useEffect(() => {
    const fetchListingCounts = async () => {
      const res = await getListingCountForRoomTypes();
      const error = !res || res.error;
      if (!error) setListingCountsByRoomType(res);
      console.log(res);
    };

    const fetchListings = async () => {
      const res = await getAllListings();
      const error = !res || res.error;
      if (!error) setListings(res);
      console.log(res);
    };

    fetchListingCounts().catch((err) => console.log(err));
    fetchListings().catch((err) => console.log(err));

    const fetchApplications = async () => {
      const res = await getAllApps(new URLSearchParams({ sid: sid })); //ValidateUserType.sid
      const error = !res || res.error;
      if (error) console.log(error);
      else setApplications(res);
      console.log(res);
    }

    fetchApplications().catch((err) => console.log(err));

    // const fetchPopListings = async () => {
    //   const res = await getPopularListings();
    //   const error = !res || res.error;
    //   if (error) console.log(error);
    //   else setPopListings(res);
    //   console.log(res);
    //   // setPopListings(false);
    // }
    
    // fetchPopListings().catch((err) => console.log(err));

  }, []);

  // setTimeout(() => {
  //   setAlertOpen(false);
  // }, 3000);

  const handleGetUnfinishedApps = async () => {
    const res = await getUnfinishedApps(
      new URLSearchParams({ applicantID: applicantID })   //ValidateUserType.applicantID
    );
    const error = !res || res.error;
    if (!error) setApplications(res);
    console.log(res,'get unfinished apps');
  };

  const handleGetAllApps = async () => {
    const res = await getAllApps(new URLSearchParams({ sid: sid })); //ValidateUserType.sid
    const error = !res || res.error;
    if (!error) setApplications(res);
    console.log(res,'get all apps');
  };

  const handleGetPopularListings = async () => {
    const res = await getPopularListings();
    const error = !res || res.error;
    if (!error) setPopListings(res);
    console.log(res,'get popular listings');
  };

  const handleHidePopularListings = async () => {
    setPopListings(null);
    console.log('hide popular listings');
  };

  return (
    <>
      <Typography variant="h2">Listings:</Typography>
      {listingCountsByRoomType ? (
        listingCountsByRoomType.map((countByRoomType) => (
          <Typography variant="h4" key={countByRoomType.roomtype}>
            {`Room Type ${countByRoomType.roomtype} has ${countByRoomType.numlistings} listings`}
          </Typography>
        ))
      ) : (
        <Typography variant="h4"> Filler </Typography>
      )}
      {listings && <ListingsTable rows={listings}/>}


      <Button onClick={handleGetPopularListings}>
        {'Show popular listings'}
      </Button>      
      <Button onClick={handleHidePopularListings}>
        {'Hide popular listings'}
      </Button>
      {popListings && <PopListingsTable rows={popListings}/>}
      
      <Divider />

      <Typography variant="h2">Applications submitted:</Typography>
      <Button onClick={handleGetUnfinishedApps}>
        {'Show applications missing all supporting documents'}
      </Button>
      <Divider />
      <Button onClick={handleGetAllApps}>
        {'Show all applications'}
      </Button>

      {applications && <ApplicationsTable rows={applications}/>}
      
    </>
  );
};

export default ApplicantContent;
