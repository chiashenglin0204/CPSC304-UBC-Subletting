import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'listingid', headerName: 'Listing ID', width: 100 },
  { field: 'introduction', headerName: 'Message', width: 800}
];

const ApplicationsTable = (props) => {
  const { rows } = props;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

ApplicationsTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default ApplicationsTable;
