var neo4j = require('neo4j-driver');

// https://www.npmjs.com/package/neo4j-driver

var driver = neo4j.driver(
  'neo4j://localhost',
  neo4j.auth.basic('neo4j', 'neo4j')
)

// Close the driver when application exits.
// This closes all used network connections.
await driver.close();


