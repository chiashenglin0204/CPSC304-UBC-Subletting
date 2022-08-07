import { fetchDbData } from './CRUD';

/**
 * @param {string} body body of request created by JSON.stringify()
 * @param body.sid
 * @returns {string} success status
 */
export const createSubletter = (body) =>
  fetchDbData('POST', 'http://localhost:3001/subletter/createSubletter', body);


/**
 *
 * @param {string} searchParams URL search params created from new URLSearchParams({ sid: 0, phoneNum: '0' })
 *                              sid REQUIRED
 * @returns {Object} json object with subletter[0](applicantid, sid) or error
 */
export const getSubletter = (searchParams) =>
  fetchDbData(
    'GET',
    'http://localhost:3001/subletter/getBySid?' + searchParams
  );
