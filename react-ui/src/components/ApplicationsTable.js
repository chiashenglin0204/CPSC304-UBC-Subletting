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
    <div style={{ height: 280, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[3]}
      />
    </div>
  );
};

ApplicationsTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default ApplicationsTable;
