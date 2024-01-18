var selectedCase = null;
        var caseNames = {};
        var caseDates = {};
        var caseDoctors = {};
        var caseDescriptions = {};
        var caseStatuses = {};
        var caseCompletionDates = {};
        var caseBilledStatuses = {};
        var cases = {};
        cases = {
                "Patient 1": [],
                "Patient 2": [],
                "Patient 3": [],
                "Patient 4": [],
                "Patient 5": []
            };
alert(selectedCase+"anfang");

        function showCases(patient) {   
            var caseList = document.getElementById('caseList');
            caseList.innerHTML = '';
            alert(JSON.stringify(patient )+"hier");
            

            if (cases[patient]) {
                cases[patient].forEach(function (caseItem) {
                    var listItem = document.createElement('li');
                    listItem.textContent = caseNames[caseItem] || caseItem;
                    /* listItem.onclick = function () {             //---> selektierter Fall
                        selectedCase = caseItem;
                        alert(JSON.stringify(selectedCase)+"show");
                        alert("CASEITEM: "+caseItem + " caseDates: "+ JSON.stringify(caseDates) );
                        document.getElementById('caseNameField').value = caseNames[caseItem] || 'blabla'; //TODO:Reichtigen Namen einfügen lassen! Load the saved case name when a case is selected
                        document.getElementById('dateField').value = caseDates[caseItem] || ''; // Load the saved date when a case is selected
                        document.getElementById('doctorField').value = caseDoctors[caseItem] || ''; // Load the saved doctor when a case is selected
                        document.getElementById('descriptionField').value = caseDescriptions[caseItem] || ''; // Load the saved description when a case is selected
                        document.getElementById('status' + caseStatuses[caseItem]).checked = true; // Load the saved status when a case is selected
                        document.getElementById('completionDateField').value = caseCompletionDates[caseItem] || ''; // Load the saved completion date when a case is selected
                        document.getElementById('billedCheckbox').checked = caseBilledStatuses[caseItem] || false; // Load the saved billed status when a case is selected
                    }; */

                    caseList.appendChild(listItem);
                });
            }
        }



        function changeCaseName() {
            if (selectedCase) {
                alert(JSON.stringify(selectedCase)+"in func")
                // Save the new name
                var newName = document.getElementById('caseNameField').value;
                caseNames[selectedCase] = newName;

                // Find the patient for this case
                var patient = Object.keys(cases).find(key => cases[key].includes(selectedCase));

                // Update the case name in the cases object
                var index = cases[patient].indexOf(selectedCase);
                if (index !== -1) {
                    cases[patient][index] = newName;
                }

                // Change the name here
                alert('Fallname für ' + selectedCase + ' geändert zu: ' + newName);

                // Update the list of cases
                showCases(document.getElementById('patientenInputID').value);

            } else {
                alert('Bitte wählen Sie zuerst einen Fall aus.');
            }
        }

        function addCase() {
            alert("addCase");
            var newCase = prompt("Bitte geben Sie den Namen des neuen Falles ein:");
            const id = document.querySelector("#patientenInputID").value;
            cases[id].push(newCase);

              

            showCases(id);

            /* if (newCase) {
                // Create a new list item
                var listItem = document.createElement('li');
                listItem.textContent = newCase;

                // Add the new case to the case list
                var caseList = document.getElementById('caseList');
                caseList.appendChild(listItem);
                //alert(JSON.parse(caseList));

                // var listItem = document.createElement('li');
                //   listItem.textContent = caseNames[caseItem] || caseItem;


                listItem.onclick = function (caseItem) {
                    selectedCase = caseItem;
                    document.getElementById('caseNameField').value = caseNames[caseItem] || ''; // Load the saved case name when a case is selected
                    document.getElementById('dateField').value = caseDates[caseItem] || ''; // Load the saved date when a case is selected
                    document.getElementById('doctorField').value = caseDoctors[caseItem] || ''; // Load the saved doctor when a case is selected
                    document.getElementById('descriptionField').value = caseDescriptions[caseItem] || ''; // Load the saved description when a case is selected
                    document.getElementById('status' + caseStatuses[caseItem]).checked = true; // Load the saved status when a case is selected
                    document.getElementById('completionDateField').value = caseCompletionDates[caseItem] || ''; // Load the saved completion date when a case is selected
                    document.getElementById('billedCheckbox').checked = caseBilledStatuses[caseItem] || false; // Load the saved billed status when a case is selected
                };

            } */

            // document.getElementById('patientenInputID').appendChild(listItem);
        }
/* 
        document.getElementById('caseList').addEventListener('click', function(e) {
            /* if(e.target && e.target.nodeName == "LI") {
                alert(e.target.innerHTML);
            } 

            alert(e.target.innerHTML);
            var ausgewFall = e.target;
            
        });
*/
       


        function changeDate() {
            if (selectedCase) {
                // Save the date
                caseDates[selectedCase] = document.getElementById('dateField').value;

                // Change the date here
                alert('Datum für ' + selectedCase + ' geändert zu: ' + document.getElementById('dateField').value);
            } else {
                alert('Bitte wählen Sie zuerst einen Fall aus.');
            }
        }

        function changeDoctor() {
            if (selectedCase) {
                // Save the doctor
                caseDoctors[selectedCase] = document.getElementById('doctorField').value;

                // Change the doctor here
                alert('Arzt für ' + selectedCase + ' geändert zu: ' + document.getElementById('doctorField').value);
            } else {
                alert('Bitte wählen Sie zuerst einen Fall aus.');
            }
        }

        function changeDescription() {
            if (selectedCase) {
                // Save the description
                caseDescriptions[selectedCase] = document.getElementById('descriptionField').value;

                // Change the description here
                alert('Beschreibung für ' + selectedCase + ' geändert zu: ' + document.getElementById('descriptionField').value);
            } else {
                alert('Bitte wählen Sie zuerst einen Fall aus.');
            }
        }

        function changeStatus() {
            if (selectedCase) {
                var statuses = ['Open', 'Closed', 'InProgress', 'Completed'];
                for (var i = 0; i < statuses.length; i++) {
                    if (document.getElementById('status' + statuses[i]).checked) {
                        // Save the status
                        caseStatuses[selectedCase] = statuses[i];

                        // Change the status here
                        alert('Status für ' + selectedCase + ' geändert zu: ' + statuses[i]);
                        break;
                    }
                }
            } else {
                alert('Bitte wählen Sie zuerst einen Fall aus.');
            }
        }

        function changeCompletionDate() {
            if (selectedCase) {
                // Save the completion date
                caseCompletionDates[selectedCase] = document.getElementById('completionDateField').value;

                // Change the completion date here
                alert('Abschlussdatum für ' + selectedCase + ' geändert zu: ' + document.getElementById('completionDateField').value);
            } else {
                alert('Bitte wählen Sie zuerst einen Fall aus.');
            }
        }

        function changeBilledStatus() {
            if (selectedCase) {
                // Save the billed status
                caseBilledStatuses[selectedCase] = document.getElementById('billedCheckbox').checked;

                // Change the billed status here
                alert(selectedCase + (document.getElementById('billedCheckbox').checked ? ' wurde abgerechnet.' : ' wurde nicht abgerechnet.'));
            } else {
                alert('Bitte wählen Sie zuerst einen Fall aus.');
            }
        }