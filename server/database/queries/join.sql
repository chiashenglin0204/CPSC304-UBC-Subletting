-- JOIN QUERY
-- Show listings where required gender is specified by user input 
SELECT  *
FROM    Listing l, Room_In12 r
WHERE   l.resID = r.resID AND r.gender=?;
