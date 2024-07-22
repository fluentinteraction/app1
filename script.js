// Ensure dataLayer is defined
window.dataLayer = window.dataLayer || [];

// Function to save business size to local storage and redirect
function saveBusinessSize() {
    const businessSize = document.getElementById('business-size').value;
    if (businessSize !== 'Select...') {
        localStorage.setItem('business_size', businessSize);

        // Push to dataLayer for GA
        dataLayer.push({
            'event': 'login',
            'business_size': businessSize
        });

        window.location.href = 'tasks.html';
    } else {
        alert('Please select a business size.');
    }
}

// Function to clear local storage and redirect to index
function clearLocalStorage() {
    localStorage.removeItem('business_size');
    for (let i = 1; i <= 3; i++) {
        localStorage.removeItem(`task${i}`);
    }
    window.location.href = 'index.html';
}

// Function to initialize task list
function initTaskList() {
    const businessSize = localStorage.getItem('business_size');
    if (!businessSize) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('business-size-display').textContent = businessSize;
    // Initialize tasks from local storage or set default values
    for (let i = 1; i <= 3; i++) {
        const taskStatus = localStorage.getItem(`task${i}`) || 'Not complete';
        document.getElementById(`task${i}-status`).textContent = taskStatus;
        setStatusDropdown(i, taskStatus);
    }
}

// Function to set status dropdown
function setStatusDropdown(taskNumber, currentStatus) {
    const dropdown = document.getElementById(`task${taskNumber}-update`);
    dropdown.innerHTML = '';
    const statuses = ['Not complete', 'Complete', 'Skipped'];
    statuses.forEach(status => {
        if (status !== currentStatus) {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            dropdown.appendChild(option);
        }
    });
}

// Function to update task status
function updateStatus(taskNumber) {
    const dropdown = document.getElementById(`task${taskNumber}-update`);
    const newStatus = dropdown.value;
    if (newStatus !== 'Select...') {
        document.getElementById(`task${taskNumber}-status`).textContent = newStatus;
        localStorage.setItem(`task${taskNumber}`, newStatus);

        // Push to dataLayer for GA
        dataLayer.push({
            'event': 'status_updated',
            'task_id': `task${taskNumber}`,
            'status': newStatus
        });
    }
}
