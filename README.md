### HOW TO RUN

### Make sure you have Postman, Node, and Docker Installed!

##### 1. In backend directory, you must "npm install" ( this will change )
##### 2. In backend directory, create .env file with appropriate "PORT, JWTSECRET, DB_USERNAME, DB_PASSWORD, DB_PORT" environment variables
* Docker Compose
    * Production: (Creates NGINX web server to serve react-build)     *DOES NOT AUTOMATICALLY UPDATE WEBPAGE WHEN CHANGING REACT! MUST REBUILD!!!*
        - (to run) docker compose -f compose.prod.yml up --build -d
        - (to stop) docker compose -f compose.prod.yml down
    * Development: (UPDATES WEBPAGE)
        - (to run) docker compose -f compose.dev.yml up --build -d
        - (to stop) docker compose -f compose.dev.yml down
* Manually
    * Development:
        - Open two terminals, one you must "cd frontend" and the other, "cd backend"
        - In each you first run "npm install"
        - In each, you run "npm start
        - (PostgreSQL) Must setup server on your own and connect manually

exec into PostgreSQL docker container: (UPDATES WEBPAGE)
    - docker exec -it postgres_container psql -U root test_db

## FRONTEND PRODUCTION RUNS AT http://localhost/
## FRONTEND DEVELOPMENT RUNS AT http://localhost:3000/
## Backend endpoint/host is at http://localhost:5000/ (dev)
## Backend endpoint/host is at http://localhost:4000/ (test)



Development environment:\
    1. Frontend uses webpack and allows for hot reloading due to the environment variables in the docker-compose service (Although it is slower)\
    2. Backend uses nodemon for warm reloading

Productiont environment:\
    - Does not allow any reloading, so you must rebuild the Dockerfile Images on every code change!
