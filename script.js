// ==========================================
// 3.1 - Un petit peu de programmation
// ==========================================

function fact(n) {
    if (n === 0 || n === 1) return 1;
    return n * fact(n - 1);
}
console.log("Factorielle de 6 :", fact(6));

function applique(f, tab) {
    let res = [];
    for (let i = 0; i < tab.length; i++) {
        res.push(f(tab[i]));
    }
    return res;
}

console.log("Applique fact à [1,2,3,4,5,6] :", applique(fact, [1, 2, 3, 4, 5, 6]));
console.log("Applique fonction anonyme :", applique(function(n) { return (n+1); }, [1, 2, 3, 4, 5, 6]));


// ==========================================
// 3.2 & 3.3 - Un peu de dynamique et modèle complet
// ==========================================

// Structure de données enrichie avec méta-données (pseudo, date)
let msgs = [
    { pseudo: "Alice", date: new Date().toLocaleString(), msg: "Hello World" },
    { pseudo: "Bob", date: new Date().toLocaleString(), msg: "Blah Blah" },
    { pseudo: "Charlie", date: new Date().toLocaleString(), msg: "I love cats" }
];

// Fonction pour mettre à jour la liste dans le HTML
function update(data) {
    const listElement = document.getElementById("message-list");
    listElement.innerHTML = ""; // 1. On efface la liste actuelle

    // 2. On parcourt le tableau
    data.forEach(item => {
        const li = document.createElement("li");
        
        // Méta-données (date et pseudo)
        const meta = document.createElement("small");
        meta.textContent = `Posté par ${item.pseudo} le ${item.date}`;
        
        // Le contenu du message
        const content = document.createElement("span");
        content.textContent = item.msg;

        // On assemble et on injecte dans la balise ul
        li.appendChild(meta);
        li.appendChild(content);
        listElement.appendChild(li);
    });
}

// Lier le bouton "Mettre à jour" à la fonction update()
document.getElementById("update-btn").addEventListener("click", function() {
    update(msgs);
});

// Gérer l'envoi d'un nouveau message
document.getElementById("send-btn").addEventListener("click", function() {
    const pseudo = document.getElementById("pseudo").value || "Anonyme";
    const messageText = document.getElementById("new-message").value;

    if (messageText.trim() === "") {
        alert("Votre message est vide !");
        return;
    }

    // Ajout dans la structure msgs
    msgs.push({
        pseudo: pseudo,
        date: new Date().toLocaleString(),
        msg: messageText
    });

    // On réaffiche la liste et on vide le textarea
    update(msgs);
    document.getElementById("new-message").value = "";
});

// Changer le style (Clair / Sombre)
document.getElementById("theme-toggle").addEventListener("click", function() {
    const body = document.body;
    if (body.classList.contains("theme-clair")) {
        body.classList.replace("theme-clair", "theme-sombre");
    } else {
        body.classList.replace("theme-sombre", "theme-clair");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    update(msgs);
})
