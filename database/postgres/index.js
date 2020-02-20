const postgres = require('postgres');


// https://www.npmjs.com/package/postgres

const sql = postgres('postgres://postgres:password@localhost:5432/SDC', {
  host        : '',         // Postgres ip address or domain name
  port        : 5432,       // Postgres server port
  path        : '',         // unix socket path (usually '/tmp')
  database    : '',         // Name of database to connect to
  username    : '',         // Username of database user
  password    : '',         // Password of database user
  ssl         : false,      // True, or options for tls.connect
  max         : 10,         // Max number of connections
  timeout     : 0,          // Idle connection timeout in seconds
  types       : [],         // Array of custom types, see more below
  onnotice    : fn          // Defaults to console.log
  onparameter : fn          // (key, value) when server param change
  debug       : fn          // Is called with (connection, query, parameters)
  transform   : {
    column            : fn, // Transforms incoming column names
    value             : fn, // Transforms incoming row values
    row               : fn  // Transforms entire rows
  },
  connection  : {
    application_name  : 'postgres.js', // Default application_name
    ...                                // Other connection parameters
  }
});

// with sections as (
// 	select
//         menu_id,
//         json_agg(
//             json_build_object(
//                 'title', s.title,
//                 'description', s.description
//                 )
//             ) sections
//     from "Restaurants".sections s
//     group by s.menu_id
// ),
// menus as (
//     select
//         restaurant_id,
//         json_agg(
//             json_build_object(
//                 'title', m.title,
//                 'description', m.description,
// 				'sections', sections
//                 )
//             ) menus
//     from "Restaurants".menus m
// 	left join sections s on s.menu_id = m.id
//     group by m.restaurant_id
// )
// select
//     json_build_object(
//                 'Rtitle', restaurants.title,
//                 'Rdescription', restaurants.description,
// 				'menus', menus

//     ) restaurants
// 	from "Restaurants".restaurants
// 	left join menus m on m.restaurant_id = restaurants.id
// 	where "Restaurants".restaurants.id = 10000