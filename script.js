// Function to generate a three-word code
function generateCode() {
    const wordsArray = ["word1", "word2", "word3", "word4", "word5", /* Add all your words here */];
    let code = '';
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        code += wordsArray[randomIndex];
    }
    return code;
}

// Function to save code to local storage and redirect
function saveCodeToLocalStorage() {
    const businessSize = document.getElementById('business-size').value;
    if (businessSize !== 'Select...') {
        const code = generateCode();
        localStorage.setItem('custom_user_id', code);
        localStorage.setItem('business_size', businessSize);

        // Push to dataLayer for GA
        dataLayer.push({
            'event': 'login',
            'custom_user_id': code
        });

        window.location.href = 'tasks.html';
    } else {
        alert('Please select a business size.');
    }
}

// Function to clear local storage and redirect to index
function clearLocalStorage() {
    localStorage.removeItem('custom_user_id');
    localStorage.removeItem('business_size');
    window.location.href = 'index.html';
}

// Function to initialize task list
function initTaskList() {
    const code = localStorage.getItem('custom_user_id');
    if (!code) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('user-code').textContent = code;
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
