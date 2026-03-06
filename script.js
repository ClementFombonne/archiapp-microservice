// ==========================================
// Base de données simulée
// ==========================================
let msgs = [
    { pseudo: "Alice", date: new Date().toLocaleString(), msg: "Hello World ! Le style devrait marcher maintenant." },
    { pseudo: "Bob", date: new Date().toLocaleString(), msg: "C'est super joli cet effet de transparence." },
    { pseudo: "Charlie", date: new Date().toLocaleString(), msg: "J'adore le Liquid Glass !" }
];

// ==========================================
// Fonction de mise à jour de l'affichage
// ==========================================
function update(data) {
    const listElement = document.getElementById("message-list");
    listElement.innerHTML = ""; // On vide la liste

    data.forEach(item => {
        // Le conteneur principal du message
        const li = document.createElement("li");
        li.className = "message-item";

        // L'en-tête (Pseudo + Date)
        const header = document.createElement("div");
        header.className = "message-header";
        
        const pseudoSpan = document.createElement("span");
        pseudoSpan.className = "message-pseudo";
        pseudoSpan.textContent = item.pseudo;
        
        const dateSpan = document.createElement("span");
        dateSpan.className = "message-date";
        dateSpan.textContent = item.date;

        header.appendChild(pseudoSpan);
        header.appendChild(dateSpan);

        // Le texte du message
        const content = document.createElement("div");
        content.className = "message-content";
        content.textContent = item.msg;

        // Assemblage final
        li.appendChild(header);
        li.appendChild(content);
        listElement.appendChild(li);
    });
}

// ==========================================
// Écouteurs d'événements
// ==========================================
document.getElementById("update-btn").addEventListener("click", function() {
    update(msgs);
});

document.getElementById("send-btn").addEventListener("click", function() {
    const pseudo = document.getElementById("pseudo").value || "Anonyme";
    const messageText = document.getElementById("new-message").value;

    if (messageText.trim() === "") {
        alert("Votre message est vide !");
        return;
    }

    // Ajout au tableau
    msgs.push({
        pseudo: pseudo,
        date: new Date().toLocaleString(),
        msg: messageText
    });

    // Mise à jour de la vue
    update(msgs);
    document.getElementById("new-message").value = "";
});

// Changement de thème (Clair/Sombre)
document.getElementById("theme-toggle").addEventListener("click", function() {
    const body = document.body;
    if (body.classList.contains("theme-clair")) {
        body.classList.replace("theme-clair", "theme-sombre");
    } else {
        body.classList.replace("theme-sombre", "theme-clair");
    }
});

// ==========================================
// Initialisation au chargement de la page
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
    update(msgs);
});
