
const faker = require('faker');
// Use the following to get how many cpus there are and use maybe half of 3/4
const os = require('os')
const cpuCount = os.cpus().length

howMany = 10000000

let paragraph = "Ex ea enim nostrum et officia. Eius non magnam rerum. Et aut accusantium possimus ex officiis voluptas molestiae non Assumenda laudantium quisquam architecto commodi vel nesciunt error ducimus quidem. Deleniti pariatur explicabo in repellendus reprehenderit et. Quidem tempore atque Consequatur exercitationem tempora voluptas quia consequatur voluptatem aut quos velit maiores perferendis aut et sint velit ut voluptatibus voluptatem quisquam voluptatem inventore molestiae dignissimos error impedit et ad asperiores ullam corrupti inventore quas nihil cupiditate fuga rerum quo ipsam illum praesentium quis asperiores et accusamus ut dolorum aut et et aliquid libero laborum nisi qui qui cum enim et illum dolorum consectetur qui totam ut illo qui cupiditate porro laudantium iusto itaque deserunt est autem eius incidunt labore reprehenderit placeat veritatis non eos et quibusdam aliquid voluptate expedita officia modi pariatur dolor quo facilis et ea ut voluptatem est cum distinctio deserunt non non omnis ducimus Ex ea enim nostrum et officia. Eius non magnam rerum. Et aut accusantium possimus ex officiis voluptas molestiae non Assumenda laudantium quisquam architecto commodi vel nesciunt error ducimus quidem. Deleniti pariatur explicabo in repellendus reprehenderit et. Quidem tempore atque Consequatur exercitationem tempora voluptas quia consequatur voluptatem aut quos velit maiores perferendis aut et sint velit ut voluptatibus voluptatem quisquam voluptatem inventore molestiae dignissimos error impedit et ad asperiores ullam corrupti inventore quas nihil cupiditate fuga rerum quo ipsam illum praesentium quis asperiores et accusamus ut dolorum aut et et aliquid libero laborum nisi qui qui cum enim et illum dolorum consectetur qui totam ut illo qui cupiditate porro laudantium iusto itaque deserunt est autem eius incidunt labore reprehenderit placeat veritatis non eos et quibusdam aliquid voluptate expedita officia modi pariatur dolor quo facilis et ea ut voluptatem est cum distinctio deserunt non non omnis ducimus Ex ea enim nostrum et officia. Eius non magnam rerum. Et aut accusantium possimus ex officiis voluptas molestiae non Assumenda laudantium quisquam architecto commodi vel nesciunt error ducimus quidem. Deleniti pariatur explicabo in repellendus reprehenderit et. Quidem tempore atque Consequatur exercitationem tempora voluptas quia consequatur voluptatem aut quos velit maiores perferendis aut et sint velit ut voluptatibus voluptatem quisquam voluptatem inventore molestiae dignissimos error impedit et ad asperiores ullam corrupti inventore quas nihil cupiditate fuga rerum quo ipsam illum praesentium quis asperiores et accusamus ut dolorum aut et et aliquid libero laborum nisi qui qui cum enim et illum dolorum consectetur qui totam ut illo qui cupiditate porro laudantium iusto itaque deserunt est autem eius incidunt labore reprehenderit placeat veritatis non eos et quibusdam aliquid voluptate expedita officia modi pariatur dolor quo facilis et ea ut voluptatem est cum distinctio deserunt non non omnis ducimus"

words = paragraph.split(' ');
sentlength = 100;
let sentence = "";
startTime = process.hrtime();
for (let j = 0; j < howMany; j++) {
  randomNum = (20 * Math.random() | 0);
  console.log(j);
  sentence = words.splice(randomNum, randomNum + sentlength).join(' ')
  // for (let i = 0; i < sentlength; i++) {
  //   sentence += words[words.length * Math.random() | 0] + ' ';
  // }
}
console.log(`time for custom ${sentlength} words X ${howMany} was ${process.hrtime(startTime)}`);
console.log(sentence);

startTime = process.hrtime();
for (let j = 0; j < howMany; j++) {
sentence = faker.lorem.words(100);
}
console.log(`time for faker ${sentlength} words X ${howMany} was ${process.hrtime(startTime)}`);
console.log(sentence);
// By default 151 is the maximum permitted number of simultaneous client connections in MySQL 5.5.
// On MongoDB, connections are a lot lighter and we set the limit at 5000.
// https://itnext.io/multi-threading-and-multi-process-in-node-js-ffa5bb5cde98
console.log(`you have ${cpuCount} cpus!`)
console.log(`using 3/4 would be ${Math.floor((cpuCount / 4)*3)}`)