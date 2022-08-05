/**
 * @param {string} httpMethod one of 'GET', 'POST', 'DELETE', 'PUT'
 * @param {string} url
 * @param {string} body as json string created from JSON.stringify()
 */
export const fetchDbData = async (httpMethod, url, body = '') => {
	const response = await fetch(url, {
		method: httpMethod,
		headers: {
			'Content-Type': 'application/json',
		},
		body: body,
	});
	if (!response.ok) {
		const message = `error ${response.status}: ${response}`;
		throw new Error(message);
	}

	const jsonData = await response.json();
	if (jsonData.error) throw new Error(jsonData.error);
	console.log(jsonData);
	return jsonData;
};
