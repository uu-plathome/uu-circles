```shell
# number_of_membersが0の探索
mysql_update -e "SELECT
  circles.id as circle_id
  , circles.name as name
  , ci.number_of_members as number_of_members
  FROM
    circles
  INNER JOIN
    circle_information ci ON ci.circle_id = circles.id
  WHERE
    ci.number_of_members = 0
  ;" > ~/uu-circles.com/work/tmp/number_of_members_0.csv

scp u-lab:~/uu-circles.com/work/tmp/number_of_members_0.csv ./number_of_members_0.csv
```

```sql
-- number_of_membersが0をnullに変換 --

begin;

-- check --
SELECT
    circles.id as circle_id
     , circles.name as name
     , ci.number_of_members as number_of_members
FROM
    circles
        INNER JOIN
    circle_information ci ON ci.circle_id = circles.id
WHERE
    ci.number_of_members = NULL
;

-- UPDATE --
UPDATE
    circle_information
SET
    number_of_members = NULL
WHERE
    number_of_members = 0

-- check --
SELECT
    circles.id as circle_id
     , circles.name as name
     , ci.number_of_members as number_of_members
FROM
    circles
INNER JOIN
    circle_information ci ON ci.circle_id = circles.id
WHERE
    ci.number_of_members = NULL
   OR ci.number_of_members = 0
;

commit;

-- if ng; --
-- rollback; --
```

```shell
# admission_fee_per_yearが0の探索
mysql_update -e "SELECT
  circles.id as circle_id
  , circles.name as name
  , ci.admission_fee_per_year as number_of_members
  FROM
    circles
  INNER JOIN
    circle_information ci ON ci.circle_id = circles.id
  WHERE
    ci.admission_fee_per_year = 0
  ;" > ~/uu-circles.com/work/tmp/admission_fee_per_year_0.csv

scp u-lab:~/uu-circles.com/work/tmp/admission_fee_per_year_0.csv ./admission_fee_per_year_0.csv
```

```sql
-- number_of_membersが0をnullに変換 --

begin;

-- check --
SELECT
    circles.id as circle_id
     , circles.name as name
     , ci.admission_fee_per_year as admission_fee_per_year
FROM
    circles
        INNER JOIN
    circle_information ci ON ci.circle_id = circles.id
WHERE
    ci.admission_fee_per_year = NULL
OR ci.admission_fee_per_year = 0
;

-- UPDATE --
UPDATE
    circle_information
SET
    admission_fee_per_year = NULL
WHERE
    admission_fee_per_year = 0
;

-- check --
SELECT
    circles.id as circle_id
     , circles.name as name
     , ci.admission_fee_per_year as admission_fee_per_year
FROM
    circles
INNER JOIN
    circle_information ci ON ci.circle_id = circles.id
WHERE
    ci.admission_fee_per_year = null
;

commit;

-- if ng; --
-- rollback; --
```
