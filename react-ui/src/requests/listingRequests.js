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
 *
 * @param {string} searchParams URL search params created from new URLSearchParams({ sid: 0, phoneNum: '0' })
 *                              roomType REQUIRED
 * @returns {Object} json object with array of listing or error
 *  []{id, datelisted, status, rate, startdate, enddate, roomtype, gender, haskitchen, numRooms, numBathrooms}
 */
export const getCheapestAvailableListingByRoomType = (searchParams) => {
  fetchDbData(
    'GET',
    'http://localhost:3001/listing/minPriceListingByRoomType/?' + searchParams
  );
};
