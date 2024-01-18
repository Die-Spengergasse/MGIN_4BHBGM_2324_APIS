let speichernbutton = document.getElementById("speichern");
let loeschenbutton =  document.getElementById("loeschen"); 
let datenloeschen = document.getElementById("datenloeschen");
var table = document.getElementById("table");
var tbody = table.querySelector("tbody");
const Mitarbeiter = [];

window.addEventListener("load", function(){
  const gespeicherteDaten = JSON.parse(localStorage.getItem("Daten")) || [];
  
  for(const daten of gespeicherteDaten){
    var row = tbody.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      cell1.innerHTML = daten.nr;
      cell2.innerHTML = daten.name;
      cell3.innerHTML = daten.teilzeit;
      cell4.innerHTML = daten.stelle;
      cell5.innerHTML = daten.geschl;
      cell6.innerHTML = daten.gehalt;
      cell7.innerHTML = daten.qualis;
  }
});

speichernbutton.addEventListener("click", function (e) {

    e.preventDefault();

    var nummer = document.getElementById("inputmitarbeiternr").value
    var name = document.getElementById("inputmitarbeitername").value
    var check = document.getElementById("Teilzeitcheck")
    var teilzeit;
    if(check.checked){
      teilzeit = true
    }
    else{
      teilzeit = false
    }
    var stelle = document.getElementById("inputstelle").value
    var geschl = document.getElementById("inputgeschlecht").value
    var gehalt = document.getElementById("inputgehalt").value
    var quali = document.getElementById("inputqualis").value

    const mitarbeiter = {
    nr : nummer, 
    name : name, 
    teilzeit : teilzeit, 
    stelle : stelle,
    geschl : geschl, 
    gehalt : gehalt, 
    qualis : quali
    };
    
    Mitarbeiter.push(mitarbeiter)

    Mitarbeiter.forEach(function(item) {
      var row = tbody.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      cell1.innerHTML = item.nr;
      cell2.innerHTML = item.name;
      cell3.innerHTML = item.teilzeit;
      cell4.innerHTML = item.stelle;
      cell5.innerHTML = item.geschl;
      cell6.innerHTML = item.gehalt;
      cell7.innerHTML = item.qualis;
    });

    const gespeicherteDaten = JSON.parse(localStorage.getItem("Daten")) || [];
     gespeicherteDaten.push({nummer, name, teilzeit, stelle, geschl, gehalt, quali});
     localStorage.setItem("Daten", JSON.stringify(gespeicherteDaten));
});

loeschenbutton.addEventListener("click", function(){
  while (tbody.firstChild) {
    tbody.deleteRow(tbody.firstChild);
  }
})

datenloeschen.addEventListener("click", function(){
  localStorage.removeItem("Daten");
  Mitarbeiter.splice(0, Mitarbeiter.length);
})