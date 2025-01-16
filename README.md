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
