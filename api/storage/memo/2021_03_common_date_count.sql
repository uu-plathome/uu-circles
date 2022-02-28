SELECT
    ci.circle_id,
    (
        IFNULL(ci.common_date_of_activity_monday, 0) +
        IFNULL(ci.common_date_of_activity_tuesday, 0) +
        IFNULL(ci.common_date_of_activity_wednesday, 0) +
        IFNULL(ci.common_date_of_activity_thursday, 0) +
        IFNULL(ci.common_date_of_activity_friday, 0) +
        IFNULL(ci.common_date_of_activity_saturday, 0) +
        IFNULL(ci.common_date_of_activity_sunday, 0)
    )
FROM circle_information ci
WHERE
    (
        IFNULL(ci.common_date_of_activity_monday, 0) +
        IFNULL(ci.common_date_of_activity_tuesday, 0) +
        IFNULL(ci.common_date_of_activity_wednesday, 0) +
        IFNULL(ci.common_date_of_activity_thursday, 0) +
        IFNULL(ci.common_date_of_activity_friday, 0) +
        IFNULL(ci.common_date_of_activity_saturday, 0) +
        IFNULL(ci.common_date_of_activity_sunday, 0)
    )  > 2


SELECT
    ci.circle_id,
    (
        IFNULL(ci.online_date_of_activity_monday, 0) +
        IFNULL(ci.online_date_of_activity_tuesday, 0) +
        IFNULL(ci.online_date_of_activity_wednesday, 0) +
        IFNULL(ci.online_date_of_activity_thursday, 0) +
        IFNULL(ci.online_date_of_activity_friday, 0) +
        IFNULL(ci.online_date_of_activity_saturday, 0) +
        IFNULL(ci.online_date_of_activity_sunday, 0)
    )
FROM circle_information ci
WHERE
    (
        IFNULL(ci.online_date_of_activity_monday, 0) +
        IFNULL(ci.online_date_of_activity_tuesday, 0) +
        IFNULL(ci.online_date_of_activity_wednesday, 0) +
        IFNULL(ci.online_date_of_activity_thursday, 0) +
        IFNULL(ci.online_date_of_activity_friday, 0) +
        IFNULL(ci.online_date_of_activity_saturday, 0) +
        IFNULL(ci.online_date_of_activity_sunday, 0)
    )  > 2
