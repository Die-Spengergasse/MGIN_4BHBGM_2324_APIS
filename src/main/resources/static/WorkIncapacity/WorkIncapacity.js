document.addEventListener("DOMContentLoaded", function () {
    // Funktion zum Wiederherstellen der Tabelle aus dem Local Storage
    function restoreTable(data) {
        let tableBody = document.getElementById("impfDataTable").getElementsByTagName("tbody")[0];

        // Durchlaufe die Daten und füge sie der Tabelle hinzu
        data.forEach(function (aub) {
            let newRow = tableBody.insertRow(-1);
            appendDataToRow(newRow, aub);

            let actionCell = newRow.cells[8];
            if (!actionCell) {
                actionCell = newRow.insertCell(8);
                actionCell.colSpan = 2;

                // Füge Lösch-Button zur neuen Zeile hinzu
                let deleteButton = createButton("Löschen", "action-button btn-danger", deleteRow);
                actionCell.appendChild(deleteButton);

                // Füge Bearbeiten-Button zur neuen Zeile hinzu
                let editButton = createButton("Bearbeiten", "action-button btn-warning", editRow);
                actionCell.appendChild(editButton);
            }
        });
    }

    const submitBtn = document.querySelector("#submitBtn");
    let editingRow;

    submitBtn.addEventListener("click", function () {
        const aub = {};
        aub.fall = document.querySelector("#fall").value;
        aub.svnr = document.querySelector("#svnr").value;
        aub.krankenkasse = document.querySelector("#krankenkasse").value;
        aub.datumvon = document.querySelector("#datumvon").value;
        aub.datumbis = document.querySelector("#datumbis").value;
        aub.ausgehvon = document.querySelector("#ausgehvon").value;
        aub.ausgehbis = document.querySelector("#ausgehbis").value;
        aub.kommentare = document.querySelector("#kommentar").value;

        // Wenn editingRow gesetzt ist, aktualisiere die vorhandene Zeile
        if (editingRow) {
            updateRowData(editingRow, aub);
            editingRow = null; // Setze editingRow zurück, nachdem aktualisiert wurde
        } else {
            // Wenn editingRow nicht gesetzt ist, füge eine neue Zeile hinzu
            let tableBody = document.getElementById("aubDataTable").getElementsByTagName("tbody")[0];
            let newRow = tableBody.insertRow(-1);

            // Füge Datenzellen zur neuen Zeile hinzu
            appendDataToRow(newRow, aub);

            // Füge Buttons zu einer neuen Zelle hinzu, wenn noch nicht vorhanden
            let actionCell = newRow.cells[8];
            if (!actionCell) {
                actionCell = newRow.insertCell(8);
                actionCell.colSpan = 2;

                // Füge Lösch-Button zur neuen Zeile hinzu
                let deleteButton = createButton("Löschen", "btn-danger", deleteRow);
                actionCell.appendChild(deleteButton);

                // Füge Bearbeiten-Button zur neuen Zeile hinzu
                let editButton = createButton("Bearbeiten", "btn-warning", editRow);
                actionCell.appendChild(editButton);
            }
        }

        // Array in ein JSON-String umwandeln und im Local Storage speichern
        // const currentData = Array.from(document.getElementById("impfDataTable").getElementsByTagName("tbody")[0].rows).map(row => {
        //   const rowData = {};
        //   for (let i = 0; i < row.cells.length - 2; i++) {
        //     rowData[`field${i + 1}`] = row.cells[i].innerText;
        //   }
        //   return rowData;
        // });

        localStorage.setItem("patientData", JSON.stringify(currentData));

        // Leere das Formular nach dem Absenden oder Aktualisieren
        clearForm();
    });

    // Funktion zum Erstellen von Buttons
    function createButton(text, btnClass, clickHandler) {
        let button = document.createElement("button");
        button.innerText = text;
        button.classList.add("btn", btnClass, "btn-sm");
        button.addEventListener("click", clickHandler);
        return button;
    }

    // Funktion zum Löschen einer Zeile
    function deleteRow() {
        let row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);

        // Aktualisiere den Datensatz nach dem Löschen einer Zeile
        updateDatasetAfterDelete(row);
    }

    // Funktion zum Aktualisieren des Datensatzes nach dem Löschen einer Zeile
    function updateDatasetAfterDelete(row) {
        let index = row.rowIndex - 1; // Berücksichtige Header-Zeile
        currentData.splice(index, 1); // Entferne den Datensatz aus dem aktuellen Datensatz

        // Speichere den aktualisierten Datensatz im Local Storage
        localStorage.setItem("patientData", JSON.stringify(currentData));
    }

    // Funktion zum Bearbeiten einer Zeile
    function editRow() {
        // Hole die zu bearbeitende Zeile
        editingRow = this.parentNode.parentNode;

        // Füge die Daten aus der Zeile ins Formular ein
        document.querySelector("#fall").value = editingRow.cells[0].innerText;
        document.querySelector("#svnr").value = editingRow.cells[1].innerText;
        document.querySelector("#krankenkasse").value = editingRow.cells[2].innerText;
        document.querySelector("#datumvon").value = editingRow.cells[3].innerText;
        document.querySelector("#datumbis").value = editingRow.cells[4].innerText;
        document.querySelector("#ausgehvon").value = editingRow.cells[5].innerText;
        document.querySelector("#ausgehbis").value = editingRow.cells[6].innerText;
        document.querySelector("#kommentar").value = editingRow.cells[7].innerText;
    }

    // Funktion zum Aktualisieren von Zeilendaten
    function updateRowData(row, newData) {
        // Lösche die vorhandenen Zellen in der Zeile
        row.innerHTML = "";

        // Füge die neuen Daten zur Zeile hinzu
        appendDataToRow(row, newData);

        // Füge Buttons zu einer neuen Zelle hinzu, wenn noch nicht vorhanden
        let actionCell = row.cells[8];
        if (!actionCell) {
            actionCell = row.insertCell(8);
            actionCell.colSpan = 2;

            // Füge Lösch-Button zur neuen Zeile hinzu
            let deleteButton = createButton("Löschen", "btn-danger", deleteRow);
            actionCell.appendChild(deleteButton);

            // Füge Bearbeiten-Button zur neuen Zeile hinzu
            let editButton = createButton("Bearbeiten", "btn-warning", editRow);
            actionCell.appendChild(editButton);
        }

        // Aktualisiere den Datensatz nach dem Bearbeiten einer Zeile
        updateDatasetAfterEdit(row, newData);
    }

    // Funktion zum Aktualisieren des Datensatzes nach dem Bearbeiten einer Zeile
    function updateDatasetAfterEdit(row, newData) {
        let index = row.rowIndex - 1; // Berücksichtige Header-Zeile
        currentData[index] = newData; // Aktualisiere den Datensatz im aktuellen Datensatz

        // Speichere den aktualisierten Datensatz im Local Storage
        localStorage.setItem("patientData", JSON.stringify(currentData));
    }

    // Funktion zum Hinzufügen von Daten zu einer Zeile
    function appendDataToRow(row, data) {
        // Füge Daten zur gegebenen Zeile hinzu
        for (let i = 0; i < 8; i++) {
            let cell = row.insertCell(i);
            cell.innerText = data[Object.keys(data)[i]];
        }
    }

    // Funktion zum Leeren des Formulars
    function clearForm() {
        // Leere das Formular nach dem Absenden oder Aktualisieren
        document.querySelector("#fall").value = "";
        document.querySelector("#svnr").value = "";
        document.querySelector("#krankenkasse").value = "";
        document.querySelector("#datumvon").value = "";
        document.querySelector("#datumbis").value = "";
        document.querySelector("#ausgehvon").value = "";
        document.querySelector("#ausgehbis").value = "";
        document.querySelector("#kommentar").value = "";
    }
});
