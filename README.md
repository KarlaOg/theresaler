### Lancer le projet à la racine

docker-compose up

### URL

http://127.0.0.1
http://127.0.0.1/api/

# Liens utils

https://symfony.com/doc
https://api-platform.com/docs
https://vuejs.org/v2/guide/

# Commande Docker

### Env DB (à mettre dans .env, si pas déjà présent)

DATABASE_URL="postgresql://user:password@db:5432/db?serverVersion=13&charset=utf8"

### Lister l'ensemble des commandes existances

docker-compose exec php bin/console

### Supprimer le cache du navigateur

docker-compose exec php bin/console cache:clear

### Création de fichier vierge

docker-compose exec php bin/console make:controller
docker-compose exec php bin/console make:form

### Crétion d'un CRUD complet

docker-compose exec php bin/console make:crud

### Commandes de création d'entité

docker-compose exec php bin/console make:entity

### Voir les requètes qui seront jouer avec force

docker-compose exec php bin/console doctrine:schema:update --dump-sql

### Executer les requètes en DB

docker-compose exec php bin/console doctrine:schema:update --force

## Load fixtures

docker-compose exec php bin/console doctrine:fixtures:load

# Projet Architecture

A la racine le `docker-compose.yml`
Dans le dossier `docker/` toutes config
Ensuite dans le dossier `api/` ils y a toutes de la business logique
`front-vue` le front en VueJS

## See api

http://localhost/api
