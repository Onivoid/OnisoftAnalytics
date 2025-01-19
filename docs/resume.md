# Plan de Projet Analytics

## Vue d'ensemble
Un service d'analytics auto-hébergé conçu pour un usage personnel, permettant de suivre et de visualiser l'utilisation d'une application. L'architecture priorise la modularité, la scalabilité et la portabilité en utilisant Docker pour les environnements de développement et de production.

---

## Composants de la Stack

### 1. **Backend**
- **Framework** : FastAPI (Python)
- **Objectif** : API GraphQL (via Strawberry) pour gérer les événements de tracking et le traitement des données.

### 2. **Frontend**
- **Framework** : React Vite avec TypeScript
- **UI Library** : ShadCN pour un design cohérent
- **Objectif** : Tableau de bord pour visualiser et gérer les données analytiques.

### 3. **Base de données**
- **Type** : PostgreSQL
- **Objectif** : Stockage persistant de toutes les données analytiques, optimisé pour les requêtes et les agrégations.

### 4. **Gateway**
- **Service** : NGINX
- **Objectif** : Reverse-Proxy pour sécuriser le routage du trafic et s'assurer qu'aucun service interne n'expose directement ses ports.

### 5. **Conteneurisation**
- **Outil** : Docker
- **Objectif** :
  - Consistance entre les environnements de développement et de production.
  - Gestion simplifiée des dépendances.

### 6. **CI/CD**
- **Plateforme** : GitHub Workflows
- **Caractéristiques** :
  - Workflows segmentés en plusieurs fichiers YAML pour le build, les tests, et le déploiement.
  - CI de formatage et de lint pour le frontend et le backend.

---

## Fonctionnalités principales

### Backend
- Gère les événements de tracking via GraphQL uniquement.
- Expose une API sécurisée pour collecter et récupérer les données analytiques.
- Permet l'export de données en CSV en fonction d'une plage de dates reçue via une requête GraphQL.
- Développé entièrement dans Docker pour éviter les installations locales de dépendances Python.
  - Supporte le mode "hot reload" pour le développement.

### Frontend
- Tableau de bord responsive pour la visualisation des données en temps réel et historiques.
- Supporte le filtrage et l'agrégation des données analytiques.
- Offre une interface permettant de sélectionner une plage de dates pour exporter les données analytiques en CSV.

### Base de données
- Schémas conçus pour un stockage efficace des données d'événements avec extensibilité pour des métriques futures.

### Déploiement
- NGINX sert de point d'entrée unique pour toutes les requêtes externes, routant le trafic vers les services appropriés de manière sécurisée.
- Tous les composants sont orchestrés avec Docker Compose pour garantir la consistance et simplifier le déploiement.

---

## Environnement de Développement

### Configuration Docker
1. **Backend**
   - Application FastAPI avec Strawberry exécutée dans un conteneur dédié.
   - Hot reload activé pour le développement.

2. **Frontend**
   - Application React Vite servie localement pendant le développement.

3. **Base de données**
   - Conteneur PostgreSQL avec volume persistant pour le stockage des données.

4. **NGINX**
   - Sert de proxy inverse, garantissant qu'aucun port n'est exposé directement.

---

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

---

## Résumé
Ce projet est conçu pour être modulaire, portable et efficace, avec une priorité donnée à une segmentation claire et une maintenabilité optimale. L'utilisation de Docker garantit des environnements cohérents entre le développement et la production. La stratégie de génération de CSV garantit une gestion efficace des données analytiques tout en réduisant l'utilisation de l'espace disque sur le VPS. Les workflows GitHub automatisent le CI/CD pour un processus de développement fluide.