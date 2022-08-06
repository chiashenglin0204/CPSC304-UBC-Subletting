/**
 * @param {string} httpMethod one of 'GET', 'POST', 'DELETE', 'PUT'
 * @param {string} url
 * @param {string} body as json string created from JSON.stringify()
 */
export const fetchDbData = async (httpMethod, url, body = '') => {
  const requestOptions = {
    method: httpMethod,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (httpMethod != 'GET') requestOptions.body = body;
  try {
    const response = await fetch(url, requestOptions);
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.log(e);
  }
};
