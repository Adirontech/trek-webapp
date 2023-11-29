FROM postgres:latest

# Copy the database initialization scripts
COPY /api/init /docker-entrypoint-initdb.d