const e = require('express');
var connection = require('../../database/sequelize.js');

/**
 * @param req.body.isApplication REQUIRED 
 * @param req.body.selectedName REQUIRED  
 * @param req.body.listingid REQUIRED WHEN req.body.isApplication is TRUE
 */
module.exports.selectApplicationOrListingByName = async (req, res) => {
	try {
		if (
			req.body.isApplication === undefined ||
			req.body.selectedName === undefined ||
			(req.body.isApplication && req.body.listingid === undefined)
		) {
			return res.status(400).send('missing required parameter(s)');
		}

		var tableSelection = '';
		var a = '';
		if (req.body.isApplication) {
			a = "AND " + `"listingid"` + " =" + `${req.body.listingid}`;
			tableSelection = `"application"`;
		} else {
			tableSelection = `"listing"`;
		}

		//console.log(req.body);
		
		// function to process user's specify attribute into SQL SELECT statement
		// if no attributes specify, will return all the attributes
		var attributes = '';
		if (req.body.attributeSelected === undefined) {
			attributes = '*';
		} else {
			let temp = req.body.attributesSelected;

			for (let i = 0; i < temp.length; i++) {
				const attribute = temp[i];
				attributes += `"${attribute}"`;
				if (i !== temp.length - 1) {
					attributes += ', ';
				}
			}
		}
		
		let q = `
                    Select ${attributes}
                    FROM ${tableSelection}
                    Natural Join "user" u
                    Where u.name = ? ${a}
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
