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

/**
 * @param req.body.sid REQUIRED
 */
module.exports.createApplicant = async (req, res) => {
  try {
    if (req.body.sid === undefined)
      return res.status(400).json({
        error: `missing required parameter(s): sid: ${req.body.sid}`,
      });
    const insertApplicantRes = await connection.query(
      `
                  INSERT INTO Applicant(sid)
                  VALUES (?);
                `,
      {
        type: connection.QueryTypes.INSERT,
        replacements: [req.body.sid],
      }
    );

    // insertApplicantRes[1] is the request status
    //		1 = success
    if (insertApplicantRes[1] === 1) {
      return res
        .status(200)
        .json({ success: 'you have successfully created an applicant' });
    }

    return res.status(404).json({ error: 'db error' });
  } catch (err) {
    return res.status(404).json({ error: err });
  }
};

/**
 *
 * @param {*} req.query.sid REQUIRED
 */
module.exports.getApplicantBySid = async (req, res) => {
  const query = 'SELECT * FROM Applicant WHERE sid=?';
  if (req.body.sid === undefined)
    return res
      .status(400)
      .json({ error: 'missing required query parameter(s)' });

  try {
    const queryRes = await connection.query(query, {
      type: connection.QueryTypes.SELECT,
      replacements: [req.body.sid],
    });
    return res.json(queryRes);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ error: e });
  }
};
