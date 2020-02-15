const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fsPromises = fs.promises;


startTime = process.hrtime();
let paragraph = "Ex ea enim nostrum et officia. Eius non magnam rerum. Et aut accusantium possimus ex officiis voluptas molestiae non Assumenda laudantium quisquam architecto commodi vel nesciunt error ducimus quidem. Deleniti pariatur explicabo in repellendus reprehenderit et. Quidem tempore atque Consequatur exercitationem tempora voluptas quia consequatur voluptatem aut quos velit maiores perferendis aut et sint velit ut voluptatibus voluptatem quisquam voluptatem inventore molestiae dignissimos error impedit et ad asperiores ullam corrupti inventore quas nihil cupiditate fuga rerum quo ipsam illum praesentium quis asperiores et accusamus ut dolorum aut et et aliquid libero laborum nisi qui qui cum enim et illum dolorum consectetur qui totam ut illo qui cupiditate porro laudantium iusto itaque deserunt est autem eius incidunt labore reprehenderit placeat veritatis non eos et quibusdam aliquid voluptate expedita officia modi pariatur dolor quo facilis et ea ut voluptatem est cum distinctio deserunt non non omnis ducimus Ex ea enim nostrum et officia. Eius non magnam rerum. Et aut accusantium possimus ex officiis voluptas molestiae non Assumenda laudantium quisquam architecto commodi vel nesciunt error ducimus quidem. Deleniti pariatur explicabo in repellendus reprehenderit et. Quidem tempore atque Consequatur exercitationem tempora voluptas quia consequatur voluptatem aut quos velit maiores perferendis aut et sint velit ut voluptatibus voluptatem quisquam voluptatem inventore molestiae dignissimos error impedit et ad asperiores ullam corrupti inventore quas nihil cupiditate fuga rerum quo ipsam illum praesentium quis asperiores et accusamus ut dolorum aut et et aliquid libero laborum nisi qui qui cum enim et illum dolorum consectetur qui totam ut illo qui cupiditate porro laudantium iusto itaque deserunt est autem eius incidunt labore reprehenderit placeat veritatis non eos et quibusdam aliquid voluptate expedita officia modi pariatur dolor quo facilis et ea ut voluptatem est cum distinctio deserunt non non omnis ducimus Ex ea enim nostrum et officia. Eius non magnam rerum. Et aut accusantium possimus ex officiis voluptas molestiae non Assumenda laudantium quisquam architecto commodi vel nesciunt error ducimus quidem. Deleniti pariatur explicabo in repellendus reprehenderit et. Quidem tempore atque Consequatur exercitationem tempora voluptas quia consequatur voluptatem aut quos velit maiores perferendis aut et sint velit ut voluptatibus voluptatem quisquam voluptatem inventore molestiae dignissimos error impedit et ad asperiores ullam corrupti inventore quas nihil cupiditate fuga rerum quo ipsam illum praesentium quis asperiores et accusamus ut dolorum aut et et aliquid libero laborum nisi qui qui cum enim et illum dolorum consectetur qui totam ut illo qui cupiditate porro laudantium iusto itaque deserunt est autem eius incidunt labore reprehenderit placeat veritatis non eos et quibusdam aliquid voluptate expedita officia modi pariatur dolor quo facilis et ea ut voluptatem est cum distinctio deserunt non non omnis ducimus";

let words = paragraph.split(' ');

let sentence = "";
dataArray = [];

async function sendMultipleMails(mails) {
  let sendMails = 0;
  // logic for
  // sending multiple mails
  return sendMails;
}
// receive message from master process
process.on('message', async (message) => {
  const numberOfMailsSend = await sendMultipleMails(message.mails);

  fs.writeFile(`./database/datasets/dataset${message.id}.csv`, '', function (err) {
    if (err) throw err;
    console.log(`dataset${message.id}.csv Saved!`);
  });
  const csvWriter = createCsvWriter({
    path: `./database/datasets/dataset${message.id}.csv`,
    header: [
      { id: 'id', title: 'id' },
      { id: 'description', title: 'description' },
    ]
  });

  console.log(message);
  howMany = message.howMany;
  let data = {};
  let randomNum = 0;
  const sentlength = 25;
  let sentence = "";
  startTime = process.hrtime();
  for (let i = 0; i < howMany; i++) {
    data = new Object();
    sentence = "";
    // randomNum = Math.round(20 * Math.random());
    // sentence = words.splice(randomNum, (randomNum + sentlength));
    // sentence.join(',', ' ');
    for (let j = 0; j < sentlength; j++) {
      sentence += words[words.length * Math.random() | 0] + ' ';
    }
    // put the object in the array we will write
    data.description = sentence;
    data.id = i;
    dataArray.push(data);
  }
  await csvWriter
    .writeRecords(dataArray)
    .then(() => {
      console.log(`The dataset${message.id}.csv file was written successfully `);
    })
    .catch(err => { throw err; })
      process.send({ time: process.hrtime(startTime) });
      process.exit(0);

});


