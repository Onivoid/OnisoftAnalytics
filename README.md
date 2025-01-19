# Onisoft Analytics

## Vue d'ensemble
Onisoft Analytics est un service d'analytics auto-hébergé conçu pour un usage personnel, permettant de suivre et de visualiser l'utilisation d'une application. L'architecture priorise la modularité, la scalabilité et la portabilité en utilisant Docker pour les environnements de développement et de production.

## Prérequis
- Docker
- Docker Compose

## Installation

1. Clonez le dépôt :
   ```sh
   git clone https://github.com/Onivoid/OnisoftAnalytics.git
   cd OnisoftAnalytics
   ```

2. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement nécessaires :
   ```env
   POSTGRES_USER=your_postgres_user
   POSTGRES_PASSWORD=your_postgres_password
   POSTGRES_DB=your_postgres_db
   VITE_API_URL=http://localhost:7000/api
   ```

3. Lancez les conteneurs Docker :
   ```sh
   docker compose -f docker-compose.dev.yml up -d
   ```

## Utilisation

### Accès aux services
Tous les services sont accessibles via NGINX à l'adresse [http://localhost:7000](http://localhost:7000).

- **Frontend** : [http://localhost:7000](http://localhost:7000)
- **Backend API** : [http://localhost:7000/api](http://localhost:7000/api)
- **GraphQL endpoint** : [http://localhost:7000/graphql](http://localhost:7000/graphql)
- **Documentation de l'API** : [http://localhost:7000/api/docs](http://localhost:7000/api/docs)

### Base de données
La base de données PostgreSQL est accessible sur le port 5432.

## Commandes utiles

### Docker
- Démarrer les conteneurs :
  ```sh
  docker compose -f docker-compose.dev.yml up -d
  ```
- Arrêter les conteneurs :
  ```sh
  docker compose -f docker-compose.dev.yml down
  ```
- Rebuild les conteneurs :
  ```sh
  docker compose -f docker-compose.dev.yml build
  ```
- Voir les logs :
  ```sh
  docker compose -f docker-compose.dev.yml logs -f
  ```

### Makefile
- Démarrer les conteneurs :
  ```sh
  make up
  ```
- Arrêter les conteneurs :
  ```sh
  make down
  ```
- Rebuild les conteneurs :
  ```sh
  make build
  ```
- Voir les logs :
  ```sh
  make logs
  ```
- Nettoyer l'environnement :
  ```sh
  make clean
  ```
- Ouvrir un shell dans le conteneur frontend :
  ```sh
  make shell-frontend
  ```
- Ouvrir un shell dans le conteneur backend :
  ```sh
  make shell-backend
  ```
- Lancer la génération de code GraphQL :
  ```sh
  make codegen
  ```
- Lancer les linters :
  ```sh
  make lint
  ```
- Lancer tous les tests :
  ```sh
  make test
  ```

## Stratégie de Sauvegarde CSV

### Objectif
Permettre à l'utilisateur de générer et télécharger des fichiers CSV des données analytiques sans les stocker sur le VPS.

### Processus
1. **Export des données** :
   - Le frontend permet à l'utilisateur de définir une plage de dates.
   - Cette plage est envoyée à l'API GraphQL qui génère le fichier CSV correspondant et le transmet directement au frontend.
   - Exemple de mutation GraphQL :
     ```graphql
     mutation {
       exportData(startDate: "2025-01-01", endDate: "2025-02-01") {
         success
         csvFile
       }
     }
     ```

2. **Téléchargement direct** :
   - Le fichier CSV est généré à la volée et transmis directement au client sans être stocké sur le VPS.

3. **Aucun stockage permanent** :
   - Les fichiers CSV ne sont pas sauvegardés sur le VPS, supprimant le besoin de table `backups` dans la base de données.

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.