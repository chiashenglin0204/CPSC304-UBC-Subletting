import { fetchDbData } from "./CRUD";

/**
 * @returns {Object} json object with array of {numlistings, roomType}
 */
 export const getListingCountForRoomTypes = () =>
 fetchDbData(
   'GET',
   'http://localhost:3001/listing/countForRoomTypes'
 );