import { fetchDbData } from './CRUD';

/**
 * @param {string} body body of request created by JSON.stringify()
 * @param body.applicantionid REQUIRED 
 * @returns {string} success status
 */


export const deleteApplicationById = body =>
	fetchDbData(
		'DELETE',
		'http://localhost:3001/application/deleteApplicationById',
		body
	);

    // - `DELETE` - `/application/deleteApplicationById` - delete application by applicationid
    // * body.applicantionid REQUIRED  