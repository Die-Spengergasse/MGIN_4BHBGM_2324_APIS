async function fill_table(){
    const results = await fetch("/api/appointments");
    const appointments = await results.json();
    const tbl = document.querySelector("#appointmenttable");
    console.log(tbl);
    for (const a of appointments){
        const r = tbl.insertRow();
        r.insertCell().innerText = a.id;
        r.insertCell().innerText = a.name;
        r.insertCell().innerText = a.firstname;
        r.insertCell().innerText = a.appointmentstart;
        r.insertCell().innerText = a.appointmentend;
    }
}
function load() {
    document.querySelector("#save").onclick = async function () {
        const appointment = {
            name: document.querySelector("#name").value,
            firstname: document.querySelector("#firstname").value,
            appointmentstart: new Date(document.querySelector("#appointmentstart").value).toISOString(),
            appointmentend: new Date(document.querySelector("#appointmentend").value).toISOString()
        };

        const result = await fetch("/api/appointment", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment)
        });

        if (result.ok) {
            location.reload();
        } else {
            alert("Error");
        }
    };
    fill_table();
}

window.addEventListener("DOMContentLoaded", load);