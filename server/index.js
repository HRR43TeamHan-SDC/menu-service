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

const port = (process.env.PORT ? process.env.PORT : 8000);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
