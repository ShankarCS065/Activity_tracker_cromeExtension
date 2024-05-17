let startTime;
let idleTime = 0;
let idleInterval;
let idle = false;

function resetIdleTime() {
  idleTime = 0;
  idle = false;
}

function incrementIdleTime() {
  idleTime += 1;
  if (idleTime >= 5) {  // 5 seconds of inactivity
    idle = true;
  }
}

function sendVisitData() {
  const endTime = new Date();
  const timeSpent = (endTime - startTime) / 1000;  // time in seconds

  chrome.storage.sync.get(['token'], function(result) {
    if (result.token) {
      fetch('http://localhost:3000/api/v1/website_visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + result.token
        },
        body: JSON.stringify({
          visit: {
            url: window.location.href,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            time_spent: timeSpent,
            idle: idle
          }
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Visit logged:', data);
      })
      .catch(error => console.error('Error:', error));
    }
  });
}

window.onload = function() {
  startTime = new Date();
  resetIdleTime();
  idleInterval = setInterval(incrementIdleTime, 1000);  // increment idle time every second
};

window.onfocus = function() {
  resetIdleTime();
  if (idleInterval) clearInterval(idleInterval);
  idleInterval = setInterval(incrementIdleTime, 1000);
};

window.onblur = function() {
  sendVisitData();
  if (idleInterval) clearInterval(idleInterval);
};
