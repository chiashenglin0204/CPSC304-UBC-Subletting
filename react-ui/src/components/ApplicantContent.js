import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  getAllListings,
  getListingCountForRoomTypes,
} from '../requests/listingRequests';
import {
  getAllApps,
  // getUnfinishedApps
} from '../requests/applicantRequests';
import ListingsTable from './ListingsTable';
import ApplicationsTable from './ApplicationsTable';
// import ValidateUserType from './ValidateUserType';
// import { useUserContext } from './UserContext';
// const { user, setUser } = useUserContext();


const ApplicantContent = () => {
  const [listingCountsByRoomType, setListingCountsByRoomType] = useState(null);
  const [listings, setListings] = useState(null);
  const [applications, setApplications] = useState(null);

  /**
   * i need help extracting the student id from the validated user info
   */
  const sid = 99999999;

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
      if (!error) setApplications(res);
      console.log(res);
    }

    fetchApplications().catch((err) => console.log(err));

  }, []);


  // const handleGetUnfinishedApps = async () => {
  //   const res = await getUnfinishedApps(
  //     new URLSearchParams({ applicantID: user.applicantID })
  //   );
  //   if (!res || res.error || res.length === 0) setAlertOpen(true);
  //   else setListings(res);
  // };

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

      <Typography variant="h2">Applications submitted:</Typography>
      {applications && <ApplicationsTable rows={applications}/>}
    </>
  );
};

export default ApplicantContent;
