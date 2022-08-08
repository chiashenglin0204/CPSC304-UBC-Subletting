const e = require('express');
var connection = require('../../database/sequelize.js');
//var url = require('url');

/**
 * @param req.body.isApplication REQUIRED
 * @param req.body.selectedName REQUIRED
 * @param req.body.listingid REQUIRED WHEN req.body.isApplication is TRUE
 */
module.exports.selectApplicationOrListingByName = async (req, res) => {
	try {
		if (
			req.query.isApplication === 'undefined' ||
			req.query.selectedName === 'undefined' ||
			(req.query.isApplication === 'true' &&
				req.query.listingid === 'undefined')
		) {
			return res.status(400).send('missing required parameter(s)');
		}

		var tableSelection = '';
		var a = '';
		if (req.query.isApplication === 'true') {
			a = 'AND ' + `"listingid"` + ' =' + `${req.query.listingid}`;
			tableSelection = `"application"`;
		} else {
			tableSelection = `"listing"`;
		}

		//console.log(req.body);

		// function to process user's specify attribute into SQL SELECT statement
		// if no attributes specify, will return all the attributes

		var attributes = [];

		if (req.query.needSid === 'true') {
			attributes.push('sid');
		}

		if (req.query.needPhoneNum === 'true') {
			attributes.push('phone#');
		}

		if (req.query.needName === 'true') {
			attributes.push('name');
		}

		if (req.query.needGender === 'true') {
			attributes.push('gender');
		}

		if (req.query.needEmail === 'true') {
			attributes.push('email');
		}

		console.log(req.query.needSid);
		console.log(req.query.needSid === 'true');
		console.log(attributes);
		console.log(attributes.length === 0);

		var b = ``;
		if (attributes.length === 0) {
			b = '*';
		} else {
			for (let i = 0; i < attributes.length; i++) {
				const attribute = attributes[i];
				b += `"${attribute}"`;
				if (i !== attributes.length - 1) {
					b += ', ';
				}
			}
		}

		let q = `
                    Select ${b}
                    FROM ${tableSelection}
                    Natural Join "user" u
                    Where u.name = ? ${a}
		        `;

		const selectApplicationOrListingByNameRes = await connection.query(q, {
			type: connection.QueryTypes.SELECT,
			replacements: [req.query.selectedName],
		});
		console.log(selectApplicationOrListingByNameRes);
		return res.status(200).json(selectApplicationOrListingByNameRes);
		// return res.json(selectApplicationOrListingByNameRes);
	} catch (err) {
		console.log(err);
		return res.status(404).json({ error: err });
	}
};
