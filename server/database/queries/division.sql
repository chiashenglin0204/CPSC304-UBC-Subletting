-- DIVISION QUERY
-- Applicant view: find applications for which the applicant has yet to have included all of their supporting documents for
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
        WHERE    p1.applicationID = p2.applicationID )
    )
);