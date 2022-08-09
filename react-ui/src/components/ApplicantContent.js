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
  getCheapestAvailableListingByRoomType,
  getAllReducedListings,
  getListingCountForRoomTypes,
} from '../requests/listingRequests';
import ListingsTable from './ListingsTable';
import CloseIcon from '@mui/icons-material/Close';

const ApplicantContent = () => {
  const [listingCountsByRoomType, setListingCountsByRoomType] = useState(null);
  const [listings, setListings] = useState(null);
  const [roomType, setRoomType] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [reducedView, setReducedView] = useState(false);

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
  }, []);

  setTimeout(() => {
    setAlertOpen(false);
  }, 3000);

  const handleFindCheapestRoomByRoomType = async () => {
    const res = await getCheapestAvailableListingByRoomType(
      new URLSearchParams({ roomType: roomType })
    );
    if (!res || res.error || res.length === 0) setAlertOpen(true);
    else setListings(res);
  };

  const fetchReducedListings = async () => {
    const res = await getAllReducedListings();
    const error = !res || res.error;
    if (!error) {
      setListings(res);
      setReducedView(true);
    }
    console.log(res);
  };

  const handleClearFilter = async () => {
    const res = await getAllListings();
    const error = !res || res.error;
    if (!error) {
      setListings(res);
      setReducedView(false);
    }
    setRoomType('');
  };

  return (
    <>
      <Typography variant="h2">Listings:</Typography>
      {listingCountsByRoomType ? (
        listingCountsByRoomType.map((countByRoomType) => (
          <Typography variant="body1" key={countByRoomType.roomtype}>
            {`Room Type ${countByRoomType.roomtype} has ${countByRoomType.numlistings} listings`}
          </Typography>
        ))
      ) : (
        <Typography variant="h4"> Filler </Typography>
      )}
      <Divider />
      <Typography variant="h4">Cheapest listing finder</Typography>
      <TextField
        id="roomType-input"
        name="roomType"
        label="Room Type"
        variant="outlined"
        value={roomType}
        onChange={(event) => setRoomType(event.target.value)}
      />
      <Button onClick={handleFindCheapestRoomByRoomType}>
        {'Find Room(s)'}
      </Button>
      <Button onClick={handleClearFilter}>{'Clear Filter'}</Button>
      <Collapse in={alertOpen}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          No listing found
        </Alert>
      </Collapse>
      <Button onClick={fetchReducedListings}>Reduced View</Button>
      {listings && <ListingsTable rows={listings} reducedView={reducedView} />}
    </>
  );
};

export default ApplicantContent;
