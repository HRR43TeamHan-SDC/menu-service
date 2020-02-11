import 'regenerator-runtime/runtime';

const restaurantSchema = require('./../database/schema.js');

const mongoose = require('mongoose');

const databaseName = 'menus';

beforeAll(async () => {
  const url = `mongodb://localhost/${databaseName}`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

const Restaurants = mongoose.model('restaurants', restaurantSchema);

test('should have 100 restaurants in database', done => {

  function callback(err, data) {
    console.log(data);
    try {
      expect(data).toBe(100);
      done(0);
    } catch (error) {
      done(error);
    }
  }
  Restaurants.countDocuments({}, callback); // count records
});
