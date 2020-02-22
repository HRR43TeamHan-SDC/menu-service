const { Client } = require('pg')

// https://www.npmjs.com/package/postgres

// https://node-postgres.com/
const restaurantdb = new Client()



const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'SDC',
  password: 'postgres',
  port: 5432,
})

client.connect()
.then(() => {
  console.log('Connected to database!')
})
.catch(err => {
  if (err) throw err;
})

// restaurantdb.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })

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
  WHERE restaurants.id = $1
  `, [id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    cb(null, result.rows);
  });
};

const putRestaurantMenu = (id, cb) => {

};

const deleteRestaurantMenu = (id, cb) => {

};

const getRestaurantTitle = (id, cb) => {
  client.query('SELECT title FROM restaurants WHERE id = $1', [id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    cb(null, result.rows[0].title);
  })
};

const postRestaurant = (data, cb) => {


};

const putRestaurant = (data, cb) => {

};

const deleteRestaurant = (id, cb) => {

};

module.exports.postRestaurant = postRestaurant;
module.exports.putRestaurant = putRestaurant;
module.exports.deleteRestaurant = deleteRestaurant;
module.exports.putRestaurantMenu = putRestaurantMenu;
module.exports.deleteRestaurantMenu = deleteRestaurantMenu;
module.exports.getRestaurantMenu = getRestaurantMenu;
module.exports.getRestaurantTitle = getRestaurantTitle;