-- AGGREGATION WITH HAVING QUERY
-- Show all popular listing and their number of respective applications (from most to least popular)
SELECT      listingID, count(*)
FROM        Application
GROUP BY    listingID
HAVING      count(*) > 1
ORDER BY    count(*)