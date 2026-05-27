# Project Overview

This repository contains the source code for the **FAIR-Aware** application, designed to support the principles of Findability, Accessibility, Interoperability, and Reusability (FAIR) in data management and research practices.

The repository is structured into two main directories:

- **Backend**: Implemented with [NestJS](https://nestjs.com/), the backend handles core logic, API endpoints, and data processing.
- **Frontend**: Built with [Next.js](https://nextjs.org/), the frontend provides the user interface for various roles, including learners, instructors, and administrators.

# Setup

The only requirement is **Docker**.

## Local development (one command)

```bash
./local-setup.sh
```

This rebuilds and starts the whole stack (database, backend, frontend) and then
serves:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

___Warning___: `local-setup.sh` is for **local development only**. Every run
resets `.env` from `.env.example` and **wipes the database volume**, and it uses
throwaway credentials, so do **NOT** use it in production.

## Manual

```bash
cp .env.example .env
docker compose up --build # add -d to run detached
```
