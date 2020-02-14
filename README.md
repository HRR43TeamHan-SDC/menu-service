
Menu Service Module
------

## Installing Requirements/Dependencies
1. mongod
2. postgresSQL
3. neo4j

---

## Initialization
1. `npm install`
2. `npm run build` (for webpack) -- OR -- `npm run build:dev` (for webpack with watch)
3. `npm run mongo` (start mongod)

---


---

## Seeding database
1. `npm run seed`          (Mongo)
2. `npm run seed:files`    (Create dataset using multithreaded seeder9000)
3. `npm run load:postgres` (Postgres)
4. `npm run load:neo4j`    (Neo4j)

---

## Running
1. `npm start` (for Node) -- OR -- `npm run start:dev` (for nodemon)
2. `npm run seed` (from root directory for MySQL)


## Endpoints
| Action |     Endpoint     | Method | Description                                      |
|--------|------------------|--------|--------------------------------------------------|
| Create | /api/menu        | POST   | Create a new record of 15 photos max             |
| Read   | /api/menu/:ID    | GET    | Read photos of a provided restaurant             |
| Update | /api/menu/:ID    | PUT    | Swap or add menus for a provided restaurant      |
| Delete | /api/menu/:ID    | DELETE | Remove a provided restaurant from the database   |


Running tests
1. `npm test`          (Jest)
2. `npm test:watch`    (Jest w/watch flag)
3. `npm test:coverage` (Jest w/coverage and colors flags)