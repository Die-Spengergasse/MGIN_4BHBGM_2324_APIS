document.addEventListener("DOMContentLoaded", function () {
    const materialForm = document.getElementById("material-form");
    const materialList = document.getElementById("material-list");
    const materialCategory = document.getElementById("material-category");

    materialForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const materialName = document.getElementById("material-name").value;
        const materialQuantity = document.getElementById("material-quantity").value;
        const materialDescription = document.getElementById("material-description").value;
        const selectedCategory = materialCategory.value;

        // Erstelle ein neues Listenelement für das Material
        const materialItem = document.createElement("li");
        materialItem.classList.add("material-item");

        // Füge HTML für das Material hinzu
        materialItem.innerHTML = `
            <h3>${materialName}</h3>
            <p><strong>Menge:</strong> ${materialQuantity}</p>
            <p><strong>Beschreibung:</strong> ${materialDescription}</p>
            
        `;
        materialItem.innerHTML += `<p><strong>Kategorie:</strong> ${selectedCategory}</p>`;
        // Füge das Material-Listenelement zur Liste hinzu
        materialList.appendChild(materialItem);

        // Leere das Formularfeld
        materialForm.reset();
    });
});