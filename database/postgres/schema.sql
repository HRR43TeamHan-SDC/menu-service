 DROP TABLE items;
 DROP TABLE sections;
 DROP TABLE menus;
 DROP TABLE restaurants;


-- Table: "Restaurants".restaurants
CREATE TABLE restaurants
(
    id SERIAL PRIMARY KEY,
    description text COLLATE pg_catalog."default",
    title character varying(128) COLLATE pg_catalog."default",
    CONSTRAINT restaurants_id_key UNIQUE (id)
);

CREATE UNIQUE INDEX pki_restaurants_id
    ON restaurants USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;



-- Table: "Restaurants".menus
CREATE TABLE menus
(
    id SERIAL PRIMARY KEY,
    restaurant_id integer NOT NULL,
    title character varying(256) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    CONSTRAINT menus_restaurant_id_fkey FOREIGN KEY (restaurant_id)
        REFERENCES restaurants (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE INDEX fki_menus_restaurant_id_fkey
    ON menus USING btree
    (restaurant_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE UNIQUE INDEX pki_menus_id_pkey
    ON menus USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;



-- Table: "Restaurants".sections
CREATE TABLE sections
(
    id SERIAL PRIMARY KEY,
    menu_id integer NOT NULL,
    title character varying(256) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT sections_menu_id_fkey FOREIGN KEY (menu_id)
        REFERENCES menus (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE INDEX fki_sections_menu_id_fkey
    ON sections USING btree
    (menu_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE UNIQUE INDEX pki_sections_id_pkey
    ON sections USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;



-- Table: "Restaurants".items
CREATE TABLE items
(
    id SERIAL PRIMARY KEY,
    section_id integer NOT NULL,
    title character varying(256) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    price character varying(8) COLLATE pg_catalog."default",
    CONSTRAINT items_section_id_fkey FOREIGN KEY (section_id)
        REFERENCES sections (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE INDEX fki_items_section_id_fkey
    ON items USING btree
    (section_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE UNIQUE INDEX pki_items_id_pkey
    ON items USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;