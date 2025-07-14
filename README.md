# Project Overview

This repository contains the source code for the **FAIR-Aware** application, designed to support the principles of Findability, Accessibility, Interoperability, and Reusability (FAIR) in data management and research practices.

The repository is structured into two main directories:

- **Backend**: Implemented with [NestJS](https://nestjs.com/), the backend handles core logic, API endpoints, and data processing.
- **Frontend**: Built with [Next.js](https://nextjs.org/), the frontend provides the user interface for various roles, including learners, instructors, and administrators.

# Setup
Define the .env for simplicity you can use .env.example:
```bash
cp .env.example .env
```

Start the `docker-compose.yml` file:
```bash
docker compose up
# for detached
docker compose up -d
```

___Warning___: The `docker_setup.sh` script is for development purposes and currently wipes any existing data, therefore do **NOT** use this in production!

# Authentication
Currently authentication is provided via KeyCloak, which is run via docker and runs on port `8090`. 
In order to use the 'cms' part of the application a test user has to be setup. 
You need to login on http://localhost:8090 as `kcadmin`; with password `kcpassword`
this can be found in the config of the docker container;
`docker-compose.yml` in the `dev_keycloak` section. 
The Keycloak config for the 'realm' is in `conf/keycloak/test-realm.json`, but somehow it does not contain users. 

In keycloak, make sue you have that FairAwatre realm active. 
1. Go to 'Users' and select 'Create new user'
   As the 'Username' fill in `testuser1`
   then push 'Create'.
2. For that 'testuser1' go to 'Credentials' and select 'Set password'
   Make sure that 'Temporary' is 'Off'
   Use the name as password for simplicity; `testuser1`
   then push 'Save'

You can now use the testuser1 credentials to login. 
