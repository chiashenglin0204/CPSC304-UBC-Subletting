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

/**
 * @returns {Object} json object with array of
 *  {id, datelisted, status, rate, startdate, enddate, roomtype, gender, haskitchen, numRooms, numBathrooms, numapps}
 */
 export const getPopularListings = () =>
 fetchDbData('GET', 'http://localhost:3001/listing/popularListings');


/**
 *
 * @param {string} searchParams gender REQUIRED
 * @returns {Object} json object with array of listing or error
 *  []{id, datelisted, status, rate, startdate, enddate, roomtype, gender, haskitchen, numRooms, numBathrooms}
 */
 export const getListingsByGender = (searchParams) =>
 fetchDbData(
   'GET',
   'http://localhost:3001/listing/genderFilter?' + searchParams
 );


