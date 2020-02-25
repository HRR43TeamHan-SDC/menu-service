
Menu Service Module
------

## Installing Requirements/Dependencies
1. mongod
2. postgresSQL
3. neo4j
4. artillery (Optional for Stress Testing)
   1. `npm install artillery -g`

---
### Initialization
1. `npm install`
2. `npm run build` (for webpack) -- OR -- `npm run build:dev` (for webpack with watch)
3. `npm run mongo` (start mongod)
4. `npm run seed:files` Create csv files with random data for database loading
5. `npm run init:postgres` Initialize schema for Postgres database
6. `npm run load:postgres` Load Postgres database with csv data
(Not yet implemented) `npm run init:neo4j` Initialize schema for Neo4j database
(Not yet implemented) `npm run load:neo4j` Load Neo4j database with csv data

---
### Seeding database
1. `npm run seed`          (Mongo)
2. `npm run seed:files`    (Create dataset using multithreaded seeder9000)
3. `npm run load:postgres` (Postgres dataset loader)
(Not yet implemented) `npm run load:neo4j`    (Neo4j dataset loader)

---
### Running
1. `npm start` (for Node) -- OR -- `npm run start:dev` (for nodemon)
2. `npm run start:postgres` (for Postgres database backend) -- OR -- `npm run start:dev:postgres`
(Not yet implemented) `npm run start:neo4j` (for neo4j database backend) -- OR -- `npm run start:dev:neo4j`

### API Endpoints

#### Mongo
| Action |       Endpoint       | Method | Description                                      |
|--------|----------------------|--------|--------------------------------------------------|
| Read   | /getmenu/:id         | GET    | Returns menu for provided restaurant (deprecated)|
| Read   | /gettitle/:id        | GET    | Returns title for provided restaurant            |
| Create | /api/restaurant/:id  | POST   | Create a new restaurant                          |
| Read   | /api/menu/:id        | GET    | Read menus of a provided restaurant              |
| Update | /api/restaurant/:id  | PUT    | Swap or add menus for a provided restaurant      |
| Delete | /api/restaurant/:id  | DELETE | Remove a provided restaurant from the database   |


#### Postgres
| Action |       Endpoint      | Method | Description                                              |
|--------|---------------------|--------|----------------------------------------------------------|
| Read   | /getmenu/:id        | GET    | Returns menu for provided restaurant (deprecated)        |
| Read   | /gettitle/:id       | GET    | Returns title for provided restaurant (deprecated)       |
| Create | /api/restaurant/    | POST   | Create a new restaurant                                  |
| Read   | /api/restaurant/:id | GET    | Returns a restaurants full menu                          |
| Update | /api/restaurant/:id | PUT    | Create a new restaurant                                  |
| Delete | /api/restaurant/:id | DELETE | Delete a restaurant, menus, sections, and items          |
| Create | /api/menu/:id       | POST   | Create a new menu with provided restaurand id            |
| Read   | /api/menu/:id       | GET    | Returns menu details minus children                      |
| Update | /api/menu/:id       | PUT    | Update a menus details                                   |
| Delete | /api/menu/:id       | DELETE | Delete a menu, sections, and items with provided menu id |
| Create | /api/section/:id    | POST   | Create a new section with provided menu id               |
| Read   | /api/section/:id    | GET    | Returns section details minus children                   |
| Update | /api/section/:id    | PUT    | Update a menus details                                   |
| Delete | /api/section/:id    | DELETE | Delete a section and containing items                    |
| Create | /api/item/:id       | POST   | Create a new item with provided section id               |
| Read   | /api/item/:id       | GET    | Returns item details with id                             |
| Update | /api/item/:id       | PUT    | Update a item details                                    |
| Delete | /api/item/:id       | DELETE | Delete an item with provided item id                     |

### Running tests
1. `npm run test`          (Jest)
2. `npm run test:watch`    (Jest w/watch flag)
3. `npm run test:coverage` (Jest w/coverage and colors flags)
4. `npm run stress`        (Artillery stress testing)

    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage --colors",
    "stress": "artillery run artillery.yml"