//#region Variablen, KLassen, etc
var PatinetenListe = [];

class Patient {
    constructor(name, faelle) {
        this.patName = name;
        this.patFaelle = faelle;
    }
}

var aktCaseID = null;

class Fall {
    constructor(name) {
        this.fallName = name;
    }
    fallDatum;
    fallArzt;
    fallBeschreibung;
    fallStatus;
    fallAbschlussdatum;
    fallAbgerechnet;
}
//#endregion




//#region Daten aus dem LocalStorageLaden
window.onload = function () {
    fetch('/api/patients/all')
        .then(response => response.json())
        .then(data => {
            PatinetenListe = data;
            fillPatientList();
            alert("Daten erfolgreich vom Server geladen!");
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Fehler beim Laden der Daten vom Server. Generiere Testdaten.");
            // Hier können Sie Ihren Code zum Generieren von Testdaten einfügen
        });
}

function fillPatientList() {
    var datalist = document.getElementById('patienten');
    for (var i = 0; i < PatinetenListe.length; i++) {
        var option = document.createElement('option');
        option.value = PatinetenListe[i].patName;
        datalist.appendChild(option);
    }
}
//#endregion



//Anzeigen der Fälle für den aktuellen Patienten
function showCases(AusgPat) {

    //alert("show cases");
    aktCaseID = null;

    //#region Anzeige null setzten
    document.getElementById('caseNameField').value = "";
    document.getElementById('dateField').value = "";
    document.getElementById('doctorField').value = "";
    document.getElementById('descriptionField').value = "";
    document.getElementById('statusOpen').checked = true;;
    document.getElementById('statusOpen').checked = false;;
    document.getElementById('completionDateField').value = "";
    document.getElementById('billedCheckbox').checked = false;

    //#endregion


    var caseList = document.getElementById('caseList');
    caseList.innerHTML = '';


    //alert(AusgPat+" |    Ausgangspat");
    //alert(JSON.stringify(PatinetenListe)+" |    Patliste");

    var aktindex = indexOfPatient(AusgPat)

    if (aktindex != null) {
        var listItemID = -1;
        PatinetenListe[aktindex].patFaelle.forEach(function (caseItem) {

            var listItem = document.createElement('li');
            listItemID = listItemID + 1;
            listItem.id = listItemID;
            listItem.textContent = caseItem.fallName;

            listItem.onclick = function () {
                aktCaseID = listItem.id;

                //#region Anzeige null setzten
                document.getElementById('caseNameField').value = "";
                document.getElementById('dateField').value = "";
                document.getElementById('doctorField').value = "";
                document.getElementById('descriptionField').value = "";
                document.getElementById('statusOpen').checked = true;;
                document.getElementById('statusOpen').checked = false;;
                document.getElementById('completionDateField').value = "";
                document.getElementById('billedCheckbox').checked = "";

                //#endregion



                document.getElementById('caseNameField').value = caseItem.fallName;

                var lokalMonth = (new Date(caseItem.fallDatum).getMonth()) + 1
                if (lokalMonth <= 9)
                    lokalMonth = "0" + lokalMonth;

                var lokalDay = new Date(caseItem.fallDatum).getDate();
                if (lokalDay <= 9)
                    lokalDay = "0" + lokalDay;

                var lokaleDateString = (new Date(caseItem.fallDatum).getFullYear() + "-" + lokalMonth + "-" + lokalDay);
            
                document.getElementById('dateField').value = lokaleDateString; // Load the saved date when a case is selected
                document.getElementById('doctorField').value = caseItem.fallArzt; // Load the saved doctor when a case is selected

                if (caseItem.fallBeschreibung == null) {
                    document.getElementById('descriptionField').value = "";
                } else {
                    document.getElementById('descriptionField').value = caseItem.fallBeschreibung; // Load the saved description when a case is selected
                }
                var status = caseItem.fallStatus;
                if (status == "offen") {
                    document.getElementById('statusOpen').checked = true;
                } else if (status == "geschlossen") {
                    document.getElementById('statusClosed').checked = true;
                } else if (status == "bearbeitung") {
                    document.getElementById('statusInProgress').checked = true;
                } else {
                    document.getElementById('statusOpen').checked = false;
                    document.getElementById('statusClosed').checked = false;
                    document.getElementById('statusInProgress').checked = false;
                }






                var lokalMonth = (new Date(caseItem.fallAbschlussdatum).getMonth()) + 1
                if (lokalMonth <= 9)
                    lokalMonth = "0" + lokalMonth;


                var lokalDay = new Date(caseItem.fallAbschlussdatum).getDate();
                if (lokalDay <= 9)
                    lokalDay = "0" + lokalDay;

                var lokaleDateString = (new Date(caseItem.fallAbschlussdatum).getFullYear() + "-" + lokalMonth + "-" + lokalDay);


                document.getElementById('completionDateField').value = lokaleDateString; // Load the saved completion date when a case is selected
                document.getElementById('billedCheckbox').checked = caseItem.fallAbgerechnet; // Load the saved billed status when a case is selected

            }




            caseList.appendChild(listItem);


        })
    }
}

function indexOfPatient(NamePat) {
    var aktindex = null;
    for (let i = 0; i < PatinetenListe.length; i++) {
        if (PatinetenListe[i].patName == NamePat) {
            return aktindex = i;
        }
    }
    if (aktindex == null) {
        alert("Patient konnte nicht gefunden werden");
    }
    return null;
}

function addCase() {
    var NeuerFallName = prompt("Bitte geben Sie den Namen des neuen Falles ein:");
    var NeuerFall = new Fall(NeuerFallName);

    const aktpat = document.querySelector("#patientenInputID").value;

    if (indexOfPatient(aktpat) != null) {
        PatinetenListe[indexOfPatient(aktpat)].patFaelle.push(NeuerFall);
        showCases(aktpat);
    }
}

function updateCase() {
    const ausgpat = document.querySelector("#patientenInputID").value;

    if (indexOfPatient(ausgpat) != null) {
        
        var aktpat = PatinetenListe[indexOfPatient(ausgpat)];

        var aktCase = aktpat.patFaelle[aktCaseID];
        // var copyAktCase = aktCase;

        aktCase.fallName = document.getElementById("caseNameField").value;
        aktCase.fallDatum = new Date(document.getElementById("dateField").value);
        aktCase.fallArzt = document.getElementById("doctorField").value;
        aktCase.fallBeschreibung = document.getElementById("descriptionField").value;

        if (document.getElementById('statusOpen').checked == true) {
            aktCase.fallStatus = "offen";
        } else if (document.getElementById('statusClosed').checked == true) {
            aktCase.fallStatus = "geschlossen";
        } else if (document.getElementById('statusInProgress').checked == true) {
            aktCase.fallStatus = "bearbeitung";
        } else { }

        aktCase.fallAbschlussdatum = document.getElementById("completionDateField").value;
        aktCase.fallAbgerechnet = document.getElementById("billedCheckbox").checked;

        PatinetenListe[indexOfPatient(aktpat.patName)].patFaelle[aktCaseID] = aktCase;

        showCases(ausgpat);
        alert("Änderungen wurden übernommen.");
    }
}

function deleteFall() {
    const ausgpat = document.querySelector("#patientenInputID").value;

    if (indexOfPatient(ausgpat) != null && aktCaseID != null) {

        PatinetenListe[indexOfPatient(ausgpat)].patFaelle.splice(aktCaseID, 1);

        showCases(ausgpat);
    }
}

function saveInLocalStorage() {
    localStorage.setItem("Patientenliste", JSON.stringify(PatinetenListe));
    alert("Patientenliste wurde erfolgreich im LocalStorage gespeichert");
}