-- -- AGGREGATION WITH HAVING QUERY
-- -- Show all popular listing and their number of respective applications (from most to least popular)
-- SELECT  l.listingID as id, l.dateListed, l.status, l.rate, l.startDate, l.endDate, r12.roomtype, r12.gender, r34.haskitchen, r34.numRooms, r5.numBathrooms, numApps
-- FROM    (   SELECT      a.listingID, count(a.*) as numApps
--             FROM        Application a
--             GROUP BY    a.listingID
--             HAVING      count(*) > 1
--             ORDER BY    count(*)
--         ) as chosen, listing l, room_in12 r12, room_in34 r34, room_in5 r5
-- WHERE   chosen.listingID = l.listingID AND r5.numRooms=r34.numRooms AND r34.roomType=r12.roomType;

-- AGGREGATION WITH HAVING QUERY
-- Show all popular listing and their number of respective applications (from most to least popular)
SELECT      a.listingID as id, count(a.*) as numApps
FROM        Application a, listing l
WHERE       a.listingID = l.listingID
GROUP BY    a.listingID
HAVING      count(*) > 1
ORDER BY    count(*);