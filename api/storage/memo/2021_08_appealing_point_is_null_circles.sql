SELECT
    circles.id,
    circles.name,
    circles.slug,
    CONCAT('https://uu-circles.com/circles/', circles.slug) as url,
    ci.appealing_point1,
    u.email
FROM
    circles
JOIN
    circle_information ci on circles.id = ci.circle_id
JOIN
    circle_users cu on circles.id = cu.circle_id
JOIN
    users u on cu.user_id = u.id
WHERE
    ci.appealing_point1 is NULL;
