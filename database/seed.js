const process = require('process');
const faker = require('faker');
const mongoose = require('mongoose');
const restaurantSchema = require('./schema.js');

mongoose.connect('mongodb://localhost/menus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Helper Functions
const randomItems = () => Math.floor(Math.random() * 6) + 4;
const randomSections = () => Math.floor(Math.random() * 3) + 1;

// create 100 records
const records = [];
for (let i = 0; i < 100; i += 1) {
  records[i] = {
    id: i + 1,
    restaurant: faker.random.words(),
    menus: [],
  };

  for (let j = 0; j < 5; j += 1) {
    records[i].menus[j] = {
      title: faker.random.word(),
      description:
        `${faker.lorem.sentence()}
         ${faker.lorem.sentence()}
         ${faker.lorem.sentence()}
         ${faker.lorem.sentence()}
         ${faker.lorem.sentence()}
         ${faker.lorem.sentence()}
         ${faker.lorem.sentence()}`,
      sections: [],
    };

    const sectionLength = randomSections();
    for (let k = 0; k < sectionLength; k += 1) {
      records[i].menus[j].sections[k] = {
        title: faker.random.words(),
        items: [],
      };

      const itemLength = randomItems();
      for (let l = 0; l < itemLength; l += 1) {
        records[i].menus[j].sections[k].items[l] = {
          title: faker.random.words(),
          price: `$${faker.finance.amount()}`,
          description:
            `${faker.lorem.sentence()}
             ${faker.lorem.sentence()}
             ${faker.lorem.sentence()}`,
        };
      }
    }
  }
}

const Restaurants = mongoose.model('restaurants', restaurantSchema);

// remove all records and add all records in the array
Restaurants.remove({}, (err1) => {
  if (err1) {
    return console.log(err1);
  }
  Restaurants.collection.insert(records, (err2) => {
    if (err2) {
      return console.log(err2);
    }
    console.log('Complete');
    return process.exit(0);
  });
  return null;
});
