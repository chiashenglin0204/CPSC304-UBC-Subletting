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
 * @param req.query.roomType REQUIRED
 */
module.exports.getMinPriceListingsByRoomType = async (req, res) => {
  if (req.query.roomType === undefined)
    return res.status(400).json({ error: 'missing required params' });

  const query = [
    `CREATE VIEW ListingWithRoom AS 
    SELECT l.listingid AS id, l.datelisted, l.status, l.rate, l.startdate, l.enddate, r12.roomtype, r12.gender, r34.haskitchen, r34.numRooms, r5.numBathrooms
    FROM listing l
    NATURAL JOIN room_in12 r12
    NATURAL JOIN room_in34 r34
    NATURAL JOIN room_in5 r5;`,
    `SELECT *
    FROM ListingWithRoom l
    INNER JOIN (
      SELECT l2.roomType, MIN(l2.rate)
      FROM ListingWithRoom l2
      WHERE l2.status='AVAILABLE'
      GROUP BY l2.roomType
    ) AS minRates
      ON l.roomType=minRates.roomtype AND l.rate=minRates.min
    WHERE l.roomType=?;`,
    `DROP VIEW ListingWithRoom;`,
  ].join(' ');

  try {
    const queryRes = await connection.query(query, {
      type: connection.QueryTypes.SELECT,
      replacements: [req.query.roomType]
    });
    return res.status(200).json(queryRes);
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
    SELECT      a.listingID as id, count(a.*) as numApps
    FROM        Application a, listing l
    WHERE       a.listingID = l.listingID
    GROUP BY    a.listingID
    HAVING      count(*) > 1
    ORDER BY    count(*) DESC;
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
 * No param REQUIRED
 */
 module.exports.getAllListingsReduced = async (req, res) => {
  const query = `
      SELECT l.listingid AS id, l.status, l.rate, l.startdate, r12.roomtype
      FROM listing l
      NATURAL JOIN room_in12 r12;
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
 * @param req.query.gender REQUIRED
 */
module.exports.getListingByGender = async (req, res) => {
  if (req.query.gender === undefined) 
    return res.status(400).json({ error: 'missing required params' });

  const query = `
    SELECT  l.listingID as id, l.dateListed, l.status, l.rate, l.startDate, l.endDate, r12.roomtype, r12.gender, r34.haskitchen, r34.numRooms, r5.numBathrooms
    FROM    Listing l, room_in12 r12, room_in34 r34, room_in5 r5
    WHERE   l.resID = r12.resID AND l."room#"=r12."room#" AND r5.numRooms=r34.numRooms AND r34.roomType=r12.roomType AND r12.gender=?;  
  `;
  
  try {
    const queryRes = await connection.query(query, {
      type: connection.QueryTypes.SELECT,
      replacements: [req.query.gender]
    });
    // return res.json(queryRes);
    return res.status(200).json(queryRes);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ error: e });
  };

};
