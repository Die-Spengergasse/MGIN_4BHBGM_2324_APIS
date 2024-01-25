document.addEventListener("DOMContentLoaded", function () {
    const patientListTableElement = document.getElementById("patient-list");
    const saveButton = document.getElementById("speichern");
    const editButton = document.getElementById("bearbeiten");
    const deleteButton = document.getElementById("loeschen");
    const geburtsdatumInput = document.getElementById("geburtsdatum");
    const alterInput = document.getElementById("alter");
    const aufzeichnungStart = document.getElementById("aufzeichnung-start");
    const aufzeichnungEnde = document.getElementById("aufzeichnung-ende");
    const patientForm = document.getElementById("patient-form");

    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let selectedRowIndex = -1;

    // Funktion zur Berechnung der Dauer
    function calculateDuration() {
        const startTime = new Date(aufzeichnungStart.value);
        const endTime = new Date(aufzeichnungEnde.value);
        const duration = (endTime - startTime) / 60000;
        document.getElementById("dauer").value = duration + " Minuten";
    }

    // Funktion zur Berechnung des Alters
    function calculateAge() {
        const birthDate = new Date(geburtsdatumInput.value);
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        alterInput.value = age;
    }

    // Funktion zum Validieren der Pflichtfelder
    function validateRequiredFields() {
        const requiredFields = ["vorname", "nachname", "svnr"];
        return requiredFields.every(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.classList.add("error");
                return false;
            } else {
                field.classList.remove("error");
                return true;
            }
        });
    }

    // Funktion zum Hinzufügen oder Aktualisieren eines Patienten
    function addOrUpdatePatient() {
        if (!validateRequiredFields()) {
            alert("Bitte füllen Sie alle Pflichtfelder aus.");
            return;
        }

        const patientData = {
            vorname: document.getElementById("vorname").value,
            nachname: document.getElementById("nachname").value,
            svnr: document.getElementById("svnr").value,
            geschlecht: document.getElementById("geschlecht").value,
            geburtsdatum: document.getElementById("geburtsdatum").value,
            alter: document.getElementById("alter").value,
            klinik: document.getElementById("klinik").value,
            ekgArt: document.getElementById("ekg-art").value,
            aufzeichnungStart: document.getElementById("aufzeichnung-start").value,
            aufzeichnungEnde: document.getElementById("aufzeichnung-ende").value,
            dauer: document.getElementById("dauer").value,
            bilddatei: document.getElementById("bild").value.split("\\").pop()
            // andere Felder nach Bedarf
        };

        if (selectedRowIndex >= 0) {
            patients[selectedRowIndex] = patientData;
        } else {
            patients.push(patientData);
        }

        localStorage.setItem("patients", JSON.stringify(patients));

        updateTable();
        clearForm();
    }

    // Funktion zur Aktualisierung der Tabelle
    function updateTable() {
        // Tabelle leeren und neu aufbauen
        patientListTableElement.innerHTML = '';
        patients.forEach((patient, index) => {
            const row = patientListTableElement.insertRow(-1);
            row.insertCell(0).textContent = patient.vorname;
            row.insertCell(1).textContent = patient.nachname;
            row.insertCell(2).textContent = patient.svnr;
            row.onclick = () => {
                selectedRowIndex = index;
                highlightRow(row);
            };
        });
    }

    // Funktion zum Hervorheben einer Zeile
    function highlightRow(row) {
        document.querySelectorAll(".highlighted-row").forEach(row => {
            row.classList.remove("highlighted-row");
        });
        row.classList.add("highlighted-row");
    }

    // Funktion zum Zurücksetzen des Formulars
    function clearForm() {
        patientForm.reset();
        selectedRowIndex = -1; // Zurücksetzen des ausgewählten Index
        document.querySelectorAll(".highlighted-row").forEach(row => {
            row.classList.remove("highlighted-row");
        });
    }

    // Funktion zum Befüllen des Formulars mit Daten
    function fillFormWithData(patient) {
        document.getElementById("vorname").value = patient.vorname;
        document.getElementById("nachname").value = patient.nachname;
        document.getElementById("svnr").value = patient.svnr;
        document.getElementById("geschlecht").value = patient.geschlecht;
        document.getElementById("geburtsdatum").value = patient.geburtsdatum;
        calculateAge(); // Aufrufen der Funktion zur Altersberechnung
        document.getElementById("klinik").value = patient.klinik;
        document.getElementById("ekg-art").value = patient.ekgArt;
        document.getElementById("aufzeichnung-start").value = patient.aufzeichnungStart;
        document.getElementById("aufzeichnung-ende").value = patient.aufzeichnungEnde;
        calculateDuration(); // Aufrufen der Funktion zur Dauerberechnung
        document.getElementById("dauer").value = patient.dauer;
        document.getElementById("bild").value = patient.bilddatei;
    }

    // Event Listener
    geburtsdatumInput.addEventListener("change", calculateAge);
    aufzeichnungStart.addEventListener("change", calculateDuration);
    aufzeichnungEnde.addEventListener("change", calculateDuration);
    saveButton.addEventListener("click", addOrUpdatePatient);
    deleteButton.addEventListener("click", function () {
        if (selectedRowIndex >= 0) {
            patients.splice(selectedRowIndex, 1);
            localStorage.setItem("patients", JSON.stringify(patients));
            updateTable();
            clearForm();
        } else {
            alert("Bitte wählen Sie einen Patienten zum Löschen aus.");
        }
    });
    editButton.addEventListener("click", function () {
        if (selectedRowIndex >= 0) {
            const selectedPatient = patients[selectedRowIndex];
            fillFormWithData(selectedPatient);
        } else {
            alert("Bitte wählen Sie einen Patienten zum Überarbeiten aus.");
        }
    });

    // Initialisieren
    updateTable();
});
