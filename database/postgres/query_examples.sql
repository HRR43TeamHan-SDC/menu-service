SELECT json_build_object('data', r) restaurants
FROM (
      SELECT
        restaurants.id id,
        title,
        description,
         (
           SELECT json_agg(row_to_json(m))
           FROM (
                  SELECT
                    id menu_id,
                    title,
                    description,
                    (
                      SELECT json_agg(row_to_json(s))
                      FROM (
                             SELECT
                               id section_id,
                               title,
                               (
                                 SELECT json_agg(row_to_json(i))
                                 FROM
                                 (
                                   SELECT
                                    id item_id,
                                    title,
                                    price
                                    FROM items
                                    WHERE items.section_id = sections.id
                                 ) i
                               ) AS items
                             FROM sections
                             WHERE sections.menu_id = menus.id
                           ) s
                    ) AS sections
                  FROM menus
                  WHERE menus.restaurant_id = restaurants.id
                ) m
         ) AS menus
       FROM restaurants
  WHERE restaurants.id = 10
) r

-- ______________________________________________________________________________________
--
-- The following query will return the same data structure but takes much much longer
-- due to using CTE queries instead of INDEX queries
-- ______________________________________________________________________________________

with items as (
	select
		section_id,
		json_agg(
			json_build_object(
				'title', i.title,
				'description', i.description,
				'price', i.price
				)
		) items
	from items i
	group by i.section_id
),
sections as (
	select
        menu_id,
        json_agg(
            json_build_object(
                'title', s.title,
				'items', items
                )
            ) sections
    from sections s
	left join items i on i.section_id = s.menu_id
	where i.section_id = s.menu_id
	group by s.menu_id
),
menus as (
    select
        restaurant_id,
        json_agg(
            json_build_object(
                'title', m.title,
                'description', m.description,
				'sections', sections
                )
            ) menus
    from menus m
	left join sections s on s.menu_id = m.id
	where s.menu_id = m.id
    group by m.restaurant_id
)
select
    json_build_object(
                'title', r.title,
                'description', r.description,
				'menus', menus

    ) restaurants
	from restaurants r
	left join menus m on m.restaurant_id = r.id
	where r.id = 1