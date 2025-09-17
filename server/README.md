# 🖥️ Section Server

## ⚙️ Installation des dépendances

Pour lancer le projet, rendez-vous dans le dossier `server/` et installez les dépendances avec :


```bash
npm install
```
Cette commande permet de récupérer toutes les dépendances nécessaires au projet.

## 🔧 Configuration du serveur

Pour connecter l’API à MongoDB et faire fonctionner le JWT, vous devez ajouter deux variables dans le fichier .env à la racine du dossier server/


### Exemple de fichier .env :
```
MONGO_PATH = "VotreMongoServer"
JWT_SECRET = "VotreJWTSecret"
```

## 🚀 Lancement du serveur

### Mode développement :


```bash
npm run start
```

Après avoir démarré l’application, vous verrez un message indiquant le port utilisé (par défaut 3000) et confirmant la connexion à la base de données.

Pour accéder directement à la documentation Swagger, rendez-vous sur :
http://localhost:3000/docs

### Mode production :


```bash
npm run start:prod
```
Cette commande build et lance l’application en version production.


## 🧪 Tests
Pour lancer les tests, utilisez la commande suivante :
```bash
npm run test
```

<p align="right"><small>Fait le 17/09/2025</small></p> 