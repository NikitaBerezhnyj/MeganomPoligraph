NC=\033[0m
GREEN=\033[0;32m

TARGET_DIR = deploy
CLIENT_DIST_DIR = client/dist
SERVER_DIR = server

all: setup build_frontend copy_frontend copy_backend test_run

setup:
	@echo -e "${GREEN}Створення цільового каталогу розгортання${NC}"
	mkdir -p $(TARGET_DIR)

build_frontend:
	@echo -e "${GREEN}Компіляція клієнської частини${NC}"
	cd client && npm run build

copy_frontend:
	@echo -e "${GREEN}Копіювання збірки інтерфейсу до каталогу розгортання${NC}"
	cp -r client/dist deploy/build

copy_backend:
	@echo -e "${GREEN}Копіювання ключолвих файлів сервера${NC}"
	mkdir -p deploy/node_modules deploy/uploads deploy/src
	cp server/package-lock.json deploy/package-lock.json
	cp -r server/node_modules/* deploy/node_modules/
	cp server/package.json deploy/package.json
	cp -r server/uploads/* deploy/uploads/
	cp -r server/src/* deploy/src/
	cp server/.env deploy/.env

test_run:
	@echo -e "${GREEN}Пробний запуск сайту${NC}"
	cd deploy && npm start

clean:
	@echo -e "${GREEN}Очищення всіх файлів та теки deploy${NC}"
	rm -rf $(TARGET_DIR)

.PHONY: all setup build_frontend copy_frontend copy_backend test_run clean