
    var patients = [];

    // Function to add a patient and update the list
    function addPatient() {
    // Get values from form fields
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var ssn = document.getElementById("ssn").value;
    var birthday = document.getElementById("birthday").value;
    var healthInsurance = document.getElementById("healthInsurance").value;

    // Check if it's a new patient or an editing patient
    var editedPatient = patients.find(function (patient) {
    return patient.editing === true;
});

    if (editedPatient) {
    // Update the data if it's an editing patient
    editedPatient.name = name;
    editedPatient.surname = surname;
    editedPatient.gender = gender;
    editedPatient.ssn = ssn;
    editedPatient.birthday = birthday;
    editedPatient.healthInsurance = healthInsurance;
    editedPatient.editing = false;
} else {
    // It's a new patient
    var newPatient = {
    id: patients.length + 1,
    name: name,
    surname: surname,
    gender: gender,
    ssn: ssn,
    birthday: birthday,
    healthInsurance: healthInsurance,
    editing: false
};

    // Add the new patient to the array
    patients.push(newPatient);
}

    // Update the patient list
    updatePatientList();

    // Reset the form
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("ssn").value = "";
    document.getElementById("birthday").value = "";
    document.getElementById("healthInsurance").value = "";

    // Save the updated data to local storage
    savePatientsToLocalStorage();
}

    // Function to update the patient list
    function updatePatientList() {
    var patientList = document.getElementById("patientList");
    // Clear the current content of the patient list
    patientList.innerHTML = "";

    // Loop through the patient array and add each patient to the list
    patients.forEach(function (patient) {
    var row = document.createElement("tr");
    row.innerHTML = `
                    <td>${patient.id}</td>
                    <td>${patient.name}</td>
                    <td>${patient.surname}</td>
                    <td>${patient.birthday}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editPatient(${patient.id})">Edit</button>

                       
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="removePatient(${patient.id})">X</button>
                    </td>
                `;
    patientList.appendChild(row);
});
}

    // Function to edit a patient
    function editPatient(id) {
    // Find the patient with the specified ID
    var patientToEdit = patients.find(function (patient) {
    return patient.id === id;
});

    if (patientToEdit) {
    // Fill the form with the data of the patient to edit
    document.getElementById("name").value = patientToEdit.name;
    document.getElementById("surname").value = patientToEdit.surname;
    document.querySelector('input[name="gender"][value="' + patientToEdit.gender + '"]').checked = true;
    document.getElementById("ssn").value = patientToEdit.ssn;
    document.getElementById("birthday").value = patientToEdit.birthday;
    document.getElementById("healthInsurance").value = patientToEdit.healthInsurance;

    // Mark the edited patient for update
    patientToEdit.editing = true;
}

    // Update the patient list
    updatePatientList();
}

    // Function to remove a patient and renumber the IDs
    function removePatient(id) {
    // Find the index of the patient to remove
    var indexToRemove = patients.findIndex(function (patient) {
    return patient.id === id;
});

    if (indexToRemove !== -1) {
    // Remove the patient from the array
    patients.splice(indexToRemove, 1);

    // Renumber the IDs of the remaining patients
    for (var i = 0; i < patients.length; i++) {
    patients[i].id = i + 1;
}

    // Update the patient list
    updatePatientList();

    // Remove the data of the removed patient from local storage
    savePatientsToLocalStorage();
}
}

    // Function to save patient data to local storage
    function savePatientsToLocalStorage() {
    // Convert the patient array to a JSON format
    var patientsJSON = JSON.stringify(patients);

    // Store the JSON in local storage
    localStorage.setItem("patientData", patientsJSON);
}

    // Function to load patient data from local storage
    function loadPatientsFromLocalStorage() {
    var patientsJSON = localStorage.getItem("patientData");

    if (patientsJSON) {
    // Convert the JSON to a JavaScript array
    patients = JSON.parse(patientsJSON);

    // Update the patient list
    updatePatientList();
}
}

    // Add a click event listener to the "Save" button
    document.getElementById("saveButton").addEventListener("click", addPatient);

    // Load patient data from local storage when the page loads
    loadPatientsFromLocalStorage();
