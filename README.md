# Event Grids

## Installation

Pour installer les différents package nécessaire à l'utilisation de React:
```bash
npm install sass sass-loader react react-dom react-router-dom axios prop-types
```

### Base de données

Si la base de données n'est pas créer
```bash
symfony console doctrine:database:create
```

Ensuite, une fois la BDD créer, il faut maintenant générer les migrations s'il ne sont pas déjà générer. Par défault, les fichiers de migrations sont stockés dans le répertoire migrations à la racine du projet Symfony.
```bash
symfony console m:migration
```

Une fois les fichiers de migration générer, il faut les executer. Pour faire cela, il faut aller à la racine du projet Symfony, puis executer la commande suivante :
```bash
symfony console doctrine:migration:migrate
```

Si importer un fichier SQL est trop lourd pour MySQL, voici une commande très utile :
```bash
mysql -u username -p database_name < file.sql
```
Il faudra remplacer le "username" par l'id de connexion de votre propre BDD.
Le "database_name", remplacer par le nom de la base dans votre BDD
Le "file.sql" par le fichier SQL (et non un fichier zip/compressé, il n'aime pas ça) ou plutôt, le chemin du fichier SQL a importé.

## Authentification

Symfony bundle:
```bash
composer require lexik/jwt-authentication-bundle
```

Une fois que la dépendance a été ajouté, il faudra maintenant générer une clé. Cette clé sera ensuite utilisé pour générer les token qui seront envoyer aux utilisateurs de la plateforme. Voici la commande pour générer ces clés :
```bash
php bin/console lexik:jwt:generate-keypair
```

Une fois la commande ci-dessus lancée, elle va créer un sous-dossier jwt dans le dossier config. Dans ce sous-dossier, on aura 2 fichiers, ces 2 fichiers sont les clés privés et publics qui seront utlisé dans les actions de génération du token. A ce niveau, on a rien de plus.

Il faudra maintenant configurer le fichier packages/security.yaml. Je recommande d'utiliser la doc de symfony pour configurer la connexion par token ou de regarder la configuration dans mes autres projets utilisant cette méthode de connexion

## Commandes utiles

Voici ci-joint les commandes qui débloque quand le besoin ce présente

### Github

IF you have NOT pushed your changes to remote
```bash
git reset HEAD~1
```
ELSE you have pushed your changes to remote
```bash
git revert HEAD
```

### Générer un mot de passe hashé

```bash
symfony console security:hash-password
```

## Issues

Lors de l'installation de symfony, le package `AssetMapper` (c'est l'équivalent de `webpack-encore`) est automatiquement installé. Pour le désinstaller de symfony :
```bash
composer remove symfony/asset-mapper
```

Pour installer le package webpack-encore:
```bash
composer require symfony/webpack-encore-bundle
```