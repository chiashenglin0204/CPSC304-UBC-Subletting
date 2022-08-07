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
			return res
				.status(200)
				.json({ success: 'you have successfully created a user' });
		}

		return res.status(404).json({ error: 'db error' });
	} catch (err) {
		return res.status(404).json({ error: err });
	}
};

/**
 * No param REQUIRED
 */
module.exports.getUsers = async (req, res) => {
	const query = 'SELECT * FROM "user"';

	try {
		const queryRes = await connection.query(query, {
			type: connection.QueryTypes.SELECT,
		});
		return res.json(queryRes);
	} catch (e) {
		console.error(e);
		return res.status(404).json({ error: e });
	}
}

/**
 * @param req.body.sid REQUIRED 
 */
 module.exports.updateUser = async (req, res) => {
	try {
		if (req.body.sid === null)
			return res.status(400).send('missing required parameter(s)');
		console.log(req.body);
		const updateUserRes = await connection.query(
			`
                UPDATE "user"
                SET 
                "phone#" = COALESCE(?, "phone#"), 
                "name"= COALESCE(?, "name"),
                "gender" = COALESCE(?, "gender"), 
                "email" = COALESCE(?, "email")
                WHERE "sid" = ?;
            `,

			{
				type: connection.QueryTypes.UPDATE,
				replacements: [
					req.body.phoneNum || null,
					req.body.userName || null,
					req.body.gender || null,
					req.body.email || null,
					req.body.sid,
				],
			}
		);

		// insertUserRes[1] is the request status
		//		1 = success
		if (updateUserRes[1] === 1) {
			return res
				.status(200)
				.json({ success: 'you have successfully update a user' });
		}

		return res.status(404).json({ error: 'db error' });
	} catch (err) {
		return res.status(404).json({ error: err });
	}
};
