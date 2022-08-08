import { fetchDbData } from './CRUD';

/**
 * @returns {Object} json object with array of {numlistings, roomType}
 */
export const getListingCountForRoomTypes = () =>
  fetchDbData('GET', 'http://localhost:3001/listing/countForRoomTypes');

/**
 * @returns {Object} json object with array of
 *  {id, datelisted, status, rate, startdate, enddate, roomtype, gender, haskitchen, numRooms, numBathrooms}
 */
export const getAllListings = () =>
  fetchDbData('GET', 'http://localhost:3001/listing/getAll');
