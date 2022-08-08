import { fetchDbData } from './CRUD';

/**
 * @param {string} body body of request created by JSON.stringify()
 * @param body.sid
 * @returns {string} success status
 */
export const createApplicant = (body) =>
  fetchDbData('POST', 'http://localhost:3001/applicant/createApplicant', body);

/**
 *
 * @param {string} searchParams URL search params created from new URLSearchParams({ sid: 0, phoneNum: '0' })
 *                              sid REQUIRED
 * @returns {Object} json object with applicant[0](applicantid, sid) or error
 */
export const getApplicant = (searchParams) =>
  fetchDbData(
    'GET',
    'http://localhost:3001/applicant/getBySid?' + searchParams
  );

export const getAllApps = (searchParams) =>
  fetchDbData(
    'GET', 
    'http://localhost:3001/application/getApplicationBySid?' + searchParams
  );

/**
 * @param {string} searchParams applicantID required
 * @returns {Object} json object with array of applications
 */
export const getUnfinishedApps = (searchParams) =>
  fetchDbData(
    'GET',
    'http://localhost:3001/applicant/unfinishedApps?' + searchParams
  );
