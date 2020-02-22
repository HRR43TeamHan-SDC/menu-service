
Menu Service Module
------

## Installing Requirements/Dependencies
1. mongod
2. postgresSQL
3. neo4j

---
### Initialization
1. `npm install`
2. `npm run build` (for webpack) -- OR -- `npm run build:dev` (for webpack with watch)
3. `npm run mongo` (start mongod)

---
### Seeding database
1. `npm run seed`          (Mongo)
2. `npm run seed:files`    (Create dataset using multithreaded seeder9000)
3. `npm run load:postgres` (Postgres dataset loader)
4. `npm run load:neo4j`    (Neo4j dataset loader)

---
### Running
1. `npm start` (for Node) -- OR -- `npm run start:dev` (for nodemon)


### API Endpoints
| Action |       Endpoint       | Method | Description                                      |
|--------|----------------------|--------|--------------------------------------------------|
| Create | /api/restaurant      | POST   | Create a new restaurant                          |
| Read   | /api/menu/:ID        | GET    | Read menus of a provided restaurant              |
| Update | /api/restaurant/:ID  | PUT    | Swap or add menus for a provided restaurant      |
| Delete | /api/restaurant/:ID  | DELETE | Remove a provided restaurant from the database   |
hr


### Running tests
1. `npm test`          (Jest)
2. `npm test:watch`    (Jest w/watch flag)
3. `npm test:coverage` (Jest w/coverage and colors flags)