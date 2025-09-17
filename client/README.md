# 📁 Section Client

## ⚙️ Installation des dépendances et configuration

Pour lancer le projet, rendez-vous dans le dossier `client/` et installez les dépendances avec :

```bash
npm install
```
Cette commande permet de récupérer toutes les dépendances nécessaires au projet.

## 🔧 Configuration de l’API

Créez un fichier .env à la racine du dossier client/ pour configurer l’URL de l’API.

### 🌱 Pour tester en local :
```
VITE_API_URL="http://localhost:3000"
```
### ☁️ Pour utiliser l’API en ligne :
```
VITE_API_URL="https://nightgaunt.cloud/api"
```
## 🚀 Lancer le projet

### Mode développement :
```bash
npm run dev
```
⚠️ Assurez-vous d’avoir bien lancé la partie serveur avant de démarrer le client.
Si vous ne l’avez pas encore configurée, rendez-vous dans le dossier server/ et consultez son README pour les instructions.

### Build pour la production :
```bash
npm run build
```
<p align="right"><small>Fait le 17/09/2025</small></p> 