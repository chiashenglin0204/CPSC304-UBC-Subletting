SELECT COUNT(l.listingID) as numListings, r.roomType
FROM listing as l
INNER JOIN room_in12 as r 
	ON l.resID=r.resID AND l."room#"=r."room#"
GROUP BY r.roomType
ORDER BY r.roomType;