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


module.exports.getPopularListings = async (req, res) => {
    const query = `
    SELECT      listingID, count(*)
    FROM        Application
    GROUP BY    listingID
    HAVING      count(*) > 1
    ORDER BY    count(*);
    `;
    try {
        const queryRes = await connection.query(query, { type: connection.QueryTypes.SELECT });
        return res.json(queryRes);
    } catch (e) {
        console.error(e);
        return res.status(404).json({ error: e});
    }
};

// /**
//  * @param req.body.att1 REQUIRED
//  * @param req.body.att2 REQUIRED
//  * @param req.body.att3 REQUIRED
//  * @param req.body.att4
//  * @param req.body.att5
//  */
// module.exports.getCustomListingsDisplay = async (req, res) => {
//     if (
//         req.body.att1 == null ||
//         req.body.att2 == null ||
//         req.body.att3 == null
//     )
//     return res.status(400).send('missing 1-3 parameters');

//     try {
//         const query =`
//             SELECT  ?, ?, ?, ?, ?
//             FROM    Listing as l, Residence as r
//             WHERE   l.resID = r.resID;
//         `;
//         const queryRes = await connection.query ( query, {
//             type: connection.QueryTypes.SELECT,
//             replacements: [
//                 req.body.att1,
//                 req.body.att2,
//                 req.body.att3,
//                 req.body.att4 || null,
//                 req.body.att5 || null
//             ]
//         });
        
//     } catch (e) {
//         console.error(e);
//         return res.status(404).json({ error: e});
//     }
// }

// module.exports.getCustomListingsDisplay = async (req, res) => {
//     var givenAtt = 0;
//     if (req.body.buildingName == true) givenAtt++;
//     if (req.body.rate == true) givenAtt++; 
//     if (req.body.streetAddress == true) givenAtt++; 
//     if (req.body.minAge == true) givenAtt++; 
//     if (req.body.dateListed == true) givenAtt++;

//     if (givenAtt < 3) return res.status(400).send('missing 1-3 parameters');

//     try {
//         const query =`
//             SELECT  ?, ?, ?, ?, ?
//             FROM    Listing as l, Residence as r
//             WHERE   l.resID = r.resID;
//         `;
//         const queryRes = await connection.query ( query, {
//             type: connection.QueryTypes.SELECT,
//             replacements: [
//                 !req.body.buildingName || buildingname,
//                 !req.body.rate || rate,
//                 !req.body.streetAddress || streetaddress,
//                 !req.body.minAge || minage,
//                 !req.body.dateListed || datelisted
//             ]
//         });
        
//     } catch (e) {
//         console.error(e);
//         return res.status(404).json({ error: e});
//     }
// }