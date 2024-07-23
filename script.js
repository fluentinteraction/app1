window.saveBusinessSize = function() {
    const size = document.getElementById('business-size').value;
    if (size) {
        localStorage.setItem('businessSize', size);
        localStorage.setItem('task1-status', 'Not complete');
        localStorage.setItem('task2-status', 'Not complete');
        localStorage.setItem('task3-status', 'Not complete');
        window.location.href = 'tasks.html';
    } else {
        alert('Please select a business size.');
    }
}

window.loadTasks = function() {
    const size = localStorage.getItem('businessSize');
    if (size) {
        loadRecordData();
        initializeDropdowns();
    } else {
        window.location.href = 'index.html';
    }
}

window.clearData = function() {
    localStorage.clear();
    window.location.href = 'index.html';
}

function loadRecordData() {
    document.getElementById('task1-status').textContent = localStorage.getItem('task1-status');
    document.getElementById('task2-status').textContent = localStorage.getItem('task2-status');
    document.getElementById('task3-status').textContent = localStorage.getItem('task3-status');
}

function initializeDropdowns() {
    initializeDropdown('task1');
    initializeDropdown('task2');
    initializeDropdown('task3');
}

function initializeDropdown(taskId) {
    const statusElement = document.getElementById(`${taskId}-status`);
    const updateElement = document.getElementById(`${taskId}-update`);

    updateDropdownOptions(statusElement.innerText, updateElement);
}

function updateDropdownOptions(currentStatus, dropdown) {
    dropdown.innerHTML = '<option disabled selected>Select...</option>';
    if (currentStatus === 'Not complete') {
        dropdown.innerHTML += '<option>Complete</option><option>Skipped</option>';
    } else if (currentStatus === 'Complete') {
        dropdown.innerHTML += '<option>Not complete</option><option>Skipped</option>';
    } else if (currentStatus === 'Skipped') {
        dropdown.innerHTML += '<option>Not complete</option><option>Complete</option>';
    }
}

window.updateStatus = function(taskId) {
    const statusElement = document.getElementById(`${taskId}-status`);
    const updateElement = document.getElementById(`${taskId}-update`);
    const selectedOption = updateElement.value;

    if (selectedOption && selectedOption !== 'Select...') {
        statusElement.innerText = selectedOption;
        statusElement.className = selectedOption.toLowerCase().replace(' ', '-');
        localStorage.setItem(`${taskId}-status`, selectedOption); // Save the new status to localStorage
        initializeDropdown(taskId);  // Update dropdown options based on new status
    }
}
