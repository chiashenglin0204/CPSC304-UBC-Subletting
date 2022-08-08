-- DIVISION QUERY
-- Applicant view: find applications for which the applicant has yet to have included all of their supporting documents for
SELECT  a1.applicationID as id, a1.listingID, a1.introduction
FROM    Application a1
WHERE   a1.applicantID = ?
EXCEPT (
    SELECT  DISTINCT p1.applicationID as id, a2.listingID, a2.introduction
    FROM    partOf p1, application a2
    WHERE NOT EXISTS (
        (SELECT S.documentID
        FROM   Supporting_Document123 S
        WHERE  S.applicantID = ?)
        EXCEPT
        (SELECT  p2.documentID
        FROM     partOf p2
        WHERE    p1.applicationID = p2.applicationID )
    )
);