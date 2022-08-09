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
export const selectApplicationOrListingByName = searchParams => {
	return fetchDbData(
		'GET',
		'http://localhost:3001/subletter/selectApplicationOrListingByName?' +
			new URLSearchParams(searchParams)
	);
};	