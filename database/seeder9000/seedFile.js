const fs = require('fs');
const csv = require('csv-parser').createObjectCsvWriter;
const fsPromises = fs.promises;

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'id', title: 'ID'},
    {id: 'description', title: 'Description'},
  ]
});

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });