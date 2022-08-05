import { fetchDbData } from './CRUD';

/**
 * @param {string} body body of request created by JSON.stringify()
 * @param body.sid
 * @param body.name
 * @param body.phoneNum
 * @param body.gender
 * @param body.email
 * @returns {string} success status
 */
export const createUser = (body) =>
  fetchDbData('POST', 'http://localhost:3001/users/createUser', body);

/**
 *
 * @param {string} searchParams URL search params created from new URLSearchParams({ sid: 0, phoneNum: '0' })
 *                              sid REQUIRED
 *                              phoneNum REQUIRED
 * @returns {Object} json object with user or error
 */
export const getUser = (searchParams) =>
  fetchDbData(
    'GET',
    'http://localhost:3001/users/byIdPhoneNum?' + searchParams
  );
