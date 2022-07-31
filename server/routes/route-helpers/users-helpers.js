var connection = require('../../database/sequelize.js');

const createUser = async (req, res) => {
	try {
		if (
			req.body.userName === null ||
			req.body.phoneNum === null ||
			req.body.gender === null
		)
			return res.status(400).send('missing required parameter(s)');

		const insertUserRes = await connection.query(
			`
        INSERT INTO users ("name", "phone#", "gender")
        VALUES (?, ?, ?)
      `,

			{
				type: connection.QueryTypes.INSERT,
				replacements: [req.body.userName, req.body.phoneNum, req.body.gender],
			}
		);
           // console.log(insertUserRes);
		if (insertUserRes[1] === 1) {
			return res.status(200).send('you have successfully created a user');
		}

		return res.status(404).json({ error: 'db error' });
	} catch (err) {
		return res.status(404).json({ error: err });
	}
};

module.exports = createUser;
