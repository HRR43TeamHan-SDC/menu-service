require('newrelic');
var express = require('express');
const db = require('./../../database/postgres/');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });
//app.use(express.urlencoded({ extended: true }));

app.use('/bundle.js', express.static(path.resolve(__dirname, '../../public/bundle.js')));

app.use('/:id', express.static(path.resolve(__dirname, '../../public')));

app.get('/getmenu/:id', (req, res) => {
  // console.log(`menu requesting id = ${req.params.id}`);
  db.getRestaurantMenu(req.params.id, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});


app.get('/gettitle/:id', (req, res) => {
  // console.log(`title requesting id = ${req.params.id}`);
  // console.log(req.headers);
  db.getRestaurantTitle(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send('Something horrible happened')
    }
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.status(200).json(result);
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
  .post((req, res) => {
    // POST a new menu to the restaurant with that id
    // db.postRestaurantMenu
    console.log(`POST requested at /api/restaurant/${req.params.id}`);
    req.body.id = req.params.id;
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
        res.status(500).send('Something horrible happened');
      }
      res.send(result);
    });
  })
  .delete((req, res) => {
    //db.deleteRestaurant
    console.log(`DELETE requested at /api/restaurant/${req.params.id}`);
    req.body.id = req.params.id;
    db.deleteRestaurant(req.params.id, (err, result) => {
      if (err) {
        console.error(err);
      }
      res.send(`DELETE ${result}`);
    });
  });


app.route('/api/menu/:id')
  .post((req, res) => {
    //POST a new section to the menu
    // db.postRestaurantSection
    req.body.id = req.params.id;
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
        res.status(201).send(result);
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
        res.status(201).send(result);
      }
    });
    console.log(`DELETE requested at /api/menu/${req.params.id}`);
  });


app.route('/api/section/:id')
  .post((req, res) => {
    // POST a new item to the section
    //db.postRestaurantItem
    req.body.id = req.params.id;
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
        res.status(201).send(result);
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
        res.status(201).send(result);
      }
    });
    console.log(`DELETE requested at /api/section/${req.params.id}`);
  });


app.route('/api/item/:id')
  .put((req, res) => {
    // db.putRestaurantItem
    req.body.id = req.params.id;
    db.putRestaurantItem(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(result);
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
        res.status(201).send(result);
      }
    });
    console.log(`DELETE requested at /api/item/${req.params.id}`);
  });

const port = process.env.MENU_PORT || 8001;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});