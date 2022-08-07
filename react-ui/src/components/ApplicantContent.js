import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  getAllListings,
  getListingCountForRoomTypes,
} from '../requests/listingRequests';
import ListingsTable from './ListingsTable';

const ApplicantContent = () => {
  const [listingCountsByRoomType, setListingCountsByRoomType] = useState(null);
  const [listings, setListings] = useState(null);

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
    </>
  );
};

export default ApplicantContent;
