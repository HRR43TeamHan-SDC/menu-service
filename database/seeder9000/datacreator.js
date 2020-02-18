const faker = require('faker');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fsPromises = fs.promises;

let startTime = process.hrtime();

let sentence = "",
  dataArray = {
    restaurants: [],
    menus: [],
    sections: [],
    items: []
  },
  howMany = 0,
  limit = 10000;
// receive message from master process
process.on('message', async (message) => {
  howMany = message.howMany;
  const startID = (howMany * (message.id - 1)) + 1;
  const endID = howMany * message.id + howMany;
  console.log('process-message🤘', message);

  if (message.seed === 'restaurants') {
    let startSeedTime = process.hrtime();

    fs.writeFile(`./database/datasets/restaurants${message.id}.csv`, '', function (err) {
      if (err) throw err;
      console.log(`restaurants${message.id}.csv Saved!`);
    });

    const restaurants = createCsvWriter({
      path: `./database/datasets/restaurants${message.id}.csv`,
      header: [
        { id: 'id', title: 'id' },
        { id: 'description', title: 'description' },
        { id: 'title', title: 'title' }
      ]
    });

    const menus = createCsvWriter({
      path: `./database/datasets/menus${message.id}.csv`,
      header: [
        { id: 'id', title: 'id' },
        { id: 'restaurant_id', title: 'restaurant_id' },
        { id: 'description', title: 'description' },
        { id: 'title', title: 'title' }
      ]
    });

    const sections = createCsvWriter({
      path: `./database/datasets/sections${message.id}.csv`,
      header: [
        { id: 'id', title: 'id' },
        { id: 'menu_id', title: 'menu_id' },
        { id: 'description', title: 'description' },
        { id: 'title', title: 'title' }
      ]
    });


    const items = createCsvWriter({
      path: `./database/datasets/items${message.id}.csv`,
      header: [
        { id: 'section_id', title: 'section_id' },
        { id: 'description', title: 'description' },
        { id: 'title', title: 'title' },
        { id: 'price', title: 'price' }
      ]
    });

    let recordAmt = {
      restaurants: 0,
      menus: 0,
      sections: 0,
      items: 0,
    };
    while (recordAmt.restaurants < howMany) {
      for (let i = 0; i < limit && recordAmt.restaurants < howMany; i++) {

        dataArray.restaurants.push({
          id: recordAmt.restaurants + startID, // 8 bytes
          description: faker.lorem.sentence(), // 2 * length so roughly 200bytes
          title: faker.lorem.word(), // 2 * length so roughly 50bytes
        });
        recordAmt.restaurants += 1;

        // -----------------------------------------------------------
        // loop to create random amount of menus for current restaurant
        // ------------------------------------------------------------
        let menuAmt = Math.round(Math.random() * 3) + 1;
        for (let j = 0; j < menuAmt; j++) {

          dataArray.menus.push({
            id: recordAmt.restaurants + startID + recordAmt.menus,
            restaurant_id: recordAmt.restaurants + startID, // 8 bytes
            description: faker.lorem.sentence(), // 2 * length so roughly 200bytes
            title: faker.lorem.word(), // 2 * length so roughly 50bytes
          })
          recordAmt.menus += 1;
          // -----------------------------------------------------------
          // loop to create random amount of sections for current menu
          // -----------------------------------------------------------
          let sectionsAmt = Math.round(Math.random() * 3) + 1;
          for (let k = 0; k < sectionsAmt; k++) {
            dataArray.sections.push({
              id: recordAmt.restaurants + startID + recordAmt.sections,
              menu_id: recordAmt.restaurants + startID + recordAmt.menus, // 8 bytes
              description: faker.lorem.sentence(), // 2 * length so roughly 200bytes
              title: faker.lorem.word(), // 2 * length so roughly 50bytes
            })
            recordAmt.sections += 1;
            // ----------------------------------------------------------------
            // loop to create random amount of items
            // ----------------------------------------------------------------
            let itemsAmt = Math.round(Math.random() * 10) + 1;
            for (let l = 0; l < itemsAmt; l++) {
              dataArray.items.push({
                section_id: recordAmt.restaurants + startID + recordAmt.sections, // 8 bytes
                description: faker.lorem.sentence(), // 2 * length so roughly 200bytes
                title: faker.lorem.word(), // 2 * length so roughly 50bytes
                price: `$${faker.commerce.price()}`,
              })
              recordAmt.items += 1;
            }
          }


          // The limit seems to be around 2M records in the array 512MB / 258 bytes
          // 2M violates the heap so we just do it nice nice  😎
        }
        await restaurants
          .writeRecords(dataArray.restaurants)
          .then(() => {
            // console.log(`The restaurants ${message.id}.csv was written successfully ${process.hrtime(startSeedTime)}`);
            // clear the dataArray out of RAM / Heap 😎
            dataArray.restaurants = [];
          })
          .catch(err => {
            //TODO - cleanup the files and delete since we erred
            process.send({ seed: 'ERROR' })
            throw err;
          });
        await menus
          .writeRecords(dataArray.menus)
          .then(() => {
            // console.log(`The restaurants ${message.id}.csv was written successfully ${process.hrtime(startSeedTime)}`);
            // clear the dataArray out of RAM / Heap 😎
            dataArray.menus = [];
          })
          .catch(err => {
            //TODO - cleanup the files and delete since we erred
            process.send({ seed: 'ERROR' })
            throw err;
          });
        await sections
          .writeRecords(dataArray.sections)
          .then(() => {
            // console.log(`The restaurants ${message.id}.csv was written successfully ${process.hrtime(startSeedTime)}`);
            // clear the dataArray out of RAM / Heap 😎
            dataArray.sections = [];
          })
          .catch(err => {
            //TODO - cleanup the files and delete since we erred
            process.send({ seed: 'ERROR' })
            throw err;
          });
        await items
          .writeRecords(dataArray.items)
          .then(() => {
            // console.log(`The restaurants ${message.id}.csv was written successfully ${process.hrtime(startSeedTime)}`);
            // clear the dataArray out of RAM / Heap 😎
            dataArray.items = [];
          })
          .catch(err => {
            //TODO - cleanup the files and delete since we erred
            process.send({ seed: 'ERROR' })
            throw err;
          });


      }

    }
    process.send({ seed: 'restaurants', time: process.hrtime(startSeedTime), status: 'done' });
    console.log(`process_${message.id} made a Total ${recordAmt.restaurants + recordAmt.menus + recordAmt.sections + recordAmt.items} records in ${process.hrtime(startTime)}`);
  }

  if (message.seed === 'ERROR' || message.seed === 'done') {
    process.send({ time: process.hrtime(startTime), seed: 'ALL' });
    process.exit(0);
  }

});