TechData v1.0.0

Web-Service
========================================

Setup web-service first time:
`npm install`

Start web-service server:
`npm start`

Node requirements:
  node -> v10.16.0
  npm  -> v6.10.2

Database:

MongoDB is used as database
Configure database as follows:

1. Create database: techdata
`use techdata`

2. Create database user: techdata

`db.createUser(
  {
    user: "techdata",
    pwd: "~check db configuration in source~",
    roles: [ { role: "userAdminAnyDatabase", db: "techdata" } ]
  }
)`

Sample data:

1. Sample users
`npm run reset-users`

========================================

Web-UI
========================================

Setup ui components first time:
`npm install`

Start webui server:
`npm start`
