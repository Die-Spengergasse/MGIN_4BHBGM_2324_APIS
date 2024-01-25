let sendbtn = document.querySelector("#submit")
const table = document.getElementById("newGeraet");
const tbody = table.getElementsByTagName("tbody");
const headerRow = table.querySelector("thead tr");
//Array
//const gereate = [];

//Beim Laden/Neuladen den LocalStorae abfragen und die Daten ausgeben die gespeichert sind
window.addEventListener("load", function() {
    updateColumnCount();
    const savedData = JSON.parse(localStorage.getItem("gespeicherteDaten")) || [];
    const table = document.getElementById("newGeraet");

    for (const data of savedData) {
        const newRow = table.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);

        cell1.innerHTML = data.nameFull;
        cell2.innerHTML = data.nameShort;
        cell3.innerHTML = data.weight;
        cell4.innerHTML = data.lenght;
        cell5.innerHTML = data.width;
        cell6.innerHTML = data.height;
        cell7.innerHTML = data.use;
    }
});


sendbtn.addEventListener("click" , function(e) {
    e.preventDefault();

    //console.log("Erfolgreich")

    //Werte lesen und in einer Variable speichern
    const nameFull = document.querySelector("#GeraetenameFull").value;
    const nameShort = document.querySelector("#GeraetenameShort").value;
    const weight = document.querySelector("#gewicht").value;
    const lenght = document.getElementById("OP").value;
    const width = document.querySelector("#breite").value;
    const height = document.querySelector("#hoehe").value;
    const use = document.getElementById("select").value;


    const table = document.getElementById("newGeraet");
    const newRow = table.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);


    cell1.innerHTML = nameFull;
    cell2.innerHTML = nameShort;
    cell3.innerHTML = weight;
    cell4.innerHTML = lenght;
    cell5.innerHTML = width;
    cell6.innerHTML = height;
    cell7.innerHTML = use;



    //in LocalStorage speichern
    const savedData = JSON.parse(localStorage.getItem("gespeicherteDaten")) || [];
    savedData.push({ nameFull, nameShort, weight, lenght, width, height, use});
    localStorage.setItem("gespeicherteDaten", JSON.stringify(savedData));


    //IN DER CONSOLE AUSGEBEN
    //Objekt
    // const newgereat = {

    //   Name: nameFull,
    //   Bezeichnung: nameShort,
    //   Gewicht: weight,
    //   Länge: lenght,
    //   Breite: width,
    //   Höhe: height,
    //   Wirkung: use

    // };

    // let resultsection = document.querySelector("#Result");



    // //Array übergeben
    // gereate.push(newgereat);

    // //In der Console ausgeben
    // console.log(gereate)

})

function updateColumnCount() {


    const columnCount = headerRow.children.length;
    document.getElementById("columnCount").textContent = columnCount;
}

function deleteAllRows() {

    while (tbody.firstChild) {
        tbody.deleteRow(tbody.firstChild);
    }
}