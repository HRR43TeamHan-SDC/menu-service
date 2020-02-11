const mongoose = require('mongoose');
const restaurantSchema = require('./schema.js');

mongoose.connect('mongodb://localhost/menus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const Restaurants = mongoose.model('restaurants', restaurantSchema);

const getRestaurantMenu = (id, cb) => {
  Restaurants.find({ id }, (err, restaurant) => {
    if (err) {
      return console.log(err);
    }
    return cb(restaurant);
  });
};

const getRestaurantTitle = (id, cb) => {
  Restaurants.find({ id }, (err, restaurant) => {
    if (err) {
      return console.log(err);
    }
    return cb(restaurant[0].restaurant);
  });
};

module.exports.getRestaurantMenu = getRestaurantMenu;
module.exports.getRestaurantTitle = getRestaurantTitle;
