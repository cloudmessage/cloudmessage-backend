# Running locally

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

## Run instance RabbitMQ container

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


## Run customer instances RabbitMQ container

Navigate to `create-customer-inst` repo's root directory. Run the following command to
start customer instances container:

```
npm run dev:start-cust-rabbit-container
```

Follow logs using:

```
docker logs --follow <container-id>
```


## Run create customer request service

Navigate to repo `create-customer-inst`. Two environment variables are needed for running this service. These variables are set in .env file. Set variable `INSTANCE_MQ_URL`
to url where instance requests are queued by the backend service. This url would
access RabbitMQ instance running in the container launched in the
`Run instance RabbitMQ container` section above.

The second environment variable needed is `CUSTOMER_CLUSTER_URL`. Set this variable
to RabbitMQ instance where customer instances will be created, which is the container
launched in the `Run customer instances RabbitMQ container` section.

The `.env` would look as follows:

```
INSTANCE_MQ_URL=amqp://localhost:10001/
CUSTOMER_CLUSTER_URL=http://localhost
```

After creating the `.env` file, run the following command:

```
npm run start
```


## Run backend

Naviagate to repo `cloudmessage-backend`. Create `.env` file, add two environment variables
required for Auth0 authentication: `AUTH0_AUDIENCE` and `AUTH0_ISSUER_BASE_URL`. In addition,
set variable `INSTANCE_MQ_URL` to url where the backend will send instance requests.

The `.env` would look as follows:

```
AUTH0_AUDIENCE=https://cloudmessage.com
AUTH0_ISSUER_BASE_URL=https://cloudmessage.us.auth0.com
INSTANCE_MQ_URL=amqp://localhost:10001/
```

After creating the `.env` file, run the following command:

```
npm run start
```


## Run frontend

Naviagate to repo `cloudmessage-frontend`. Run the following command:

```
npm run start
```
