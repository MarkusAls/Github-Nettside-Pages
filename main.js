const produkter = [
    { id: 1, navn: "Fargerike løpesko", pris: 1299, bilde: "lopesko1.jpg", kategori: "løpesko" },
    { id: 2, navn: "Komfortable joggesko", pris: 999, bilde: "joggesko1.jpg", kategori: "joggesko" },
    { id: 3, navn: "Lette sandaler", pris: 599, bilde: "sandaler1.jpg", kategori: "sandaler" },
    { id: 4, navn: "Stilige løpesko", pris: 1499, bilde: "lopesko2.jpg", kategori: "løpesko" },
    { id: 5, navn: "Trendy joggesko", pris: 1199, bilde: "joggesko2.jpg", kategori: "joggesko" },
    { id: 6, navn: "Elegante sandaler", pris: 799, bilde: "sandaler2.jpg", kategori: "sandaler" },
];

let handlekurv = [];

function viseProdukter(filteredProdukter = produkter) {
    const produktContainer = document.getElementById("produkter");
    produktContainer.innerHTML = '';
    filteredProdukter.forEach(produkt => {
        const produktElement = document.createElement("div");
        produktElement.className = "produkt";
        produktElement.innerHTML = `
            <img src="images/${produkt.bilde}" alt="${produkt.navn}">
            <h3>${produkt.navn}</h3>
            <p>Pris: ${produkt.pris} kr</p>
            <button onclick="leggTilHandlekurv(${produkt.id})">Legg til i handlekurv</button>
        `;
        produktContainer.appendChild(produktElement);
    });
}

function leggTilHandlekurv(produktId) {
    const produkt = produkter.find(p => p.id === produktId);
    handlekurv.push(produkt);
    oppdaterHandlekurvAntall();
    visHandlekurv();
}

function oppdaterHandlekurvAntall() {
    document.getElementById("handlekurv-antall").textContent = handlekurv.length;
}

function visHandlekurv() {
    const handlekurvListe = document.getElementById("handlekurv-liste");
    handlekurvListe.innerHTML = '';
    let total = 0;
    handlekurv.forEach(produkt => {
        const li = document.createElement("li");
        li.textContent = `${produkt.navn} - ${produkt.pris} kr`;
        handlekurvListe.appendChild(li);
        total += produkt.pris;
    });
    document.getElementById("handlekurv-total").textContent = total;
}

// Håndterer filtrering
document.getElementById("kategori-filter").addEventListener("change", filtrerProdukter);
document.getElementById("pris-filter").addEventListener("input", filtrerProdukter);

function filtrerProdukter() {
    const kategori = document.getElementById("kategori-filter").value;
    const maksPris = parseInt(document.getElementById("pris-filter").value);
    document.getElementById("pris-verdi").textContent = `Maks pris: ${maksPris} kr`;

    const filteredProdukter = produkter.filter(produkt => 
        (kategori === "alle" || produkt.kategori === kategori) && produkt.pris <= maksPris
    );

    viseProdukter(filteredProdukter);
}

// Modal funksjonalitet
const modal = document.getElementById("handlekurv-modal");
const handlekurvIkon = document.querySelector(".handlekurv-ikon");
const lukkeKnapp = document.getElementsByClassName("lukk")[0];

handlekurvIkon.onclick = function() {
    modal.style.display = "block";
    visHandlekurv();
}

lukkeKnapp.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Initialiser siden
window.onload = function() {
    viseProdukter();
    oppdaterHandlekurvAntall();
};