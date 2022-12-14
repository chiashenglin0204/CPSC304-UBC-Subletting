# UBC Subletting
### by: Kenny Cheng, Yuka Ma, Chia-Sheng Lin

## ER Diagram
![ER Diagram](/Assets/ER_diagram.png)

## Additional Information
[Miro Board for User Workflow Brainstorming](https://miro.com/app/board/uXjVOi0cFyc=/?share_link_id=80064679319)

[Development Timeline](https://docs.google.com/document/d/1ZinlnnpGPXqVrynhi7kIM-f25zKBQPpT66qy30IJ35U/edit?usp=sharing)

## Project Description
UBC Subletting is a web app created as a hub for UBC students on residence to sublet and/or apply for rooms. With our application, there is no longer the need to join several facebook groups or scroll down endless craigslist listings. 

The database of our application was setup using postgreSQL Additionally, we used NodeJS and React to create a backend api and front end UI for our application.

UBC Subletting allows a User to create an account using their student ID and contact information to take a look at the features of the app. When the user is ready, they can choose to become a Subletter and/or an Applicant. 

A subletter will have access to all listings and all the applications made towards their own listing (but not for other subletter listings). They may additionally schedule a viewing with certain applicants. 

As an Applicant, the user is able to see all listings, filter listings based on various parameters based on the user’s personal interest, and view a full or condensed view of all applications. Additionally, applicants have the ability to view various aggregated information about listings such as popular listings, the number of listings based on the types of rooms. Finally, the applicant is also able to view incomplete applications if they haven’t included all or any of their supporting documents.


## Queries

Insert
```sql
INSERT INTO "user" ("sid", "name", "phone#", "gender", "email")
VALUES (?, ?, ?, ?, ?);
```

Update
```sql
UPDATE "user"
SET 
"phone#" = COALESCE(?, "phone#"), 
"name"= COALESCE(?, "name"),
"gender" = COALESCE(?, "gender"), 
"email" = COALESCE(?, "email")
WHERE "sid" = ?;
```

Delete
```sql
DELETE FROM "application" WHERE "applicationid" = ?
```

Select
```sql
Select ?
FROM ? –-subletter can specify viewing application or listing–-
Natural Join "user" u
Where u.name = ?
```

Projection
```sql
SELECT l.listingid AS id, l.status, l.rate, l.startdate, r12.roomtype
FROM listing l
NATURAL JOIN room_in12 r12;
```

Join
```sql
SELECT  l.listingID as id, l.dateListed, l.status, l.rate, l.startDate, l.endDate, 
        r12.roomType, r12.gender, r34.haskitchen, r34.numRooms, r5.numBathrooms
FROM    Listing l, room_in12 r12, room_in34 r34, room_in5 r5
WHERE   l.resID = r12.resID AND l."room#"=r12."room#" AND r5.numRooms=r34.numRooms AND r34.roomType=r12.roomType AND r12.gender=?;
```

Aggregation with GROUP BY
```sql
SELECT COUNT(l.listingID), r.roomType
FROM listing as l
INNER JOIN room_in12 as r 
	ON l.resID=r.resID AND l."room#"=r."room#"
GROUP BY r.roomType
ORDER BY r.roomType;
```

Aggregation with HAVING
```sql
SELECT      a.listingID as id, count(a.*) as numApps
FROM        Application a, listing l
WHERE       a.listingID = l.listingID
GROUP BY    a.listingID
HAVING      count(*) > 1
ORDER BY    count(*) DESC;
```

Nested Aggregation with GROUP BY
```sql
CREATE VIEW ListingWithRoom AS 
    SELECT l.listingid AS id, l.datelisted, l.status, l.rate, l.startdate, l.enddate, r12.roomtype, r12.gender, r34.haskitchen, r34.numRooms, r5.numBathrooms
    FROM listing l
    NATURAL JOIN room_in12 r12
    NATURAL JOIN room_in34 r34
    NATURAL JOIN room_in5 r5;
SELECT *
    FROM ListingWithRoom l
    INNER JOIN (
      SELECT l2.roomType, MIN(l2.rate)
      FROM ListingWithRoom l2
      WHERE l2.status='AVAILABLE'
      GROUP BY l2.roomType
    ) AS minRates
      ON l.roomType=minRates.roomtype AND l.rate=minRates.min
    WHERE l.roomType=?;
DROP VIEW ListingWithRoom;
```

Division
```sql
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
```




