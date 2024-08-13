# Cloudmessage backend

## Application Deployment


### Deployment Overview

This guide describes how to deploy the entire cloudmessage application. The application
consists of the following repositories:

* cloudmessage-backend
* cloudmessage-frontend
* create-customer-inst
* infra
* cluster-infra

The first three repositories contain the application code, the last two contain terraform code
for deploying backend and create-customer-inst respectively.

#### Technologies Used

* Frontend: React
* Backend: Node, express
* Database: SQLite (development), Postgres (production)
* Inter-service messaging: RabbitMQ

#### AWS Accounts

The application uses two AWS accounts:
* AWS account 1 - for deploying cloudmessage-backend and create-customer-inst service
* AWS account 2 - for creating rabbitmq instances for customers

At the moment, the application creates customer rabbitmq instance on AWS in region us-west-2. In the future, additional regions may be supported or even other cloud providers.

#### Additional Requirements / Services Used

Besides AWS, additional services used are:
* Auth0 for authentication
* Netlify for hosting Frontend
* ElephantSQL for hosted Postgres
* CloudAMQP for hosted RabbitMQ
* A web domain for use with application backend API

#### Setup Auth0

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


### Deploy create-customer-inst service

Use the `cluster-infra` repo to deploy `create-customer-inst` service.

```
AWS_PROFILE="aws-account2-credential-profile-name" terraform apply
```

[Manual step]
Using AWS console, locate and save public ip address of the container within the ECS service.
This value will be used when deploying backend as described below.


### Backend Overview

Backend uses Auth0 for authentication. See the Frontend section for setting up Auth0.

In repo `cloudmessage-backend`, set following variables in file `.env`:
* AUTH0_AUDIENCE - for Auth0 authentication
* AUTH0_ISSUER_BASE_URL - for Auth0 authentication
* NODE_ENV - set to `production`
* DB_URL - url for hosted Postgres database
* INSTANCE_MQ_URL - url for hosted RabbitMQ instance
* INSTANCES_TABLE_NAME - table name used for storing instances information, suggested value `instances`


### Migrations

The steps for using migrations is as follonws:
* Initialize knex or create knexfile manually (we create the file manually for this project)
* Create migrations
* Run migrations


##### Create knexfile
We create a file called `knexoptions.js` in our root folder. This is what is referred to as *knexfile* in `knex` documentation.


##### Create migrations

Create migration files using the following command, we have to pass-in the `--file` option since we do not use the default knexfile name:

```
npx knex migrate:make --file knexoptions.js create_table --env development

npx knex migrate:make --file knexoptions.js create_table --env production
```

##### Run migrations

```
npx knex migrate:latest --knexfile knexoptions.js
```

### Deploy Backend

Use the `infra` repo to deploy `cloudmessage-backend`. Run steps outlined the following two sections:

* Set variable values
* Run deployment terraform

#### Set variable values

In the `infra` repo, copy `variables.tf.example` to `variables.tf` and set variable values in the `variables.tf` file.

```
cp variables.tf.example variables.tf
```

Set the values of following variables to same values as those set in backend section above:

* AUTH0_AUDIENCE
* AUTH0_ISSUER_BASE_URL
* NODE_ENV
* DB_URL
* INSTANCE_MQ_URL
* INSTANCES_TABLE_NAME

In addition, set the value of the following two variables to value of the backend domain name. We need
to own a domain name:

* BACKEND_DOMAIN_NAME - set the domain name to which backend will be deployed
* CUSTOMER_CLUSTER_URL - set to IP address of customer cluster (use the value that is output by the script during create-customer-inst service above). Prefix the IP address with `http://`.




#### Run deployment terraform

Use the `infra` repo to deploy `cloudmessage-backend`.

```
AWS_PROFILE="aws-account1-credential-profile-name" terraform apply
```

### Deploy frontend

Frontend is deployed using Netlify. Netlify's free `Starter` plan is sufficient for our
purpose. Steps involved in deploying frontend to Netlify are:

* create a `Site`. Pick the option of importing an existing project and pick integrate
with git
* after creating the site, Netlify assigns a url for the deployment that looks like
`https://xxxxxxxx.netlify.app`
* Get info from Auth0 and set environment variables within `Site configuration` on the Netlify site. Prefix each variable with REACT_APP. Following variables are set:
  * REACT_APP_AUTH0_AUDIENCE
  * REACT_APP_AUTH0_CLIENT_ID
  * REACT_APP_AUTH0_DOMAIN
  * REACT_APP_AUTH0_REDIRECT_URI
* we need to tell frontend the url for our backend API. After backend is deployed, set
backend's url as a variable as shown below. It is recommended to purchase a domain for
use with backend.
  * REACT_APP_CLOUDMESSAGE_API_URL

* Get deployment url for the site from Netlify and add the url to the following sections
on Auth0:
  * Allowed Callback URLs
  * Allowed Logout URLs
  * Allowed Web Origins


[Local Development](LOCAL_DEVELOPMENT.md)
