# 💬 Messageez - Chatting Client-Serveur

[![App Status](https://img.shields.io/website?url=https%3A%2F%2Farchiapp-microservice.onrender.com&up_message=En%20ligne&down_message=Hors%20ligne&style=for-the-badge&label=Statut&color=success)](https://archiapp-microservice.onrender.com/)

Ce projet est une application web **Full-Stack** de type "Message Board" (forum de discussion). Il a été réalisé dans le cadre d'un TP pour apprendre à construire une architecture Client-Serveur complète.

L'interface graphique adopte un design moderne **"Liquid Glass" (Glassmorphism)** inspiré d'Apple, entièrement responsive et sans l'utilisation de frameworks externes. Le backend est une API RESTful légère gérant l'état des messages en mémoire.

## ✨ Fonctionnalités
* **Design Glassmorphism :** Interface fluide avec effets de verre dépoli et arrière-plan animé.
* **Thèmes dynamiques :** Bascule instantanée entre le mode Clair (Light) et Sombre (Dark).
* **Temps réel simulé :** Actualisation automatique de la liste des messages (Polling asynchrone via Fetch).
* **API REST complète :** Routes pour récupérer, ajouter, compter et supprimer des messages.
* **Déploiement Cloud :** Serveur configuré pour s'adapter dynamiquement aux ports de l'hébergeur (Render).

## 🛠️ Stack Technique
* **Frontend :** HTML5, CSS3 (Variables natives, Flexbox), Javascript Vanilla (Fetch API).
* **Backend :** Node.js, Express.js.
* **Environnement :** Nix Shell (pour la reproductibilité de l'environnement de développement).

## 🚀 Installation et Lancement (Local)

### Via Nix (Recommandé)
1. Clonez ce dépôt : `git clone https://github.com/ClementFombonne/archiapp-microservice.git`
2. Lancez l'environnement isolé : `nix-shell`
3. Installez les dépendances : `npm install`
4. Lancez le serveur : `node index.js`
5. Ouvrez votre navigateur sur `http://localhost:8080`

### Via Node.js classique
Si vous avez déjà Node.js installé sur votre machine :
```bash
npm install
node index.js
```

## 📡 Documentation de l'API

Le serveur expose les routes suivantes :

| Méthode | Route | Description |
| --- | --- | --- |
| `GET` | `/msg/getAll` | Récupère tous les messages au format JSON. |
| `GET` | `/msg/get/:id` | Récupère le message à l'index donné. |
| `GET` | `/msg/nber` | Renvoie le nombre total de messages. |
| `GET` | `/msg/post/[texte]?pseudo=[nom]` | Ajoute un nouveau message (URL encodée). |
| `GET` | `/msg/del/:id` | Supprime un message par son index. |

*(Note : L'utilisation de GET pour la publication a été un choix pédagogique imposé pour faciliter les tests via la barre d'adresse du navigateur).*

## 🌍 Déploiement

L'application est déployée et accessible publiquement sur Render :
👉 **[Messageez](https://archiapp-microservice.onrender.com/)**

