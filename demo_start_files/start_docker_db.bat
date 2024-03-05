cd ..
call docker-compose down -v
call docker-compose build --no-cache
call docker-compose up