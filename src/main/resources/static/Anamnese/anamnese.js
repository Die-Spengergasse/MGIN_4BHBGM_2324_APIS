 function updateTemperatureValue() {
    var temperaturSlider = document.getElementById("temperatur");
    var temperaturAnzeige = document.getElementById("temperaturAnzeige");
    temperaturAnzeige.textContent = temperaturSlider.value + "°C";
    }

    //auf einen buttonklick reagieren
            const anamnesen_ges = [];
            let sendbutton = document.querySelector("#sendbutton");
            sendbutton.addEventListener("click", function() {


                console.log("senden button geklickt");
              // formulardaten auslese
                 let patient_mogl = document.querySelector("#patient");
                 let patient = patient_mogl.value;
                 let schmerzen = documtent.querySelector("#schmerzen");
                 let temperatur = document.querySelector("#temperatur");
                 let beschwerdenDauer = document.querySelector("#beschwerdenDauer");
                 let anmerkungen = document.querySelector("#anmerkungen");


                // formulardaten anzeigen /versenden
                const anamnese_obj= {};
                anamnese_obj.patient = patient;
                anamnese_obj.schmerzen = schmerzen.checked;
                anamnese_obj.temperatur = temperatur.value;
                anamnese_obj.dauer = beschwerdenDauer.value;
                anamnese_obj.anmerkungen = anmerkungen.value;


                anamnesen_ges.push(anamnese_obj);

                console.log(anamnesen_ges);

                let jsondString = JSON.stringify(anamnesen_ges);
                localStorage.setItem("data", jsondString);

                const data = document.querySelector("#data");
                for(a of anamnesen_ges)
                {
                    const row = data.insertRow();
                    row.insertCell().innerText = a.patient;
                    row.insertCell().innerText = a.schmerzen;
                    row.insertCell().innerText = a.temperatur;
                    row.insertCell().innerText = a.dauer;
                    row.insertCell().innerText = a.anmerkungen;

                }
});


