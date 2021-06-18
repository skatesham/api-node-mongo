# API Node and MongoDB with connection using Mongoose
API with Node and Mongoose.  
- The default production git branch is `master`.
- The web server is running with Node and Express.
- The database configured is MongoDB and "driver" is Mongoose.
- The authentication is JWT (Json Web Token).
- The web listener only starts after database connect.
- The New Relic dependency is added, and so on if you don't want configure remove `require` of new relic on `app.js`.

## 1. Deployment

### Deploy to heroku with heroku ClI

Installing Heroku CLI:
```bash
sudo snap install --classic heroku
```

Login on Heroku CLI, configure project and star deploy. You must change every app name `bcg-node-mongo-api` as a unique name.
```bash
heroku login
heroku create bcg-node-mongo-api
git push heroku master
```
##### Obs: If already created heroku dyno you can configure as `heroku git:remote -a bcg-node-mongo-api` 

### Configure Heroku Dyno environment variables
Must configure on Heroku Dashboard the configured environment variables or with Heroku CLI as `heroku config:set ATTRIBUTE_NAME=value`

### Configure New Relic on Heroku 
Configuring without the newrelic.js file, can be done by following config environment variable, with properly attributes.  
##### Obs: Add-on New Relic from Heroku has a free mode that is called "wayne".
```bash
heroku addons:create newrelic:wayne -a bcg-domain-core

heroku config:set NEW_RELIC_LICENSE_KEY=<Add your license key>
heroku config:set NEW_RELIC_APP_NAME=<Insert your app name>
```

## 2. Development

### Running local database
Run command on project source folder as following:
```bash
docker-compose up -d
```

### Configure Environment Variable
You can create environment variables manually or create a file `.env` copy as `.env.example` and fulfill as needed.

On for configure `MONGO_URI` follow the file `env.example` and you should configure the IP Address of container docker. For this, run:

```bash
docker inspect <id or name container> | grep "IPAddress"
```
Get the value as `172.25.0.3` and replace ip on `MONGO_URI`.  

##### Observation: Find docker container id or name on `docker ps` identified with image `mongo`.

### Configure database credentials
We'll go inside docker container, connect to MongoDB as root, create a user for app connection. Run this command:
```bash
docker exec -i -t <id or name container> /bin/bash

mongodb -u- root -p
# password: example

use bcg
db.createUser(
{
    user: "user_db",
    pwd: "password_db",
    roles: [ 
        { role: "readWrite", db: "bcg" }
    ]
})
```

### Running application

Generate Swagger Documentatio and run as dev
```bash
npm run swagger
```
 
Run as monitor
```bash
npm run dev
```

### Swagger URL
The port can change as the `PORT` environment variable changes.  
http://localhost:3000/docs

### Manage database data with GUI mode

Management with MongoDB Express, available on http://localhost:8081/.

### Available scripts

```json
{
    "dev": "nodemon app.js",
    "start": "node app.js",
    "swagger-autogen": "rm -rf swagger-api-specification.json && node swagger.js",
    "swagger": "npm run swagger-autogen && npm run dev"
}
```

## 3. Monitoriment

Reporting throght New Relic.  
 You'll must search for the app on New Relic APM Dashboard.
 Access on https://newrelic.com/, or direct link to [Dashbord ATM](https://one.newrelic.com/-/0LkjnPvq1wo)
