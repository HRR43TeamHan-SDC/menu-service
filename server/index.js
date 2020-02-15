const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./../database');

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/getmenu/:id', (req, res) => {
  console.log(`menu requesting id = ${req.params.id}`);
  db.getRestaurantMenu(req.params.id, (restaurant) => {
    res.status(200).json(restaurant);
  });
});

app.get('/gettitle/:id', (req, res) => {
  console.log(`title requesting id = ${req.params.id}`);
  db.getRestaurantTitle(req.params.id, (restaurant) => {
    console.log(req.headers);
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.status(200).json(restaurant);
  });
});

app.post('/api/restaurant/', (req, res) => {
  console.log(`POST requested at /api/restaurant}`);
  db.postRestaurant(req.body, (err, data) => {
    if(err) {
      console.error(err);
      res.status(500).send(err)
    } else {
      res.status(201).send(`Successful POST`);
    }
  })
});

app.route('/api/restaurant/:id')
.put((req, res) => {
  console.log(`PUT requested at /api/restaurant/${req.params.id}`)
  db.putRestaurant(req.body, (err, data) => {
    res.send(`PUT ${data}`)
  })
})
.delete((req, res) => {
  console.log(`DELETE requested at /api/restaurant/${req.params.id}`)
  db.deleteRestaurant(req.params.id, (err, data) => {
    if (err) {
      console.error(err);
    }
    res.send(`DELETE ${data}`)
  })
})

app.route('/api/restaurant/:restid/menu/:menuid')
  .put((req, res) => {
    console.log(`PUT requested at /api/restaurant/${req.params.restid}/menu/${req.params.menuid}`);
    db.putRestaurantMenu(req.params.id, (err, data) => {
      res.send(`PUT requested at /api/restaurant/${req.params.restid}/menu/${req.params.menuid}`);
    })
  })
  .delete((req, res) => {
    console.log(`DELETE requested at /api/restaurant/${req.params.restid}/menu/${req.params.menuid}`);
    db.deleteRestaurantMenu(req.params.id, (err, data) => {
      res.send(`DELETE requested at /api/restaurant/${req.params.restid}/menu/${req.params.menuid}`);
    })
  });

const port = process.env.MENU_PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
