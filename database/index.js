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

const putRestaurantMenu = (id, cb) => {

};

const deleteRestaurantMenu = (id, cb) => {

};

const getRestaurantTitle = (id, cb) => {
  Restaurants.find({ id }, (err, restaurant) => {
    if (err) {
      return console.log(err);
    }
    return cb(restaurant[0].restaurant);
  });
};

const postRestaurant = (data, cb) => {
  var post = new Restaurants(data)
  post.save(function (err, post) {
    if (err) {
    cb(err, null);
    }
    cb(null, post);
  });

};

const putRestaurant = (data, cb) => {
  Restaurants.updateOne({id: data.id}, data, function (err) {
    if (err) {
      cb(err, null);
      }
      cb(null, post);
  });
};

const deleteRestaurant = (id, cb) => {
  Restaurants.deleteOne({ id }, function (err) {
    // deleted at most one restaurant document
    if (err) {
      cb(err, null);
      }
      cb(null, post);
  });
};

module.exports.postRestaurant = postRestaurant;
module.exports.putRestaurant = putRestaurant;
module.exports.deleteRestaurant = deleteRestaurant;
module.exports.putRestaurantMenu = putRestaurantMenu;
module.exports.deleteRestaurantMenu = deleteRestaurantMenu;
module.exports.getRestaurantMenu = getRestaurantMenu;
module.exports.getRestaurantTitle = getRestaurantTitle;
