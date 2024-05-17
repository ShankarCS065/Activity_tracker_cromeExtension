document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/v1/users/1/website_visits/daily', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const ctx = document.getElementById('usageChart').getContext('2d');
      const usageChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Time Spent (minutes)',
            data: data.usage,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => console.error('Error fetching usage data:', error));
  });
  