## HOW TO RUN

### Backend needs Postman, Node, and Docker Installed!
### Frontend needs only Docker!

#### 1. In backend directory, create .env file with appropriate "PORT, JWTSECRET, DB_USERNAME, DB_PASSWORD, DB_PORT" environment variables, refer to pinned comment in "important-info" channel in discord to know how the file should look
#### 2. In parent directory with Docker Desktop already running, run this command in terminal: 
## <code>docker compose --build -d</code>

### For running backend tests, do the above, but you must also:
#### <code>cd backend</code>
#### <code>npm i</code>
## <code>npm run test</code>


exec into PostgreSQL docker container:
    - docker exec -it postgres_container psql -U root test_db

## Frontend runs at: http://localhost/ (production)
## Frontend runs at: http://localhost:3000/ (dev)

## Backend runs at: http://localhost/ (production)
## Backend runs at: http://localhost:5000/ (dev)
## Backend runs at: http://localhost:4000/ (test environment)