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
    const queryRes = await connection.query(query, {
      type: connection.QueryTypes.SELECT,
    });
    return res.json(queryRes);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ error: e });
  }
};

/**
 * @param req.body.roomType REQUIRED
 */
module.exports.getMinPriceListingsByRoomType = async (req, res) => {
  if (req.body.roomType === null)
    return res.status(400).json({ error: 'missing required params' });

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
      replacements: [req.body.roomType],
    });

    return res.json(queryRes);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ error: e });
  }
};

/**
 * No param REQUIRED
 */
module.exports.getPopularListings = async (req, res) => {
  const query = `
    SELECT      listingID, count(*)
    FROM        Application
    GROUP BY    listingID
    HAVING      count(*) > 1
    ORDER BY    count(*);
    `;
  try {
    const queryRes = await connection.query(query, {
      type: connection.QueryTypes.SELECT,
    });
    return res.json(queryRes);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ error: e });
  }
};

/**
 * No param REQUIRED
 */
module.exports.getAllListings = async (req, res) => {
  const query = `
      SELECT l.listingid AS id, l.datelisted, l.status, l.rate, l.startdate, l.enddate, r12.roomtype, r12.gender, r34.haskitchen, r34.numRooms, r5.numBathrooms
      FROM listing l
      NATURAL JOIN room_in12 r12
      NATURAL JOIN room_in34 r34
      NATURAL JOIN room_in5 r5;
    `;
  try {
    const queryRes = await connection.query(query, {
      type: connection.QueryTypes.SELECT,
    });
    return res.json(queryRes);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ error: e });
  }
};

/**
 * @param {req.body.gender} REQUIRED
 */
module.exports.getListingByGender = async (req, res) => {
  if (req.body.gender == null) 
    return res.status(400).json({ error: 'missing required params' });

  const query = `
    SELECT  l.listingID, l.dateListed, l.rate, r.roomType, r.gender
    FROM    Listing l, Room_In12 r
    WHERE   l.resID = r.resID AND r.gender=?;
  `;
  
  try {
    const queryRes = await connection.query(query, {
      type: connection.QueryTypes.SELECT,
      replacements: [req.body.gender]
    });
    return res.json(queryRes);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ error: e });
  };

};

// /**
//  * @param req.body.minAge OPTIONAL
//  */
// module.exports.getSimpleListingsDisplay = async (req, res) => {
//   const query1 =`
//     SELECT  rate, dateListed, startDate, endDate
//     FROM    Listing;
//   `;
//   const query2 =`
//     SELECT  rate, dateListed, startDate, endDate, minAge
//     FROM    Listing l, Residence r
//     WHERE   l.resID = r.resID;
//   `;
//   if (req.body.minAge == null || req.body.minAge == false) {
//     try {
//       const queryRes1 = await connection.query(query1, {type: connection.QueryTypes.SELECT});
//       return res.json(queryRes1);
//     } catch (e) {
//       console.error(e);
//       return res.status(404).json({ error: e});
//     }
//   } else {
//     try {
//       const queryRes2 = await connection.query(query2, {type: connection.QueryTypes.SELECT});
//       return res.json(queryRes2);
//     } catch (e) {
//       console.error(e);
//       return res.status(404).json({ error: e});
//     }
//   }
// }
