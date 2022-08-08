-- POJECTION + JOIN QUERY
-- Applicant view: project (choose) 3-5 attributes of listings
-- rate, datelisted, startdate, enddate are defaults
-- optionally, can request minimum age to be displayed as well

-- OPTION 1 WITHOUT JOIN (HARDCODED)
SELECT  rate, dateListed, startDate, endDate
FROM    Listing;

-- OPTION 2 WITH JOIN
-- ? can be 
SELECT  rate, dateListed, startDate, endDate, minAge
FROM    Listing as l, Residence as r
WHERE   l.resID = r.resID