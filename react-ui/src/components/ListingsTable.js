import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const columns = [
  { field: 'datelisted', headerName: 'Date Listed', width: 100, type: 'date' },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'rate', headerName: 'Monthly Rate', width: 100, type: 'number' },
  { field: 'startdate', headerName: 'Start Date', width: 100 },
  { field: 'enddate', headerName: 'End Date', width: 100, type: 'date' },
  { field: 'roomtype', headerName: 'Type', width: 100, type: 'date' },
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

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const ListingsTable = (props) => {
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

ListingsTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default ListingsTable;
