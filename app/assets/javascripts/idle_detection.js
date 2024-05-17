// app/assets/javascripts/idle_detection.js

let idleTime = 0;
const idleLimit = 300; // Time in seconds to consider as idle, here 5 minutes

function resetIdleTimer() {
    idleTime = 0;
}

function incrementIdleTime() {
    idleTime++;
    if (idleTime >= idleLimit) {
        logIdleTime();
        idleTime = 0; // Reset idle timer after logging
    }
}

function logIdleTime() {
    const userId = document.body.getAttribute('data-user-id'); // Assume user ID is set in a data attribute
    if (!userId) return;

    fetch(`/api/v1/users/${userId}/log_idle_time`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}` // Adjust as per your auth method
        },
        body: JSON.stringify({ duration: idleLimit })
    }).then(response => {
        if (!response.ok) {
            console.error('Failed to log idle time');
        }
    });
}

// Increment the idle time counter every second
setInterval(incrementIdleTime, 1000);

// Reset the idle timer on any of these events
['mousemove', 'keypress', 'click', 'scroll'].forEach(event => {
    window.addEventListener(event, resetIdleTimer);
});
