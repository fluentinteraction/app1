// Generate a three-word code from words.js
function generateCode() {
    const wordsArray = [
        "apple", "orange", "banana", "grape", "cherry", "pear", "peach", "plum", "kiwi", "mango",
        // Add more words as needed
    ];
    const randomWord = () => wordsArray[Math.floor(Math.random() * wordsArray.length)];
    return `${randomWord()}${randomWord()}${randomWord()}`;
}

// Save the generated code to local storage and Google Analytics
function saveCodeToLocalStorage() {
    const generatedCode = generateCode();
    localStorage.setItem('custom_user_id', generatedCode);
    console.log('Generated code:', generatedCode);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'login',
        'custom_user_id': generatedCode
    });
    document.getElementById('generated-code').textContent = generatedCode;
}

// Load the code from local storage and display it
function loadCode() {
    const code = localStorage.getItem('custom_user_id');
    if (code) {
        document.getElementById('generated-code').textContent = code;
    }
}

// Clear local storage and redirect to the index page
function clearData() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// Update the status of a task and push the data to the data layer
function updateStatus(taskId) {
    const statusElement = document.getElementById(`${taskId}-status`);
    const updateElement = document.getElementById(`${taskId}-update`);
    const newStatus = updateElement.value;
    statusElement.textContent = newStatus;
    
    // Update the class based on the new status
    statusElement.className = '';
    if (newStatus === 'Not complete') {
        statusElement.classList.add('not-complete');
    } else if (newStatus === 'Complete') {
        statusElement.classList.add('complete');
    } else if (newStatus === 'Skipped') {
        statusElement.classList.add('skipped');
    }

    // Push the update event to the data layer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'status_updated',
        'task_name': taskId,
        'status': newStatus,
        'custom_user_id': localStorage.getItem('custom_user_id')
    });
    console.log(`Updated ${taskId} to ${newStatus}`);
}

// Populate the update dropdowns with available status options
function populateUpdateDropdowns() {
    const statuses = ['Not complete', 'Complete', 'Skipped'];
    for (let i = 1; i <= 3; i++) {
        const updateElement = document.getElementById(`task${i}-update`);
        statuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            updateElement.appendChild(option);
        });
    }
}

// Initialize the task list page
function initTaskList() {
    loadCode();
    populateUpdateDropdowns();
}

// Run the init function when the page loads
document.addEventListener('DOMContentLoaded', initTaskList);
