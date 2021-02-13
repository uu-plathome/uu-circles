up:
	docker-compose up -d
build:
	docker-compose build --no-cache --force-rm
stop:
	docker-compose stop
down:
	docker-compose down --remove-orphans
restart:
	@make down
	@make up
destroy:
	docker-compose down --rmi all --volumes --remove-orphans
destroy-volumes:
	docker-compose down --volumes --remove-orphans
ps:
	docker-compose ps
logs:
	docker-compose logs
logs-watch:
	docker-compose logs --follow
log-web:
	docker-compose logs web
log-web-watch:
	docker-compose logs --follow web
log-app:
	docker-compose logs app
log-app-watch:
	docker-compose logs --follow app
log-db:
	docker-compose logs db
log-db-watch:
	docker-compose logs --follow db
db:
	docker-compose exec db bash
sql:
	docker-compose exec db bash -c 'mysql -u phper -psecret laravel_local'
ide-helper:
	php artisan clear-compiled
	php artisan ide-helper:generate
	php artisan ide-helper:meta
	php artisan ide-helper:models --nowrite
init:
	docker-compose build &&\
	docker-compose up -d &&\
	docker-compose exec app php -r "file_exists('.env') || copy('.env.example', '.env');" &&\
	docker-compose exec app composer install &&\
	docker-compose exec app php artisan key:generate &&\
	docker-compose exec app php artisan storage:link &&\
	docker-compose exec app chmod -R 777 storage &&\
	docker-compose exec app chmod -R 777 bootstrap/cache &&\
	docker-compose exec app php artisan config:cache