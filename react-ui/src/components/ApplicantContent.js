import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  getAllListings,
  getAllReducedListings,
  getListingCountForRoomTypes,
} from '../requests/listingRequests';
import ListingsTable from './ListingsTable';

const ApplicantContent = () => {
  const [listingCountsByRoomType, setListingCountsByRoomType] = useState(null);
  const [listings, setListings] = useState(null);
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
      <Button onClick={fetchReducedListings}>Reduced View</Button>
      <Button onClick={handleClearFilter}>Clear Filter</Button>
      {listings && 
      <ListingsTable rows={listings} reducedView={reducedView} />}
    </>
  );
};

export default ApplicantContent;
