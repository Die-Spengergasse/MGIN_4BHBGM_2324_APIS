var patientsArray = [];

// Function to add or update patient data
function addOrUpdatePatient() {
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var birthdate = document.getElementById('birthdate').value;
    var gender = document.getElementById('gender').value;
    var contact = document.getElementById('contact').value;
    var fileInput = document.getElementById('file');

    var patientData = {
        id: id,
        name: name,
        birthdate: birthdate,
        gender: gender,
        contact: contact,
        fileInput: fileInput.files[0]
    };

    var existingIndex = patientsArray.findIndex(function (patient) {
        return patient.id === id;
    });

    if (existingIndex !== -1) {
        // Update existing patient
        patientsArray[existingIndex] = patientData;
    } else {
        // Check if this ID already exists (prevent creating a new patient with an existing ID)
        var idExists = patientsArray.some(function (patient) {
            return patient.id === id;
        });

        if (!idExists) {
            // Add new patient
            patientsArray.push(patientData);
        } else {
            // Handle case where ID already exists (you might show an error message)
            console.log('Patient with this ID already exists.');
            return;
        }
    }

    // Clear form fields
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('birthdate').value = '';
    document.getElementById('gender').value = 'male';
    document.getElementById('contact').value = '';
    document.getElementById('file').value = '';

    // Update or create table rows
    updateTable();

    // Save to local storage
    saveToLocalStorage();
}

// Function to update or create table rows
function updateTable() {
    var tableBody = document.querySelector('#patientTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    patientsArray.forEach(function (patient) {
        var row = tableBody.insertRow();

        // Insert cells with patient data
        row.insertCell(0).textContent = patient.id;
        row.insertCell(1).textContent = patient.name;
        row.insertCell(2).textContent = patient.birthdate;
        row.insertCell(3).textContent = patient.gender;
        row.insertCell(4).textContent = patient.contact;

        // Display file name in the file column (you might want to adjust this based on your requirements)
        var fileCell = row.insertCell(5);
        if (patient.fileInput) {
            fileCell.textContent = patient.fileInput.name;
        } else {
            fileCell.textContent = 'N/A';
        }

        // Add edit button to each row
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            fillFormForEdit(patient);
        };
        row.insertCell(6).appendChild(editButton);
    });
}

// Function to fill form fields for editing
function fillFormForEdit(patient) {
    document.getElementById('id').value = patient.id;
    document.getElementById('name').value = patient.name;
    document.getElementById('birthdate').value = patient.birthdate;
    document.getElementById('gender').value = patient.gender;
    document.getElementById('contact').value = patient.contact;
    // Note: File input cannot be pre-filled for security reasons
}

// Function to save data to local storage
function saveToLocalStorage() {
    localStorage.setItem('patients', JSON.stringify(patientsArray));
}

// Function to load data from local storage
function loadFromLocalStorage() {
    var storedData = localStorage.getItem('patients');
    if (storedData) {
        patientsArray = JSON.parse(storedData);
        updateTable();
    }
}

// Load data from local storage on page load
window.onload = loadFromLocalStorage;

function saveData() {
    const formData = {};

    // Collect data from form inputs
    const formInputs = document.querySelectorAll('input');
    formInputs.forEach(input => {
        formData[input.name] = input.value;
    });

    // Save data to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
}

function loadData() {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('formData');

    if (storedData) {
        const formData = JSON.parse(storedData);

        // Populate form inputs with stored data
        const formInputs = document.querySelectorAll('input');
        formInputs.forEach(input => {
            input.value = formData[input.name] || '';
        });
    } else {
        alert('No data stored.');
    }
}