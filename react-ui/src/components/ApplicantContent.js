import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getListingCountForRoomTypes } from '../requests/listingRequests';

const ApplicantContent = () => {
  const [listingCountsByRoomType, setListingCountsByRoomType] = useState(null);

  useEffect(() => {
    const fetchListingCounts = async () => {
      const res = await getListingCountForRoomTypes();
      const error = !res || res.error;
      if (!error) setListingCountsByRoomType(res);
      console.log(res);
    };

    fetchListingCounts().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Typography variant="h2">Listings:</Typography>
      {listingCountsByRoomType ? (listingCountsByRoomType.map((countByRoomType) => (
      <Typography variant="h4" key={countByRoomType.roomtype}>
        {`Room Type ${countByRoomType.roomtype} has ${countByRoomType.numlistings} listings`}
      </Typography>
      ))) : ( <Typography variant='h4'> Filler </Typography>)}
    </>
  );
};

export default ApplicantContent;
