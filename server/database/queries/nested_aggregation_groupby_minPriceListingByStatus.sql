SELECT *
FROM listing l
INNER JOIN room_in12 AS r
	ON l.resID=r.resID AND l."room#"=r."room#"
INNER JOIN (
	SELECT r.roomType, MIN(l.rate)
	FROM listing l
	INNER JOIN room_in12 AS r
		ON l.resID=r.resID AND l."room#"=r."room#"
	WHERE l.status='AVAILABLE'
	GROUP BY r.roomType
) AS minRates
	ON r.roomType=minRates.roomtype AND l.rate=minRates.min
WHERE r.roomType='A';