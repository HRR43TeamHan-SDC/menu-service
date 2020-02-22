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
  limit = 1000;
// receive message from master process
process.on('message', async (message) => {
  howMany = message.howMany;
  // Refactoring to make the id the processID*recordAmt
  // process 1 @ 1000 records = startID 1
  // process 2 @ 1000 records = startID 1001
  // process 3 @ 1000 records = startID 2001 ... et cetera
  const startID = (howMany * (message.id - 1)) + 1;
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
      //  { id: 'id', title: 'id' },
        { id: 'description', title: 'description' },
        { id: 'title', title: 'title' }
      ]
    });

    const menus = createCsvWriter({
      path: `./database/datasets/menus${message.id}.csv`,
      header: [
      //  { id: 'id', title: 'id' },
        { id: 'restaurant_id', title: 'restaurant_id' },
        { id: 'description', title: 'description' },
        { id: 'title', title: 'title' }
      ]
    });

    const sections = createCsvWriter({
      path: `./database/datasets/sections${message.id}.csv`,
      header: [
      //  { id: 'id', title: 'id' },
        { id: 'menu_id', title: 'menu_id' },
      //  { id: 'description', title: 'description' },
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

      for (let i = 0; i <= limit && recordAmt.restaurants < howMany; i++) {

        dataArray.restaurants.push({
          // id: recordAmt.restaurants * message.id, // 8 bytes
          description: faker.lorem.sentence(), // 2 * length so roughly 200bytes
          title: faker.lorem.word(), // 2 * length so roughly 50bytes
        });

        // -----------------------------------------------------------
        // loop to create random amount of menus for current restaurant
        // ------------------------------------------------------------
        let menuAmt = Math.round(Math.random() * 3) + 1;
        // menuAmt = 3
        for (let j = 0; j < menuAmt; j++) {

          dataArray.menus.push({
            // id: startID + recordAmt.menus,
            restaurant_id: recordAmt.restaurants + startID, // 8 bytes
            description: faker.lorem.sentence(), // 2 * length so roughly 200bytes
            title: faker.lorem.word(), // 2 * length so roughly 50bytes
          })
          // -----------------------------------------------------------
          // loop to create random amount of sections for current menu
          // -----------------------------------------------------------
          let sectionsAmt = Math.round(Math.random() * 2) + 1;
          // sectionsAmt = 2
          for (let k = 0; k < sectionsAmt; k++) {
            dataArray.sections.push({
              // id: startID + recordAmt.sections,
              // menu_id: startID + recordAmt.menus + j, // 8 bytes
              menu_id: startID + recordAmt.menus, // 8 bytes
              // description: faker.lorem.sentence(), // 2 * length so roughly 200bytes
              title: faker.lorem.word(), // 2 * length so roughly 50bytes
            })
            // ----------------------------------------------------------------
            // loop to create random amount of items
            // ----------------------------------------------------------------
            let itemsAmt = Math.round(Math.random() * 10) + 1;
            // itemsAmt = 5
            for (let l = 0; l < itemsAmt; l++) {
              dataArray.items.push({
                section_id: startID + recordAmt.sections, // 8 bytes
                // section_id: startID + recordAmt.sections + l,
                description: faker.lorem.sentence(), // 2 * length so roughly 200bytes
                title: faker.lorem.word(), // 2 * length so roughly 50bytes
                price: `$${faker.commerce.price()}`,
              })
              recordAmt.items += 1;

            }
            recordAmt.sections += 1;

          }
          recordAmt.menus += 1;

        }
        recordAmt.restaurants += 1;

      }
      await restaurants
        .writeRecords(dataArray.restaurants)
        .then(() => {
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
          dataArray.items = [];
        })
        .catch(err => {
          //TODO - cleanup the files and delete since we erred
          process.send({ seed: 'ERROR' })
          throw err;
        });



    }
    process.send({ seed: 'restaurants', time: process.hrtime(startSeedTime), status: 'done' });
    console.log(`process_${message.id} made a Total ${recordAmt.restaurants + recordAmt.menus + recordAmt.sections + recordAmt.items} records in ${process.hrtime(startTime)}`);
  }

  if (message.seed === 'ERROR' || message.seed === 'done') {
    process.send({ time: process.hrtime(startTime), seed: 'ALL' });
    process.exit(0);
  }

});