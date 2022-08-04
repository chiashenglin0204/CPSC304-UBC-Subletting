
export const post = async (url, body) => {
	const response = await fetch(url, {
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

export const get = async (url, body) => {
    const response = await fetch(url, {
        method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		body: body,
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const users = await response.json();
    console.log(users);
    return users;
};
