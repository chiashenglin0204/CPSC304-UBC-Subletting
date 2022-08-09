import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const dateGetter = ({ value }) => value && new Date(value);

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'rate', headerName: 'Monthly Rate', width: 100, type: 'number' },
  {
    field: 'startdate',
    headerName: 'Start Date',
    width: 100,
    type: 'date',
    valueGetter: dateGetter,
  },
  {
    field: 'enddate',
    headerName: 'End Date',
    width: 100,
    type: 'date',
    valueGetter: dateGetter,
  },
  {
    field: 'roomtype',
    headerName: 'Type',
    width: 100,
  },
  { field: 'gender', headerName: 'Gender', width: 100 },
  { field: 'haskitchen', headerName: 'Kitchen', width: 100, type: 'boolean' },
  { field: 'numrooms', headerName: 'Rooms', width: 100, type: 'number' },
  {
    field: 'numbathrooms',
    headerName: 'Bathrooms',
    width: 100,
    type: 'number',
  },
];

const reducedCols = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'rate', headerName: 'Monthly Rate', width: 100, type: 'number' },
  {
    field: 'startdate',
    headerName: 'Start Date',
    width: 100,
    type: 'date',
    valueGetter: dateGetter,
  },
  { field: 'gender', headerName: 'Gender', width: 100 },
];

// const columns = [
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

const ListingsTable = (props) => {
  const { rows, reducedView } = props;

  console.log(reducedView);
  return (
    <div style={{ height: 400, width: '100%' }}>
      {rows && <DataGrid
        rows={rows}
        columns={reducedView ? reducedCols : columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  );
};

ListingsTable.propTypes = {
  rows: PropTypes.array.isRequired,
  reducedView: PropTypes.bool.isRequired,
};

export default ListingsTable;
