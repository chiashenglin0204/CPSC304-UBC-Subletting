var connection = require('../../database/sequelize.js');

/**
 * @param req.body.sid REQUIRED
 * @param req.body.userName REQUIRED
 * @param req.body.phoneNum REQUIRED
 * @param req.body.gender REQUIRED
 * @param req.body.email
 */
module.exports.createUser = async (req, res) => {
	try {
		if (
			req.body.sid === undefined ||
			req.body.userName === undefined ||
			req.body.phoneNum === undefined ||
			req.body.gender === undefined
		)
			return res.status(400).send(
				`
				missing required parameter(s): 
					sid: ${req.body.sid}, 
					userName: ${req.body.userName}, 
					phoneNum: ${req.body.phoneNum}, 
					gender: ${req.body.gender}
					email: ${req.body.email}
				`);
		const insertUserRes = await connection.query(
			`
				INSERT INTO "user" ("sid", "name", "phone#", "gender", "email")
				VALUES (?, ?, ?, ?, ?)
      		`,
			{
				type: connection.QueryTypes.INSERT,
				replacements: [
					req.body.sid,
					req.body.userName,
					req.body.phoneNum,
					req.body.gender,
					req.body.email || null,
				],
			}
		);

		// insertUserRes[1] is the request status
		//		1 = success
		if (insertUserRes[1] === 1) {
			return res.status(200).send('you have successfully created a user');
		}

		return res.status(404).json({ error: 'db error' });
	} catch (err) {
		return res.status(404).json({ error: err });
	}
};

module.exports.getUsers = async (req, res) => {
	const query = 'select * from "user";';

	try {
		const queryRes = await connection.query(query, {
			type: connection.QueryTypes.SELECT,
		});
		return res.json(queryRes);
	} catch (e) {
		console.error(e);
		return res.status(404).json({ error: e });
	}
};
