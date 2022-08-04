/**
 *
 * @param {number} sid
 * @param {string} name
 * @param {string} phoneNum
 * @param {string} gender
 * @param {string} email
 * @returns {string} success status
 */
export const createUser = async (body) => {
	const response = await fetch('http://localhost:3001/users/createUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: body,
	});
	if (!response.ok) {
		const message = `An error has occured: ${response.status}: ${response}`;
		throw new Error(message);
	}

	const jsonData = await response.json();
	if (jsonData.error) throw new Error(jsonData.error);
	console.log(jsonData);
	return jsonData;
};
