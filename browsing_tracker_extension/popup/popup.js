document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('http://localhost:3000/api/v1/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Logged in successfully.') {
        alert('Login successful');
        // Store the JWT token in Chrome storage
        chrome.storage.sync.set({ token: data.token }, function() {
          console.log('Token stored');
        });
      } else {
        alert('Login failed');
      }
    })
    .catch(error => console.error('Error:', error));
  });

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Signed up successfully.') {
        alert('Signup successful');
        // Store the JWT token in Chrome storage
        chrome.storage.sync.set({ token: data.token }, function() {
          console.log('Token stored');
        });
      } else {
        alert('Signup failed');
      }
    })
    .catch(error => console.error('Error:', error));
  });
});

function fetchWithAuth(url, options = {}) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['token'], function(result) {
      if (result.token) {
        if (!options.headers) {
          options.headers = {};
        }
        options.headers['Authorization'] = 'Bearer ' + result.token;

        fetch(url, options)
          .then(response => response.json())
          .then(data => resolve(data))
          .catch(error => reject(error));
      } else {
        reject('No token found');
      }
    });
  });
}

// Example usage of fetchWithAuth function
document.getElementById('some-action').addEventListener('click', function () {
  fetchWithAuth('http://localhost:3000/api/v1/some_protected_route')
    .then(data => {
      console.log('Protected data:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
