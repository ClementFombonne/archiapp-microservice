# Rapport de TP : Développement d'une Application de Messagerie Full-Stack

## 1. Introduction et Objectifs du TP

L'objectif de ce Travail Pratique était de concevoir et de déployer un micro-service web complet (Full-Stack) permettant le dépôt et la consultation de messages texte. Ce projet s'articule autour de deux axes majeurs :

1. **Un Front-end interactif et moderne** (HTML, CSS, Javascript) conçu initialement comme une maquette (Mock-up) puis rendu dynamique.
2. **Un Back-end robuste** (Node.js avec le framework Express) servant d'API RESTful pour stocker et distribuer les messages de manière asynchrone, tout en hébergeant les fichiers statiques du client.

Ce rapport détaille les choix d'implémentation, l'architecture logicielle, ainsi que les structures de données utilisées pour mener à bien ce projet.

---

## 2. Architecture Client (Front-end)

La partie cliente a été développée sans framework lourd (Vanilla JS, CSS pur), en mettant l'accent sur la sémantique, l'accessibilité et un design moderne. L'ensemble des fichiers clients a été regroupé dans un dossier `public/` servi statiquement par le serveur.

### 2.1. Structure HTML5 et Sémantique

Le fichier `index.html` a été structuré en respectant les standards du W3C.

* Utilisation de balises sémantiques (`<header>`, `<main>`, `<section>`) pour hiérarchiser l'information.
* Séparation claire entre la zone d'affichage des messages (`#messages-section`) et le formulaire d'envoi (`#post-section`).
* Le contenu statique initial (messages de remplissage) est conçu pour être écrasé dynamiquement par le Javascript au chargement de la page, garantissant que l'interface ne reste jamais vide en cas de latence réseau.

### 2.2. Choix de Design (CSS3) : Interface "Liquid Glass"

Pour l'aspect visuel, j'ai opté pour une esthétique moderne appelée **Glassmorphism** (ou *Liquid Glass*), inspirée des interfaces récentes d'Apple.

* **Effet de verre dépoli :** Obtenu grâce à la propriété `backdrop-filter: blur(20px)` combinée à des fonds semi-transparents (`rgba`).
* **Thèmes dynamiques :** L'implémentation d'un mode clair et d'un mode sombre a été réalisée via l'utilisation de **variables CSS** (`:root`). Le basculement se fait en modifiant la classe du `<body>` via Javascript, ce qui redéfinit instantanément la palette de couleurs (fonds, textes, bordures).
* **Responsivité :** L'interface utilise `Flexbox` et s'adapte automatiquement aux différentes tailles d'écrans (mobiles, tablettes, PC) sans nécessiter de Media Queries complexes, grâce à des largeurs relatives et un comportement en colonne qui bascule en ligne sur les grands écrans.
* **Animations :** Ajout d'orbes lumineux flottants en arrière-plan (`@keyframes`) pour accentuer l'effet de réfraction visuelle des panneaux en verre.

### 2.3. Logique Applicative (Javascript Client)

Le fichier `script.js` gère toute l'interactivité et la communication avec le serveur via des appels AJAX.

* **Appels asynchrones (Fetch API) :** La récupération et l'envoi de données s'effectuent via l'API `fetch()`. L'utilisation des promesses (`.then()`) permet de ne pas bloquer l'interface utilisateur pendant les requêtes réseau.
* **Génération dynamique du DOM :** La fonction `update(data)` parcourt le tableau JSON reçu du serveur et utilise `document.createElement()` pour construire chaque bulle de message. Cette approche prévient les failles d'injection (XSS) comparativement à l'utilisation massive de `innerHTML`.
* **Synchronisation et Polling :** Pour pallier l'absence de WebSockets et simuler un fonctionnement "temps réel", la fonction de mise à jour est appelée non seulement au clic manuel, mais aussi de manière automatisée toutes les 5 secondes via `setInterval(fetchAndUpdateMessages, 5000)`.
* **Sécurité des requêtes :** Lors de la soumission d'un nouveau message, les données saisies par l'utilisateur sont formatées avec `encodeURIComponent()` avant d'être injectées dans l'URL de la requête GET, évitant ainsi de corrompre la structure de l'URL avec des caractères spéciaux ou des espaces.

## 3. Architecture Serveur (Back-end)

Le serveur a été développé en Javascript avec **Node.js** et le framework **Express.js**. Il joue un double rôle : il sert les fichiers statiques du front-end (HTML/CSS/JS) et expose une API pour la gestion asynchrone des messages et d'un compteur.

### 3.1. Choix Technologiques et Middlewares

L'utilisation d'Express a permis de simplifier la création des routes et la configuration du serveur :

* **Fichiers Statiques :** Le middleware `express.static('public')` a été utilisé pour distribuer automatiquement le client web. Ainsi, le front-end et l'API cohabitent sur le même port et le même domaine, évitant les problèmes de requêtes inter-domaines en production.
* **CORS (Cross-Origin Resource Sharing) :** Un middleware dédié a été implémenté pour ajouter les en-têtes nécessaires (`Access-Control-Allow-Origin`) afin de permettre au client d'effectuer des requêtes AJAX, même si l'API venait à être hébergée sur un domaine distinct de l'interface.
* **Logs Serveur :** Des middlewares personnalisés ont été ajoutés pour tracer l'activité du serveur dans la console. Chaque visite d'URL et chaque nouveau message posté génèrent un log horodaté (ex: `[14:32:05] 📝 NOUVEAU MESSAGE de Alice`), facilitant le débogage et le monitoring en production.

### 3.2. Structure des Données et État

L'application maintient son état en mémoire vive (RAM). Bien que volatile (réinitialisée à chaque redémarrage du serveur), cette approche est parfaitement adaptée aux contraintes de ce TP.

* **Compteur (`let compteur = 0;`) :** Un état simple modifié via des requêtes dédiées (`/cpt/inc`).
* **Messages (`let allMsgs = []`) :** Les messages sont stockés dans un tableau d'objets Javascript. Chaque objet contient des métadonnées enrichies : le `pseudo` de l'auteur, la `date` exacte de publication (générée côté serveur pour éviter les falsifications clientes), et le contenu du `msg`.

### 3.3. Conception de l'API (Routes)

Le micro-service expose plusieurs routes pour interagir avec les données, renvoyant systématiquement les réponses au format **JSON** via la méthode `res.json()` :

* **Consultation (`/msg/getAll`, `/msg/get/:id`, `/msg/nber`) :** Ces routes permettent respectivement de récupérer l'intégralité du tableau, un message ciblé par son index, ou le nombre total de messages postés.
* **Publication (`/msg/post/*?pseudo=...`) :** Conformément aux consignes d'utilisation d'appels GET pour simplifier les tests depuis un navigateur, la publication passe par l'URL. Le contenu du message est extrait de la route dynamique (`req.params[0]`) et décodé via `decodeURIComponent()` pour restaurer les espaces et caractères spéciaux. Le pseudo est récupéré via les paramètres de requête (`req.query.pseudo`).
* **Suppression (`/msg/del/:id`) :** Permet de retirer un message du tableau en utilisant la méthode `splice()`.

---

## 4. Environnement de Développement et Déploiement

### 4.1. Développement Local (Nix)

Pour garantir un environnement de développement reproductible et isolé, un fichier `shell.nix` a été mis en place. Il installe automatiquement Node.js et définit un `shellHook` pour guider le lancement du serveur localement, assurant que les dépendances (comme `express`) fonctionnent sans conflit avec le système hôte.

### 4.2. Déploiement en Production (Render)

L'application Full-Stack a été déployée sur la plateforme **Render.com** (Web Service).

* **Adaptation du Port :** Le serveur a été mis à jour pour écouter dynamiquement le port fourni par l'hébergeur via la variable d'environnement `process.env.PORT`, avec un fallback sur le port `8080` pour le développement local.
* **Build & Start :** Le service a été configuré pour exécuter `npm install` (afin de récupérer Express) à chaque déploiement, puis `node index.js` pour lancer l'application.

---

## 5. Conclusion et Livrables

Ce TP a permis d'illustrer concrètement la séparation des préoccupations entre le Front-end (UI/UX, accessibilité, requêtes asynchrones) et le Back-end (routage, manipulation de données, format JSON). L'application finale est fluide, responsive, et démontre une bonne communication client-serveur.

**Liens du projet :**

* **Dépôt du code source (GitHub) :** <https://github.com/ClementFombonne/archiapp-microservice>
* **Application déployée en direct (Render) :** <https://archiapp-microservice.onrender.com/>

