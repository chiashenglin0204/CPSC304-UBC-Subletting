const connection = require('../../database/sequelize.js');

/**
 * No param REQUIRED
 */
module.exports.getListingCountForRoomTypes = async (req, res) => {
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
 * @param req.body.roomType REQUIRED
 */
module.exports.getMinPriceListingsByRoomType = async (req, res) => {
    if (req.body.roomType === null)
    return res.status(400).send('missing required params');
    
    try {
        const query = `
            SELECT *
            FROM listing l
            INNER JOIN room_in12 AS r
                ON l.resID=r.resID AND l."room#"=r."room#"
            INNER JOIN (
                SELECT r.roomType, MIN(l.rate)
                FROM listing l
                INNER JOIN room_in12 AS r
                    ON l.resID=r.resID AND l."room#"=r."room#"
                WHERE l.status='AVAILABLE'
                GROUP BY r.roomType
            ) AS minRates
                ON r.roomType=minRates.roomtype AND l.rate=minRates.min
            WHERE r.roomType=?;
        `;
        const queryRes = await connection.query(query, {
            type: connection.QueryTypes.SELECT,
            replacements: [
                req.body.roomType
            ]
        });

        return res.json(queryRes);
    } catch (e) {
        console.error(e);
        return res.status(404).json({ error: e });
    }
}
