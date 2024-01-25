document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('arztbrief-form');
    const tableBody = document.querySelector("#patient-table tbody");
    const editButton = document.getElementById('edit-button');
    let selectedRow = null;

    // Laden gespeicherter Daten beim Start
    loadDataFromLocalStorage();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const patientenname = document.getElementById('patientenname').value.trim();
        const nachname = document.getElementById('nachname').value.trim();
        const geburtstag = document.getElementById('geburtstag').value.trim();
        const svnr = document.getElementById('svnr').value.trim();
        const diagnose = document.getElementById('diagnose').value.trim();
        const medikamente = document.getElementById('medikamente').value;
        const medikament = document.getElementById('medikament').value.trim();

        if (selectedRow) {
            // Edit the selected row
            selectedRow.cells[0].textContent = patientenname;
            selectedRow.cells[1].textContent = nachname;
            selectedRow.cells[2].textContent = geburtstag;
            selectedRow.cells[3].textContent = svnr;
            selectedRow.cells[4].textContent = diagnose;
            selectedRow.cells[5].textContent = medikamente === 'ja' ? medikament : 'Nein';
            selectedRow = null;
        } else {
            // Add a new row
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
                            <td>${patientenname}</td>
                            <td>${nachname}</td>
                            <td>${geburtstag}</td>
                            <td>${svnr}</td>
                            <td>${diagnose}</td>
                            <td>${medikamente === 'ja' ? medikament : 'Nein'}</td>
                            <td><button class="edit-button">Bearbeiten</button></td>
                        `;

            // Add an edit button to the new row
            const editCell = newRow.cells[6];
            const editRowButton = editCell.querySelector(".edit-button");

            editRowButton.addEventListener('click', function () {
                // Handle the edit button click for the selected row
                handleEditRow(newRow);
            });
        }

        // Speichern der Daten im Local Storage
        saveDataToLocalStorage();

        // Formular zurücksetzen
        form.reset();
    });

    // Handle the edit button click for a specific row
    function handleEditRow(row) {
        // Populate the form fields with the row data
        document.getElementById('patientenname').value = row.cells[0].textContent;
        document.getElementById('nachname').value = row.cells[1].textContent;
        document.getElementById('geburtstag').value = row.cells[2].textContent;
        document.getElementById('svnr').value = row.cells[3].textContent;
        document.getElementById('diagnose').value = row.cells[4].textContent;
        const medikamenteSelect = document.getElementById('medikamente');
        const medikamentInput = document.getElementById('medikament');
        const medikamentValue = row.cells[5].textContent;

        if (medikamentValue === 'Nein') {
            medikamenteSelect.value = 'nein';
            medikamentInput.value = '';
        } else {
            medikamenteSelect.value = 'ja';
            medikamentInput.value = medikamentValue;
        }

        // Set the selected row for editing
        selectedRow = row;

        // Hide the edit button while editing
        editButton.style.display = 'none';
    }

    // Funktion zum Speichern der Daten im Local Storage
    function saveDataToLocalStorage() {
        const dataToSave = Array.from(tableBody.rows).map(row => {
            return {
                patientenname: row.cells[0].textContent,
                nachname: row.cells[1].textContent,
                geburtstag: row.cells[2].textContent,
                svnr: row.cells[3].textContent,
                diagnose: row.cells[4].textContent,
                medikament: row.cells[5].textContent
            };
        });

        localStorage.setItem('arztbriefTableData', JSON.stringify(dataToSave));
    }

    // Funktion zum Laden der Daten aus dem Local Storage
    function loadDataFromLocalStorage() {
        const savedData = localStorage.getItem('arztbriefTableData');

        if (savedData) {
            const parsedData = JSON.parse(savedData);

            parsedData.forEach(data => {
                const newRow = tableBody.insertRow();
                newRow.innerHTML = `
                                <td>${data.patientenname}</td>
                                <td>${data.nachname}</td>
                                <td>${data.geburtstag}</td>
                                <td>${data.svnr}</td>
                                <td>${data.diagnose}</td>
                                <td>${data.medikament}</td>
                                <td><button class="edit-button">Bearbeiten</button></td>
                            `;

                const editCell = newRow.cells[6];
                const editRowButton = editCell.querySelector(".edit-button");

                editRowButton.addEventListener('click', function () {
                    handleEditRow(newRow);
                });
            });
        }
    }
});