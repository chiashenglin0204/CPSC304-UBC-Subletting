SELECT *
FROM listing l
WHERE rate = (
	SELECT MIN(l2.rate)
	FROM listing l2
) AND status=?;