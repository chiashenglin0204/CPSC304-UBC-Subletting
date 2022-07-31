const { readFileSync } = require('fs');
const connection = require('../../database/sequelize.js');

module.exports.getListingCountByRoomType = async (req, res) => {
	const query = readFileSync('./database/aggregation_groupby.sql', 'utf8');
	try {
		const queryRes = await connection.query(query, { type: connection.QueryTypes.SELECT });
		return res.json(queryRes);
	} catch (e) {
		console.error(e);
		return res.status(404).json(e);
	}
}

