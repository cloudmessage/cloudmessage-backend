# Cloudmessage backend

## Application deployment


### Overview

This guide describes how to deploy the entire cloudmessage application. The application
consists of the following repositories:

* cloudmessage-backend
* cloudmessage-frontend
* create-customer-inst
* infra
* cluster-infra

The first three repositories contain the application code, the last two contain terraform code
for deploying backend and create-customer-inst respectively.

#### Technologies used

* Frontend: React
* Backend: Node, express
* Database: SQLite (development), Postgres (production)
* Inter-service messaging: RabbitMQ

#### AWS accounts

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


### Deploy create-customer-inst service

Use the `cluster-infra` repo to deploy `create-customer-inst` service.

```
AWS_PROFILE="aws-account2-credential-profile-name" terraform apply
```

[Manual step]
Using AWS console, locate and save public ip address of the container within the ECS service.
Update `variables.tf` in repo `cloudmessage-infra` for the variable `CUSTOMER_CLUSTER_URL`.


### Backend

#### Backend Overview

Backend uses Auth0 for authentication. See the Frontend section for setting up Auth0.

In repo `cloudmessage-backend`, set following variables in file `.env`:
* AUTH0_AUDIENCE - for Auth0 authentication
* AUTH0_ISSUER_BASE_URL - for Auth0 authentication
* DB_URL - url for hosted Postgres database
* INSTANCE_MQ_URL - url for hosted RabbitMQ instance


#### Deploy Backend

Use the `infra` repo to deploy `cloudmessage-backend`.

In file `variables.tf`, set values for variables used in the `main.tf` terraform file. Variables
to be set include:

* BACKEND_DOMAIN_NAME


```
AWS_PROFILE="aws-account1-credential-profile-name" terraform apply
```

#### Set variable values



### Deploy frontend


## Running locally

For running the project locally, following five items need to be run:
* Instance RabbitMQ container
* Customer instances RabbitMQ container
* Create customer request service
* Backend
* Frontend

At least three terminal windows are needed to run: (1) customer request service,
(2) backend, (3) frontend. The two containers run in background, but it is useful
to look at the container logs, so two additional terminal windows are needed to
follow the container logs.

### Run instance RabbitMQ container

The `package.json` file in repo `cloudmessage-backend` contains a script to start the instance
RabbitMQ container. After navigating to `cloudmessage-backend` repo's root directory, running
the following command will start the container:

```
npm run dev:start_instance_queue
```

After the container start, the container logs can be monitered as follows:

```
docker logs --follow <container-id>
```


### Run customer instances RabbitMQ container

Navigate to repo `create-customer-inst` repo's root directory. Run the following command to
start customer instances container:

```
npm run dev:start-cust-rabbit-container
```

Follow logs using:

```
docker logs --follow <container-id>
```


### Run create customer request service
### Run backend
### Run frontend
