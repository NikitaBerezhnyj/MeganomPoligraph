NC=\033[0m
GREEN=\033[0;32m

TARGET_DIR = deploy/

all: setup install_dependencies copy_sources test_run

setup:
	@echo -e "${GREEN}Створення цільового каталогу розгортання${NC}"
	mkdir -p $(TARGET_DIR)

install_dependencies:
	@echo -e "${GREEN}Встановлення залежностей через composer${NC}"
	composer install

copy_sources:
	@echo -e "${GREEN}Копіювання ключових файлів${NC}"
	mkdir -p $(TARGET_DIR)/vendor $(TARGET_DIR)/actions $(TARGET_DIR)/assets $(TARGET_DIR)/config $(TARGET_DIR)/includes $(TARGET_DIR)/templates
	cp -r vendor/* $(TARGET_DIR)/vendor/
	cp -r assets/* $(TARGET_DIR)/assets/
	cp -r config/* $(TARGET_DIR)/config/
	cp -r actions/* $(TARGET_DIR)/actions/
	cp -r includes/* $(TARGET_DIR)/includes/
	cp -r templates/* $(TARGET_DIR)/templates/
	cp composer.json $(TARGET_DIR)/composer.json
	cp composer.lock $(TARGET_DIR)/composer.lock
	cp .env $(TARGET_DIR)/.env
	cp info.php $(TARGET_DIR)/info.php
	cp index.php $(TARGET_DIR)/index.php
	cp .htaccess $(TARGET_DIR)/.htaccess
	cp README.md $(TARGET_DIR)/README.md
	cp robots.txt $(TARGET_DIR)/robots.txt
	cp sitemap.xml $(TARGET_DIR)/sitemap.xml

test_run:
	@echo -e "${GREEN}Пробний запуск сайту${NC}"
	cd $(TARGET_DIR) && php -S localhost:8000

clean:
	@echo -e "${GREEN}Очищення всіх файлів та теки $(TARGET_DIR)${NC}"
	rm -rf $(TARGET_DIR)

.PHONY: all setup install_dependencies copy_sources test_run clean
