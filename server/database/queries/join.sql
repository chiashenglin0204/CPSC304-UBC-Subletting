-- JOIN QUERY
-- Show listings where required gender is specified by user input 
-- SELECT  *
-- FROM    Listing l, Room_In12 r
-- WHERE   l.resID = r.resID AND l."room#"=r."room#"AND r.gender=?;

SELECT  l.listingID as id, l.dateListed, l.status, l.rate, l.startDate, l.endDate, r12.roomtype, r12.gender, r34.haskitchen, r34.numRooms, r5.numBathrooms
FROM    Listing l, room_in12 r12, room_in34 r34, room_in5 r5
WHERE   l.resID = r12.resID AND l."room#"=r12."room#" AND r5.numRooms=r34.numRooms AND r34.roomType=r12.roomType AND r12.gender=?;
