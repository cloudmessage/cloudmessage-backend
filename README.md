# Application Overview

## Repositories

This guide describes how to deploy the entire cloudmessage application. The application
consists of the following repositories:

* cloudmessage-backend
* cloudmessage-frontend
* create-customer-inst
* infra
* cluster-infra

The first three repositories contain the application code, the last two contain terraform code
for deploying backend and create-customer-inst respectively.

## Technologies Used

* Frontend: React
* Backend: Node, express
* Database: SQLite (development), Postgres (production)
* Inter-service messaging: RabbitMQ

## Additional Requirements / Services Used

### For both local development and production deployment

* Auth0 for authentication

### For production deployment

* Netlify for hosting Frontend
* ElephantSQL for hosted Postgres
* CloudAMQP for hosted RabbitMQ
* A web domain for use with application backend API


## Setup Auth0

The application uses Auth0 for authentication. Login into Auth0 and perform the steps below:
* create an `Application`, pick application type of `Single Page Web Application`
* Enter frontend URL in the following fields for setting up the application:
  * Allowed Callback URLs
  * Allowed Logout URLs
  * Allowed Web Origins
* When entering frontend URLs, enter multiple URLs separated by commas. This is relevant
when there are separate deployments (such as local development and production deployment).
For example, typical entries for this application would look like:

    ```
    http://localhost:3006, https://xxxxxxxx.netlify.app/
    ```
* Information from Auth0 application is needed to be set as environment variables in frontend
as well as backend repos. Some of the information required includes:
  * Audience
  * Domain
  * Client Id


## Migrations

**NOTE**: Migration should be run if deploying to freshly provisioned database. If you already have a running database (for production) or sqlite database (for local development), then there is no need to run migrations.

The steps for using migrations is as follonws:
* Initialize knex or create knexfile manually (we create the file manually for this project)
* Create migrations
* Run migrations


### Create knexfile
We create a file called `knexoptions.js` in our root folder. This is what is referred to as *knexfile* in `knex` documentation.


### Create migrations

Create migration files using the following command, we have to pass-in the `--file` option since we do not use the default knexfile name:

```
npx knex migrate:make --file knexoptions.js create_table --env development

npx knex migrate:make --file knexoptions.js create_table --env production
```

### Run migrations

```
npx knex migrate:latest --knexfile knexoptions.js
```

[Local Development](LOCAL_DEVELOPMENT.md)

[Production Deployment](PROD_DEPLOYMENT.md)
