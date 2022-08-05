var connection = require('../../database/sequelize.js');

/**
 * @param req.body.sid REQUIRED 
 * @param req.body.listingid REQUIRED  
 * @param req.body.applicantid REQUIRED  
 */
module.exports.createApplication = async (req, res) => {
	try {
		if (
			req.body.sid === null ||
			req.body.listingid === null ||
			req.body.applicantid === null
		)
		return res.status(400).json({ error: 'missing required parameter(s)' });
		console.log(req.body);
		const queryRes = await connection.query(
			`
        INSERT INTO "application" ("listingid", "applicantid", "sid", "introduction")
        VALUES (?, ?, ?, ?)
      `,

			{
				type: connection.QueryTypes.INSERT,
				replacements: [
					req.body.listingid,
					req.body.applicantid,
					req.body.sid,
					req.body.introduction || null,
				],
			}
		);

		// insertUserRes[1] is the request status
		//		1 = success
		if (queryRes[1] === 1) {
			return res.status(200).send('you have successfully created a application');
		}

		return res.status(404).json({ error: 'db error' });
	} catch (err) {
		console.log(err);
		return res.status(404).json({ error: err });
	}
};

/**
 * @param req.body.applicantionid REQUIRED  
 */
module.exports.deleteApplicationById = async (req, res) => {
	try {
		if (req.body.applicationId === undefined) {
			//console.log(req.query);
			return res.status(400).json({ error: 'missing required parameter(s)' });
		}

		const deleteApplicationRes = await connection.query(
			`
			  DELETE FROM "application" WHERE "applicationid" = ?;
		  `,
			{
				type: connection.QueryTypes.DELETE,
				replacements: [req.body.applicationId],
			}
		);
		console.log(deleteApplicationRes);
		return res
			.status(200)
			.send(
				'successfully delete application with applicationid ' +
					`${req.body.applicationId}`
			);
	} catch (err) {
		return res.status(404).json({ error: err });
	}
};

/**
 * 
 * @param req.body.sid REQUIRED 
 */
module.exports.getApplicationBySid = async (req, res) => {
	if (req.body.sid === undefined) {
		//console.log(req.query);
		return res.status(400).json({ error: 'missing required parameter(s)' });
	}

	const query = 'SELECT * FROM "application" WHERE "sid" = ?';
	console.log(query);

	try {
		const queryRes = await connection.query(
			'SELECT * FROM "application" WHERE "sid" = ?',
			{
				type: connection.QueryTypes.SELECT,
				replacements: [req.body.sid],
			}
		);
		return res.status(200).json(queryRes);
	} catch (e) {
		console.error(e);
		return res.status(404).json({ error: e });
	}
};
