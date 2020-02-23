const { Client } = require('pg')

// https://www.npmjs.com/package/postgres

// https://node-postgres.com/
const restaurantdb = new Client()

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: 'postgres',
  port: 5432,
})

client.connect()
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(err => {
    if (err) reject(err);
  })

// --------------------------------------------
// CREATE functions
// --------------------------------------------

const postRestaurant = (data, cb) => {
  console.log('post data', data);
  client.query(`INSERT INTO restaurants(description, title) VALUES ($1, $2) RETURNING id;`,
    [data.description, data.title],
    (err, result) => {
      if (err) {
        cb(err, null);
      }
      console.log(result);
      cb(null, result);
    });
};

const postRestaurantMenu = (data, cb) => {
  client.query(`INSERT INTO menus(restaurant_id, title, description) VALUES ($1, $2, $3) RETURNING id;`,
    [data.restaurant_id, data.title, data.description],
    (err, result) => {
      if (err) {
        cb(err, null);
      }
      cb(null, result);
    });
};

const postRestaurantSection = (data, cb) => {
  client.query(`INSERT INTO sections(menu_id, title) VALUES ($1, $2) RETURNING id;`,
    [data.menu_id, data.title],
    (err, result) => {
      if (err) {
        cb(err, null);
      }
      cb(null, result);
    });
};

const postRestaurantItem = (data, cb) => {
  client.query(`INSERT INTO items(section_id, title, description, price) VALUES ($1, $2, $3, $4) RETURNING id;`,
    [data.section_id, data.title, data.description, data.price],
    (err, result) => {
      if (err) {
        cb(err, null);
      }
      cb(null, result);
    });
};

// ------------------------------------------------------------
// READ functions
// ------------------------------------------------------------

const getRestaurantMenu = (id, cb) => {
  client.query(`
      SELECT
		MD5(title) _id,
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
  WHERE restaurants.id = $1;
  `, [id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    cb(null, result.rows);
  });
};

const getRestaurantTitle = (id, cb) => {
  client.query('SELECT title FROM restaurants WHERE id = $1', [id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    cb(null, result.rows[0].title);
  })
};


// --------------------------------------------
// UPDATE functions
// --------------------------------------------

const putRestaurant = (data, cb) => {
  client.query(`UPDATE public.restaurants	SET description=$2, title=$3 WHERE id=$1;`,
    [data.id, data.description, data.title], (err, result) => {
      if (err) {
        cb(err, null);
      }
      cb(null, result);
    });
};

const putRestaurantMenu = (data, cb) => {
  client.query(`UPDATE menus SET restaurant_id=$2, title=$3, description=$4 WHERE id=$1;`,
    [data.id, data.restaurant_id, data.title, data.description],
    (err, result) => {
      if (err) {
        cb(err, null);
      }
      cb(null, result);
    });
};

const putRestaurantSection = (data, cb) => {
  client.query(`UPDATE sections SET menu_id=$2, title=$3 WHERE id=$1;`,
    [data.id, data.menu_id, data.title],
    (err, result) => {
      if (err) {
        cb(err, null);
      }
      cb(null, result);
    });
};

const putRestaurantItem = (data, cb) => {
  client.query(`UPDATE items SET section_id=$2, title=$3, description=$4, price=$5 WHERE id=$1;`,
    [data.id, , data.section_id, data.title, data.description, data.price],
    (err, result) => {
      if (err) {
        cb(err, null);
      }
      cb(null, result);
    });
};

// --------------------------------------------
// DELETE functions
// --------------------------------------------

const deleteRestaurant = (id, cb) => {
  client.query('DELETE FROM restaurants WHERE id = $1', [id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    cb(null, result);
  });
};

const deleteRestaurantMenu = (id, cb) => {
  client.query('DELETE FROM menus WHERE id = $1', [id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    cb(null, result);
  });
};

const deleteRestaurantSection = (id, cb) => {
  client.query('DELETE FROM sections WHERE id = $1', [id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    cb(null, result);
  });
};

const deleteRestaurantItem = (id, cb) => {
  client.query('DELETE FROM items WHERE id = $1', [id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    cb(null, result);
  });
};


// CREATE
module.exports.postRestaurant = postRestaurant;
module.exports.postRestaurantMenu = postRestaurantMenu;
module.exports.postRestaurantSection = postRestaurantSection;
module.exports.postRestaurantItem = postRestaurantItem;
// READ
module.exports.getRestaurantMenu = getRestaurantMenu;
module.exports.getRestaurantTitle = getRestaurantTitle;
// UPDATE
module.exports.putRestaurant = putRestaurant;
module.exports.putRestaurantMenu = putRestaurantMenu;
module.exports.putRestaurantSection = putRestaurantSection;
module.exports.putRestaurantItem = putRestaurantItem;
// DELETE
module.exports.deleteRestaurant = deleteRestaurant;
module.exports.deleteRestaurantMenu = deleteRestaurantMenu;
module.exports.deleteRestaurantSection = deleteRestaurantSection;
module.exports.deleteRestaurantItem = deleteRestaurantItem;
