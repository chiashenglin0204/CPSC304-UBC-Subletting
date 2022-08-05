import { fetchDbData } from "./CRUD";

/**
 * @param {string} body body of request created by JSON.stringify()
 * @param body.sid
 * @param body.name
 * @param body.phoneNum
 * @param body.gender
 * @param body.email
 * @returns {string} success status
 */
export const createUser = (body) => fetchDbData('POST', 'http://localhost:3001/users/createUser', body)

// async (body) => {
// 	const response = await fetch('http://localhost:3001/users/createUser', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: body,
// 	});
// 	if (!response.ok) {
// 		const message = `An error has occured: ${response.status}: ${response}`;
// 		throw new Error(message);
// 	}

// 	const jsonData = await response.json();
// 	if (jsonData.error) throw new Error(jsonData.error);
// 	console.log(jsonData);
// 	return jsonData;
// };
