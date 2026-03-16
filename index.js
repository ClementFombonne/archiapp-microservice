const express = require('express');
const app = express();

app.use(express.static('public'));

// Middleware pour autoriser les requêtes CORS (Cross-Origin)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// --- 2.2 Route de test ---
app.get('/test/*', function(req, res) {
  const param = req.params[0]; // Récupère ce qui est après /test/
  res.json({ "msg": param });
});

// --- 2.3 Micro-service avec un état (Compteur) ---
let compteur = 0;

app.get('/cpt/query', function(req, res) {
  res.json({ valeur: compteur });
});

app.get('/cpt/inc', function(req, res) {
  if (req.query.v !== undefined) {
    const v = parseInt(req.query.v);
    if (!isNaN(v)) {
      compteur += v;
      res.json({ "code": 0 });
    } else {
      res.json({ "code": -1 }); // N'est pas un entier
    }
  } else {
    compteur += 1;
    res.json({ "code": 0 });
  }
});

// --- 2.4 Micro-service de gestion de messages ---
// Base de données en mémoire avec métadonnées
let allMsgs = [
  { pseudo: "Admin", date: new Date().toLocaleString(), msg: "Bienvenue sur le nouveau serveur Node.js !" }
];

// Récupérer tous les messages
app.get('/msg/getAll', function(req, res) {
  res.json(allMsgs);
});

// Récupérer le nombre de messages
app.get('/msg/nber', function(req, res) {
  res.json({ count: allMsgs.length });
});

// Récupérer un message spécifique
app.get('/msg/get/:id', function(req, res) {
  const id = parseInt(req.params.id);
  if (!isNaN(id) && id >= 0 && id < allMsgs.length) {
    res.json({ "code": 1, "message": allMsgs[id] });
  } else {
    res.json({ "code": 0 });
  }
});

// Poster un nouveau message (utilisation de GET comme demandé dans l'énoncé)
app.get('/msg/post/*', function(req, res) {
  // On récupère le message dans l'URL et on le décode (gestion des espaces, etc.)
  const texteMessage = decodeURIComponent(req.params[0]); 
  // On récupère le pseudo via les paramètres (ex: ?pseudo=Alice)
  const pseudoAuteur = req.query.pseudo || "Anonyme";

  const heure = new Date().toLocaleTimeString();
  console.log(`[${heure}] 📝 NOUVEAU MESSAGE de ${pseudoAuteur} : "${texteMessage}"`);
  allMsgs.push({
    pseudo: pseudoAuteur,
    date: new Date().toLocaleString(),
    msg: texteMessage
  });

  res.json({ "code": 1, "nouvelId": allMsgs.length - 1 });
});

// Effacer un message
app.get('/msg/del/:id', function(req, res) {
  const id = parseInt(req.params.id);
  if (!isNaN(id) && id >= 0 && id < allMsgs.length) {
    allMsgs.splice(id, 1);
    res.json({ "code": 1 });
  } else {
    res.json({ "code": 0 });
  }
});

// Lancement du serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serveur prêt et à l'écoute sur le port ${PORT}...`);
});
