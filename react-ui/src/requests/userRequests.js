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
export const createUser = body =>
	fetchDbData('POST', 'http://localhost:3001/users/createUser', body);

/**
 * @param {string} body body of request created by JSON.stringify()
 * @param body.sid
 * @param body.name
 * @param body.phoneNum
 * @param body.gender
 * @param body.email
 * @returns {string} success status
 */
export const updateUser = body =>
	fetchDbData('PUT', 'http://localhost:3001/users/updateUser', body);
