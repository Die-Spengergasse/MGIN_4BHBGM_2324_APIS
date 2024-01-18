var addButton = document.getElementById('add-medication-button');
var form = document.getElementById('medication-form');
var tableBody = document.getElementById('medications-table-body');
var medicationsArray = [];  // Make sure this variable is present.
var editingData = null;  // Make sure this variable is present.

addButton.addEventListener('click', function () {
    var medicationName = document.getElementById('medication-name').value;
    var medicationUse = document.getElementById('medicin-use').value;
    var dosage = document.getElementById('dosage').value;
    var startDate = document.getElementById('start-date').value;
    var endDate = document.getElementById('end-date').value;

    if (!medicationName || !medicationUse || !dosage || !startDate || !endDate) {
        alert('Bitte fülle alle Felder aus.');
        return;
    }

    var frequencyArray = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            frequencyArray.push(checkbox.id);
        }
    });

    var medicationData = {
        medicationName: medicationName,
        medicationUse: medicationUse,
        dosage: dosage,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        frequency: frequencyArray
    };

    medicationsArray.push(medicationData);

    console.log(medicationsArray);

    form.reset();

    addRowToTable(medicationData);
});

function addRowToTable(data) {
    var newRow = tableBody.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);

    cell1.innerHTML = data.medicationName;
    cell2.innerHTML = data.medicationUse;
    cell3.innerHTML = data.dosage;
    cell4.innerHTML = data.startDate;
    cell5.innerHTML = data.endDate;
    cell6.innerHTML = data.frequency.join(', ');

    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.className = "btn btn-warning btn-sm";
    editButton.addEventListener("click", function () {
        editRow(newRow, data);
    });

    var saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.className = "btn btn-success btn-sm";
    saveButton.addEventListener("click", function () {
        saveRow();
    });

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.addEventListener("click", function () {
        deleteRow(newRow);
    });

    cell7.appendChild(editButton);
    cell7.appendChild(saveButton);
    cell7.appendChild(deleteButton);
}

function saveRow() {
    // Your existing saveRow function
}

function deleteRow(row) {
    medicationsArray.splice(row.rowIndex - 1, 1);
    tableBody.removeChild(row);
}

// This function assumes that the input is in the format 'YYYY-MM-DD'.
function formatDate(dateString) {
    var parts = dateString.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
}