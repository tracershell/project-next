# 📌 Makefile
# 개발용 docker-compose 쉽게 실행하기

# 프로젝트 이름
PROJECT_NAME=project-next

# 기본 docker-compose 파일
COMPOSE_FILE=docker-compose.yml

# 기본 명령어 alias
up:
	docker-compose -f $(COMPOSE_FILE) up -d

down:
	docker-compose -f $(COMPOSE_FILE) down

build:
	docker-compose -f $(COMPOSE_FILE) build

logs:
	docker-compose -f $(COMPOSE_FILE) logs -f

restart: down up

ps:
	docker-compose -f $(COMPOSE_FILE) ps

# 초기화 (모든 볼륨 삭제)
reset:
	docker-compose -f $(COMPOSE_FILE) down -v

# nginx 설정 변경했을 때 nginx만 재시작
nginx-reload:
	docker exec nextjs-nginx nginx -s reload

# node 컨테이너에 접속
node-bash:
	docker exec -it nextjs-node /bin/sh

# mysql 컨테이너에 접속
mysql-bash:
	docker exec -it nextjs-mysql bash

# redis 컨테이너에 접속
redis-cli:
	docker exec -it nextjs-redis redis-cli
