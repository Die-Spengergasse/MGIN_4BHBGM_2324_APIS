 function updateTemperatureValue() {
    var temperaturSlider = document.getElementById("temperatur");
    var temperaturAnzeige = document.getElementById("temperaturAnzeige");
    temperaturAnzeige.textContent = temperaturSlider.value + "°C";
    }

 // auf einen Buttonklick reagieren
 const anamnesen_ges = [];
 let sendbutton = document.querySelector("#sendbutton");
 sendbutton.addEventListener("click", sendData);

 // Funktion zum Bearbeiten einer Zeile
 function editRow(index) {
     // Daten der ausgewählten Zeile abrufen
     const selectedAnamnese = anamnesen_ges[index];

     // Formular mit den ausgewählten Daten aktualisieren
     let patient_mogl = document.querySelector("#patient");
     let schmerzen = document.querySelector("#ja");
     let temperatur = document.querySelector("#temperatur");
     let beschwerdenDauer = document.querySelector("#beschwerdenDauer");
     let anmerkungen = document.querySelector("#anmerkungen");

     patient_mogl.value = selectedAnamnese.patient;
     schmerzen.checked = selectedAnamnese.schmerzen;
     temperatur.value = selectedAnamnese.temperatur;
     beschwerdenDauer.value = selectedAnamnese.dauer;
     anmerkungen.value = selectedAnamnese.anmerkungen;

     // Listener für den Speichern-Button aktualisieren
     sendbutton.removeEventListener("click", sendData);
     sendbutton.addEventListener("click", function() {
         // Daten aktualisieren statt einen neuen Datensatz hinzufügen
         anamnesen_ges[index].patient = patient_mogl.value;
         anamnesen_ges[index].schmerzen = schmerzen.checked;
         anamnesen_ges[index].temperatur = temperatur.value;
         anamnesen_ges[index].dauer = beschwerdenDauer.value;
         anamnesen_ges[index].anmerkungen = anmerkungen.value;

         // Tabelle aktualisieren
         updateTable();

         // Formular zurücksetzen
         resetForm();
     });
 }

 // Funktion zum Löschen einer Zeile
 function deleteRow(index) {
     // Zeile aus dem Array entfernen
     anamnesen_ges.splice(index, 1);

     // Tabelle aktualisieren
     updateTable();

     // Formular zurücksetzen
     resetForm();
 }

 // Funktion zum Aktualisieren der Tabelle
 function updateTable() {
     const data = document.querySelector("#data");

     // Tabelle leeren
     data.innerHTML = "";

     // Daten in die Tabelle einfügen
     for (let i = 0; i < anamnesen_ges.length; i++) {
         const a = anamnesen_ges[i];
         const row = data.insertRow();
         row.insertCell().innerText = a.patient;
         row.insertCell().innerText = a.schmerzen ? "Ja" : "Nein";
         row.insertCell().innerText = a.temperatur;
         row.insertCell().innerText = a.dauer;
         row.insertCell().innerText = a.anmerkungen;

         // Bearbeiten-Button hinzufügen
         const editButton = document.createElement("button");
         editButton.innerText = "Bearbeiten";
         editButton.addEventListener("click", function() {
             editRow(i);
         });
         row.insertCell().appendChild(editButton);

         // Löschen-Button hinzufügen
         const deleteButton = document.createElement("button");
         deleteButton.innerText = "Löschen";
         deleteButton.addEventListener("click", function() {
             deleteRow(i);
         });
         row.insertCell().appendChild(deleteButton);
     }
 }

 // Funktion zum Zurücksetzen des Formulars
 function resetForm() {
     let patient_mogl = document.querySelector("#patient");
     let schmerzen = document.querySelector("#ja");
     let keineSchmerzen = document.querySelector("#nein");
     let temperatur = document.querySelector("#temperatur");
     let beschwerdenDauer = document.querySelector("#beschwerdenDauer");
     let anmerkungen = document.querySelector("#anmerkungen");

     patient_mogl.value = "";
     schmerzen.checked = false;
     keineSchmerzen.checked = false;
     temperatur.value = "";
     beschwerdenDauer.value = "";
     anmerkungen.value = "";

     // Listener für den Speichern-Button aktualisieren
     sendbutton.removeEventListener("click", editRow);
     sendbutton.addEventListener("click", sendData);
 }

 // Funktion zum Speichern der Daten
 function sendData() {
     console.log("senden button geklickt");

     // Formulardaten auslesen
     let patient_mogl = document.querySelector("#patient");
     let schmerzen = document.querySelector("#ja");
     let temperatur = document.querySelector("#temperatur");
     let beschwerdenDauer = document.querySelector("#beschwerdenDauer");
     let anmerkungen = document.querySelector("#anmerkungen");

     // Formulardaten anzeigen /versenden
     const anamnese_obj = {};
     anamnese_obj.patient = patient_mogl.value;
     anamnese_obj.schmerzen = schmerzen.checked;
     anamnese_obj.temperatur = temperatur.value;
     anamnese_obj.dauer = beschwerdenDauer.value;
     anamnese_obj.anmerkungen = anmerkungen.value;

     anamnesen_ges.push(anamnese_obj);

     console.log(anamnesen_ges);

     let jsondString = JSON.stringify(anamnesen_ges);
     localStorage.setItem("data", jsondString);

     // Tabelle aktualisieren
     updateTable();

     // Formular zurücksetzen
     resetForm();
 }
