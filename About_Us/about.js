document.addEventListener('DOMContentLoaded', function() {
    // Data for the chart 
    const data = {
        labels: ['Respiratory Diseases', 'Cardiovascular Problems', 'Premature Deaths'],
        datasets: [{
            label: 'Impact of Air Pollution',
            data: [30, 25, 20], 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    };

    // Configuration options
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow chart to resize freely
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%'; // Format tooltip label
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value + '%'; // Format y-axis labels
                    }
                }
            }
        }
    };

    const ctx = document.getElementById('airPollutionChart').getContext('2d');

    // Create the chart
    const airPollutionChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
});


window.aichatbotApiKey = "dfa2910e-2ef2-42a2-b2ef-5dbec8fd78dd";
window.aichatbotProviderId = "f9e9c5e4-6d1a-4b8c-8d3f-3f9e9c5e46d1";

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://script.chatlab.com/aichatbot.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'dfa2910e-2ef2-42a2-b2ef-5dbec8fd78dd'));
