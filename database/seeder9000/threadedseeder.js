const { fork } = require('child_process');
const os = require('os');
const concat = require('concat');
const fs = require('fs');

let cpuCount = os.cpus().length;
let homer = {};

// Consider running processes to available memory
// https://www.npmjs.com/package/free-memory


//cpuCount = 10; // uncomment to test other cpu amounts

// We will only use aprox half of the cpu's available but use atleast 1 cpu
let maxThreads = Math.ceil(cpuCount / 1.5);
howMany = Math.round(10000000 / maxThreads);
restCSSArray = [];
menuCSSArray = [];
itemCSSArray = [];


fs.writeFile(`./database/datasets/restaurants.csv`, '', function (err) {
  if (err) throw err;
  console.log(`restaurants.csv Saved!`);
});


for (let i = 1; i < maxThreads; i++) {

  homer[i] = fork('./database/seeder9000/datacreator.js');
  homer[i].send({
    id: i,
    howMany,
    seed: 'restaurants'
  });
  let total = 0;
  homer[i].on('message', (message) => {
    // Add conditional console logs depending on message.
    console.log(`Time for process ${i} to make ${howMany} records was ${message.time} ${message.seed}`);
    // Begin to seed with csv and use appropriate database driver with CLI argument or similar
    total += message.howMany;
    if (message.seed === 'restaurants' && message.status === 'done') {

      restCSSArray.push(`./database/datasets/restaurants${i}.csv`);
      if (restCSSArray.length === maxThreads) {
        restCSSArray.forEach((filename, i) => {
          fs.appendFile(`./database/loadPostgres.sql`, `\ncopy "Restaurants".restaurants (id, description, title) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/restaurants${i + 1}.csv' CSV HEADER;\n`, (err) => {
            if (err){
              throw err;
            }
            fs.appendFile(`./database/loadPostgres.sql`, `\ncopy "Restaurants".menus (id, restaurant_id, description, title) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/menus${i + 1}.csv' CSV HEADER;\n`, (err) => {
              if (err){
                throw err;
              }
              fs.appendFile(`./database/loadPostgres.sql`, `\ncopy "Restaurants".sections (id, menu_id, description, title) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/sections${i + 1}.csv' CSV HEADER;\n`, (err) => {
                if (err){
                  throw err;
                }
                fs.appendFile(`./database/loadPostgres.sql`, `\ncopy "Restaurants".items (section_id, description, title) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/items${i + 1}.csv' CSV HEADER;\n`, (err) => {
                  if (err){
                    throw err;
                  }

                })
              })
            })
          })

        })
      }
      homer[i].send({ id: i, howMany, seed: 'done' });
    } else {

      homer[i].send({ id: i, howMany, seed: 'ERROR' });

    }
    // TODO look into compression options for adding and retrieving from database
    // console.log(`TODO - make proc ${i} begin seeding with file dataset${i}.csv`)
  });
}
