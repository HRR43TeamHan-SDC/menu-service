const { fork } = require('child_process');
const os = require('os');
const concat = require('concat');
const fs = require('fs');

let cpuCount = os.cpus().length;
let homer = {};

// Consider running processes to available memory
// https://www.npmjs.com/package/free-memory


// cpuCount = 2; // uncomment to test other cpu amounts

const priAmt = 10000000
// You can set the percentage of cpus that will be used to calculate thread count
// 1 is 100% and 0.5 is 50% et ceetera
const cpuPercent = 1
let maxThreads = Math.ceil(cpuCount * cpuPercent);

// make the primary record evenly divided by the threads we are going to run
while (priAmt % maxThreads != 0) {
  maxThreads -= 1;
}
howMany = Math.round(priAmt / maxThreads);
restCSSArray = [];

fs.writeFile('./database/postgres/loadPostgres.sql', '', (err) => {
  if(err)throw err;
})

for (let i = 1; i <= maxThreads; i++) {

  homer[i] = fork('./database/seeder9000/datacreator.js');
  homer[i].send({
    id: i,
    howMany,
    seed: 'restaurants'
  });
  let total = 0;
  homer[i].on('message', (message) => {
    // Add conditional console logs depending on message.
    // console.log(`Time for process ${i} to make ${howMany} records was ${message.time} ${message.seed}`);
    // Begin to seed with csv and use appropriate database driver with CLI argument or similar

    if (message.seed === 'restaurants' && message.status === 'done') {
      restCSSArray.push(i);
    if (restCSSArray.length === maxThreads) {
      restCSSArray.forEach((thread) => {
        fs.appendFile(`./database/postgres/loadPostgres.sql`, `COPY restaurants (description, title) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/restaurants${thread}.csv' CSV HEADER;\n`, (err) => {
          if (err) {
            throw err;
          }
          fs.appendFile(`./database/postgres/loadPostgres.sql`, `COPY menus (restaurant_id, description, title) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/menus${thread}.csv' CSV HEADER;\n`, (err) => {
            if (err) {
              throw err;
            }
            fs.appendFile(`./database/postgres/loadPostgres.sql`, `COPY sections (menu_id, title) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/sections${thread}.csv' CSV HEADER;\n`, (err) => {
              if (err) {
                throw err;
              }
              fs.appendFile(`./database/postgres/loadPostgres.sql`, `COPY items (section_id, description, title, price) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/items${thread}.csv' CSV HEADER;\n`, (err) => {
                if (err) {
                  throw err;
                }
              });
            });
          });
        });
      });
    }


    homer[i].send({ id: i, howMany, seed: 'done' });
  } else {

    homer[i].send({ id: i, howMany, seed: 'ERROR' });

  }
    // TODO look into compression options for adding and retrieving from database
    // console.log(`TODO - make proc ${i} begin seeding with file dataset${i}.csv`)
  });
}
