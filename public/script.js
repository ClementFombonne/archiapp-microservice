// ==========================================
// 3.4 - Modularité : Adresse du serveur
// ==========================================
// Comme le front-end et le back-end sont sur le même serveur,
// on laisse la chaîne vide pour faire des appels relatifs.
let serverUrl = "";

// ==========================================
// 3.2 - Récupération et affichage (Fetch)
// ==========================================
function fetchAndUpdateMessages() {
    const listElement = document.getElementById("message-list");
    listElement.innerHTML = "<li><i>Chargement depuis le serveur...</i></li>";

    // Appel relatif : ça va taper directement sur /msg/getAll de ton serveur Node
    fetch(serverUrl + '/msg/getAll')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            listElement.innerHTML = ""; // On vide la liste d'attente

            data.forEach(item => {
                const li = document.createElement("li");
                li.className = "message-item";

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

                const content = document.createElement("div");
                content.className = "message-content";
                content.textContent = item.msg;

                li.appendChild(header);
                li.appendChild(content);
                listElement.prepend(li);
            });
        })
        .catch(function(error) {
            listElement.innerHTML = "<li><b>Erreur de connexion au serveur !</b> Vérifie que le serveur Node.js est bien lancé.</li>";
            console.error("Erreur Fetch:", error);
        });
}

// ==========================================
// 3.3 - Publication d'un nouveau message
// ==========================================
document.getElementById("send-btn").addEventListener("click", function() {
    const pseudo = document.getElementById("pseudo").value || "Anonyme";
    const messageText = document.getElementById("new-message").value;

    if (messageText.trim() === "") {
        alert("Votre message est vide !");
        return;
    }

    // On prépare l'URL avec le message et le pseudo en paramètre
    // On encode le tout pour que les espaces et caractères spéciaux passent bien dans l'URL
    const route = `/msg/post/${encodeURIComponent(messageText)}?pseudo=${encodeURIComponent(pseudo)}`;

    fetch(serverUrl + route)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if(data.code === 1) {
                // Succès ! On vide le champ et on rafraîchit la liste depuis le serveur
                document.getElementById("new-message").value = "";
                fetchAndUpdateMessages();
            }
        });
});

// Bouton de mise à jour manuelle
document.getElementById("update-btn").addEventListener("click", function() {
    fetchAndUpdateMessages();
});

// Bouton de scroll vers le haut
const scrollTopBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }
});

scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Changement de thème (déjà présent)
document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("theme-clair");
    document.body.classList.toggle("theme-sombre");
});

// ==========================================
// Initialisation au chargement de la page
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
    fetchAndUpdateMessages();
});
