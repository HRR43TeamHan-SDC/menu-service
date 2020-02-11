const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  title: String,
  price: String,
  description: String,
});

const sectionSchema = mongoose.Schema({
  title: String,
  items: [itemSchema],
});

const menuSchema = mongoose.Schema({
  title: String,
  description: String,
  sections: [sectionSchema],
});

const restaurantSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  restaurant: String,
  menus: [menuSchema],
});

module.exports = restaurantSchema;
