const connection = require('../../database/sequelize.js');

/**
 * @param req.body.applicantID REQUIRED
 */
module.exports.getUnfinishedApps = async (req, res) => {
  if (req.body.applicantID == null)
    return res.status(400).json({ error: 'missing applicant ID' });

  try {
    const query = `
            SELECT  a.applicationID
            FROM    Application a
            WHERE   a.applicantID = ?
            EXCEPT (
                SELECT  p1.applicationID
                FROM    partOf p1
                WHERE NOT EXISTS (
                    (SELECT S.documentID
                    FROM   Supporting_Document123 S
                    WHERE  S.applicantID = ?)
                    EXCEPT
                    (SELECT  p2.documentID
                    FROM     partOf p2
                    WHERE    p1.applicationID = p2.applicationID)
                )
            );
        `;
    const queryRes = await connection.query(query, {
      type: connection.QueryTypes.SELECT,
      replacements: [req.body.applicantID, req.body.applicantID],
    });
    return res.json(queryRes);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ error: e });
  }
};
