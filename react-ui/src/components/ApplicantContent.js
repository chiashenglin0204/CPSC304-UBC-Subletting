// import { Typography } from '@mui/material';
import {
  Alert,
  Button,
  Collapse,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  getAllListings,
  getListingCountForRoomTypes,
  getPopularListings,
  getListingsByGender,
} from '../requests/listingRequests';
import {
  getAllApps,
  getUnfinishedApps
} from '../requests/applicantRequests';
import ListingsTable from './ListingsTable';
import ApplicationsTable from './ApplicationsTable';
import PopListingsTable from './PopListingsTable';
// import ValidateUserType from './ValidateUserType';
import { useUserContext } from './UserContext';
import CloseIcon from '@mui/icons-material/Close';


const ApplicantContent = () => {
  const [listingCountsByRoomType, setListingCountsByRoomType] = useState(null);
  const [listings, setListings] = useState(null);
  const [popListings, setPopListings] = useState(null);
  const [applications, setApplications] = useState(null);
  const [gender, setGender] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  /* eslint-disable no-unused-vars */
  const { user, setUser } = useUserContext();
  /* eslint-enable no-unused-vars */
  const sid = user.sid;//99999999;
  const applicantID = user.applicantid;//1;

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
      const res = await getAllApps(new URLSearchParams({ sid: sid }));
      const error = !res || res.error;
      if (error) console.log(error);
      else setApplications(res);
      console.log(res);
    }

    fetchApplications().catch((err) => console.log(err));

  }, []);

  setTimeout(() => {
    setAlertOpen(false);
  }, 3000);

  const handleGetUnfinishedApps = async () => {
    const res = await getUnfinishedApps(new URLSearchParams({ applicantID: applicantID }));
    const error = !res || res.error;
    if (!error) setApplications(res);
    console.log(res,'get unfinished apps');
  };

  const handleGetAllApps = async () => {
    const res = await getAllApps(new URLSearchParams({ sid: sid }));
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

  const handleFindListingsByGender = async () => {
    const res = await getListingsByGender(
      new URLSearchParams({ gender: gender })
    );
    const error = !res || res.error || res.length === 0;
    if (error) setAlertOpen(true);
    else setListings(res);
  };

  const handleClearGenderFilter = async () => {
    const res = await getAllListings();
    const error = !res || res.error;
    if (!error) setListings(res);
    setGender('');
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

      <Divider />
      <TextField
        id="gender-input"
        name="gender"
        label="Gender"
        variant="outlined"
        value={gender}
        onChange={(event) => setGender(event.target.value)}
      />
      <Button onClick={handleFindListingsByGender}>{'Apply gender filter'}</Button>
      <Button onClick={handleClearGenderFilter}>{'Clear filter'}</Button>
      <Collapse in={alertOpen}>
        <Alert
          severity="error"
          action={
            <IconButton aria-label="close" 
                        color="inherit"
                        size="small"
                        onClick={() => {setAlertOpen(false);}}>
            <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          No listing found
        </Alert>
      </Collapse>

      {listings && <ListingsTable rows={listings}/>}

      <Divider />

      <Typography variant="h3">Popular Listings</Typography>
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
