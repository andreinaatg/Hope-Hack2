// This event listener waits until the DOM content has been completely loaded before executing the enclosed function.
document.addEventListener('DOMContentLoaded', function() {

    // Declaring the data structure for the chart. It contains labels (categories on the x-axis) and datasets (data points and styling).
    const data = {
        labels: ['Respiratory Diseases', 'Cardiovascular Problems', 'Premature Deaths'], // Labels for the x-axis
        datasets: [{
            label: 'Impact of Air Pollution', // Label for the dataset
            data: [30, 25, 20], // Data points for the dataset
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', // Background color for each bar
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', // Border color for each bar
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1 // Width of the border around each bar
        }]
    };

    // Options for configuring the chart's appearance and behavior.
    const options = {
        responsive: true, // Makes the chart responsive to window resizing
        maintainAspectRatio: false, // Allows the chart to resize freely without maintaining aspect ratio
        plugins: {
            legend: {
                display: false // Hides the legend
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) { // Customizes the tooltip label
                        return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true, // Ensures the y-axis starts at zero
                ticks: {
                    callback: function(value) { // Customizes the y-axis labels
                        return value + '%';
                    }
                }
            }
        }
    };

    // Retrieves the canvas element by its ID where the chart will be drawn.
    const ctx = document.getElementById('airPollutionChart').getContext('2d');

    // Creates a new bar chart using the Chart.js library with the specified data and options.
    const airPollutionChart = new Chart(ctx, {
        type: 'bar', // Specifies that this is a bar chart
        data: data, // The data for the chart
        options: options // The configuration options for the chart
    });
});




//Ai for javascript

window.aichatbotApiKey = "dfa2910e-2ef2-42a2-b2ef-5dbec8fd78dd";
window.aichatbotProviderId = "f9e9c5e4-6d1a-4b8c-8d3f-3f9e9c5e46d1";

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://script.chatlab.com/aichatbot.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'dfa2910e-2ef2-42a2-b2ef-5dbec8fd78dd'));
