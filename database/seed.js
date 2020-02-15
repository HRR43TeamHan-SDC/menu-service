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
let startTime = process.hrtime();

// Helper Functions
const randomItems = () => Math.floor(Math.random() * 6) + 4;
const randomSections = () => Math.floor(Math.random() * 3) + 1;

// create 100 records
const records = [];

for (let i = 0; i < 1000; i += 1) {
  console.log('Creating Record', i)
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
processTime = process.hrtime(startTime);
    minSecNsTime = []
    minSecNsTime[0] = Math.floor(processTime[0] / 60)
    minSecNsTime[1] = processTime[0] % 60;
    minSecNsTime[2] = processTime[1];
    console.log(`Completed array in ${minSecNsTime}`);
// remove all records and add all records in the array
Restaurants.remove({}, (err1) => {
  if (err1) {
    return console.error(err1);
  }
  Restaurants.collection.insertMany(records, (err2) => {
    if (err2) {
      return console.error(err2);
    }
    processTime = process.hrtime(startTime);
    minSecNsTime = []
    minSecNsTime[0] = Math.floor(processTime[0] / 60)
    minSecNsTime[1] = processTime[0] % 60;
    minSecNsTime[2] = processTime[1];
    console.log(`Completed insert in ${minSecNsTime}`);
    return process.exit(0);
  });
  return null;
});
