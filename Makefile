# Variables
DC=docker compose -f docker-compose.dev.yml
FRONTEND_CONTAINER=$(DC) exec frontend
BACKEND_CONTAINER=$(DC) exec backend

# Commandes Docker de base
.PHONY: up down build logs restart clean

up:
	$(DC) up

down:
	$(DC) down

build:
	$(DC) build

logs:
	$(DC) logs -f

restart:
	$(DC) restart

clean:
	$(DC) down -v --remove-orphans

# Commandes de développement
.PHONY: shell-frontend shell-backend codegen codegen-watch db-shell lint

shell-frontend:
	$(FRONTEND_CONTAINER) sh

shell-backend:
	$(BACKEND_CONTAINER) bash

codegen:
	$(FRONTEND_CONTAINER) npm run codegen

codegen-watch:
	$(FRONTEND_CONTAINER) npm run codegen:watch

db-shell:
	$(DC) exec db psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}

lint:
	$(FRONTEND_CONTAINER) npm run lint
	$(BACKEND_CONTAINER) python -m black .

format:
	$(FRONTEND_CONTAINER) npx prettier --write .

# Commandes de maintenance
.PHONY: prune install update

prune:
	docker system prune -af

install:
	cd frontend && npm install
	cd backend && pip install -r requirements.txt

update:
	cd frontend && npm update
	cd backend && pip install -r requirements.txt --upgrade

# Commandes de test
.PHONY: test test-frontend test-backend

test:
	make test-frontend
	make test-backend

test-frontend:
	$(FRONTEND_CONTAINER) npm run test

test-backend:
	$(BACKEND_CONTAINER) python -m pytest

# Help
.PHONY: help
help:
	@echo "Commandes disponibles :"
	@echo "  up              - Démarre tous les conteneurs"
	@echo "  down            - Arrête tous les conteneurs"
	@echo "  build           - Reconstruit tous les conteneurs"
	@echo "  logs            - Affiche les logs en temps réel"
	@echo "  restart         - Redémarre tous les conteneurs"
	@echo "  clean           - Nettoie complètement l'environnement"
	@echo "  shell-frontend  - Ouvre un shell dans le conteneur frontend"
	@echo "  shell-backend   - Ouvre un shell dans le conteneur backend"
	@echo "  codegen         - Lance la génération de code GraphQL"
	@echo "  codegen-watch   - Lance la génération de code GraphQL en mode watch"
	@echo "  db-shell        - Ouvre un shell PostgreSQL"
	@echo "  lint            - Lance les linters"
	@echo "  test            - Lance tous les tests"
	@echo "  prune           - Nettoie les ressources Docker non utilisées"
	@echo "  install         - Installe les dépendances"
	@echo "  update          - Met à jour les dépendances"
