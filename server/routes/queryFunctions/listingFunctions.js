const connection = require('../../database/sequelize.js');

module.exports.getListingCountByRoomType = async (req, res) => {
	const query = `
        SELECT COUNT(l.listingID) as numListings, r.roomType
        FROM listing as l
        INNER JOIN room_in12 as r 
            ON l.resID=r.resID AND l."room#"=r."room#"
        GROUP BY r.roomType
        ORDER BY r.roomType;
    `;
	try {
		const queryRes = await connection.query(query, { type: connection.QueryTypes.SELECT });
		return res.json(queryRes);
	} catch (e) {
		console.error(e);
		return res.status(404).json({ error: e });
	}
}

/**
 * @param req.body.status REQUIRED
 */
module.exports.getMinPriceListings = async (req, res) => {
    if (req.body.status === null)
    return res.status(400).send('missing required params');
    
    try {
        const query = `
            SELECT *
            FROM listing l
            WHERE rate = (
                SELECT MIN(l2.rate)
                FROM listing l2
            ) AND status=?;
        `;
        const queryRes = await connection.query(query, {
            type: connection.QueryTypes.SELECT,
            replacements: [
                req.body.status
            ]
        });

        return res.json(queryRes);
    } catch (e) {
        console.error(e);
        return res.status(404).json({ error: e });
    }
}
