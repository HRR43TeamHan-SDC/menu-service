const { fork } = require('child_process');
const os = require('os');
const cpuCount = os.cpus().length;
let process = {};

// Consider running processes to available memory
// https://www.npmjs.com/package/free-memory

// We will only use aprox half of the cpu's but use atleast 1 cpu
let maxThreads = Math.ceil(cpuCount /2);
howMany = Math.round(10000000 / maxThreads);


for (let i = 0; i < maxThreads; i++) {

  process[i] = fork('./database/seeder9000/datacreator.js');
  process[i].send({
    howMany,
    id: i,
  });
  process[i].on('message', (message) => {
    // Add conditional console logs depending on message.
    console.log(`Time for process ${i} to make ${howMany} records was ${message.time}`);
    // Begin to seed with csv and use appropriate database driver with CLI argument or similar

    // TODO look into compression options for adding and retrieving from database
    console.log(`TODO - make proc ${i} begin seeding with file dataset${i}.csv`)
  });
}
