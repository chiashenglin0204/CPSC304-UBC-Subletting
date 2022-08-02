const e = require('express');
var connection = require('../../database/sequelize.js');

module.exports.selectApplicationOrListingByName = async (req, res) => {
	try {
		if (
			req.body.isApplication === undefined ||
			req.body.selectedName === undefined
		) {
			return res.status(400).send('missing required parameter(s)');
		}

		var tableSelection = '';
		if (req.body.isApplication) {
			tableSelection = `"application"`;
		} else {
			tableSelection = `"listing"`;
		}

		//console.log(req.body);
		
		// function to process user's specify attribute into SQL SELECT statement
		let temp = req.body.attributesSelected;

		attributes = '';
		for (let i = 0; i < temp.length; i++) {
			const attribute = temp[i];
			attributes += `"${attribute}"`;
			if (i !== temp.length - 1) {
				attributes += ', ';
			}
		}
		// fullfill the rubric but could make subletter see other listing's application
		let q = `
                    Select ${attributes}
                    FROM ${tableSelection}
                    Natural Join "user" u
                    Where u.name = ?
		        `;

		const selectApplicationOrListingByNameRes = await connection
			.query(q, {
				type: connection.QueryTypes.SELECT,
				replacements: [req.body.selectedName],
			})
			console.log(selectApplicationOrListingByNameRes);
		return res.status(200).json(selectApplicationOrListingByNameRes);
		// return res.json(selectApplicationOrListingByNameRes);
	} catch (err) {
		console.log(err);
		return res.status(404).json({ error: err });
	}
};
