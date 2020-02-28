require('newrelic');
require('dotenv').config();
const zlib = require('zlib');
var express = require('express');
const fs = require('fs');
const db = require('./../../database/postgres/');

const cors = require('cors');
const path = require('path');
const app = express();

const MENUS_PORT = process.env.MENUS_PORT || 8001;

app.use(cors());
app.use(express.json());
LOADERIO_VERIFY = process.env.LOADERIO_VERIFY;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Cache-Control', 'max-age=31536000')
  next();
});
// app.use(express.urlencoded({ extended: true }));

//app.use('/bundle.js', express.static(path.resolve(__dirname, '../../public/bundle.js')));

//Updated to deliver zipped bundle however consider using Nginx to speed it up more....
app.get(['/bundle.js', '/BrandonText-Regular.otf', '/styles.css'], (req, res) => {
  const gzip = zlib.createGzip();
  const bundle = fs.createReadStream(path.resolve(__dirname, `../../public/${req.url}`));
  res.set({ 'Content-Encoding': 'gzip' });
  bundle.pipe(gzip).pipe(res);
});

app.use('/:id', express.static(path.resolve(__dirname, '../../public')));

if (LOADERIO_VERIFY) {
  app.get(`/${LOADERIO_VERIFY}.txt`, (req, res) => {
    res.send(`${LOADERIO_VERIFY}`)
  });
}


app.get('/getmenu/:id', (req, res) => {
  // console.log(`menu requesting id = ${req.params.id}`);
  db.getRestaurant(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send('Something Terrible happened')
    }
    res.status(200).json(result.rows);
  });
});


app.get('/gettitle/:id', (req, res) => {
  // console.log(`title requesting id = ${req.params.id}`);
  // console.log(req.headers);
  db.getRestaurantTitle(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send(err)
    }
    res.status(200).json(result.rows[0].title);
  });
});


app.post('/api/restaurant/', (req, res) => {
  console.log(`POST requested at /api/restaurant}`);
  // db.postRestaurant
  db.postRestaurant(req.body, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err)
    } else {
      res.status(201).send(result.rows[0]);
    }
  });
});


app.route('/api/restaurant/:id')
  .get((req, res) => {
    db.getRestaurant(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err)
      }
      res.status(200).json(result.rows);
    });
  })
  .post((req, res) => {
    // POST a new menu to the restaurant with that id
    // db.postRestaurantMenu
    console.log(`POST requested at /api/restaurant/${req.params.id}`);
    req.body.restaurant_id = req.params.id;
    db.postRestaurantMenu(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err)
      } else {
        res.status(201).send(result.rows[0]);
      }
    });

  })
  .put((req, res) => {
    // db.putRestaurant
    console.log(`PUT requested at /api/restaurant/${req.params.id}`);
    req.body.id = req.params.id;
    db.putRestaurant(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(result.rows[0]);
    });
  })
  .delete((req, res) => {
    //db.deleteRestaurant
    console.log(`DELETE requested at /api/restaurant/${req.params.id}`);
    req.body.id = req.params.id;
    db.deleteRestaurant(req.params.id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }
      res.send(result.rows[0]);
    });
  });


app.route('/api/menu/:id')
  .get((req, res) => {
    db.getRestaurantMenu(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send('Something Terrible happened')
      }
      res.status(200).json(result.rows[0]);
    });
  })
  .post((req, res) => {
    //POST a new section to the menu
    // db.postRestaurantSection
    req.body.menu_id = req.params.id;
    db.postRestaurantSection(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(result.rows[0]);
      }
    });
    console.log(`POST requested at /api/menu/${req.params.id}`);
  })
  .put((req, res) => {
    // db.putRestaurantMenu
    req.body.id = req.params.id;
    db.putRestaurantMenu(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(result.rows[0]);
      }
    });
    console.log(`PUT requested at /api/menu/${req.params.id}`);
  })
  .delete((req, res) => {
    // db.deleteRestaurantMenu
    req.body.id = req.params.id;
    db.deleteRestaurantMenu(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(result.rows[0]);
      }
    });
    console.log(`DELETE requested at /api/menu/${req.params.id}`);
  });


app.route('/api/section/:id')
  .get((req, res) => {
    db.getRestaurantSection(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send('Something Terrible happened')
      }
      res.status(200).json(result.rows[0]);
    });
  })
  .post((req, res) => {
    // POST a new item to the section
    //db.postRestaurantItem
    req.body.section_id = req.params.id;
    db.postRestaurantItem(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(result.rows[0]);
      }
    });
    console.log(`POST requested at /api/section/${req.params.id}`);
  })
  .put((req, res) => {
    // db.putRestaurantSection
    req.body.id = req.params.id;
    db.putRestaurantSection(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(result.rows[0]);
      }
    });
    console.log(`PUT requested at /api/section/${req.params.id}`);
  })
  .delete((req, res) => {
    // db.deleteRestaurantSection
    req.body.id = req.params.id;
    db.deleteRestaurantSection(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(result.rows[0]);
      }
    });
    console.log(`DELETE requested at /api/section/${req.params.id}`);
  });


app.route('/api/item/:id')
  .get((req, res) => {
    db.getRestaurantItem(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send('Something Terrible happened')
      }
      res.status(200).json(result.rows[0]);
    });
  })
  .put((req, res) => {
    // db.putRestaurantItem
    req.body.id = req.params.id;
    db.putRestaurantItem(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(result.rows[0]);
      }
    });
    console.log(`PUT requested at /api/item/${req.params.id}`);
  })
  .delete((req, res) => {
    // db.deleteRestaurantItem
    req.body.id = req.params.id;
    db.deleteRestaurantItem(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(result.rows[0]);
      }
    });
    console.log(`DELETE requested at /api/item/${req.params.id}`);
  });


app.listen(MENUS_PORT, () => {
  console.log(`App listening on port ${MENUS_PORT}`);
});