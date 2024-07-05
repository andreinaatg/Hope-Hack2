//global variables
let aqiDiv = document.getElementById('aqi');
let pollutantDiv = document.getElementById('primaryPollutant');
let qualityDiv = document.getElementById('quality');


document.getElementById('airQualityForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission
  const zipCode = document.getElementById('zipCode').value;

  try {
      // Fetch air quality data and update UI
      const response = await fetch(`http://localhost:3003/api/air-quality/${zipCode}`);
      if (!response.ok) {
          throw new Error(`Failed to fetch air quality data: ${response.status}`);
      }
      const airNowData = await response.json();
      displayAirQuality(airNowData); // Update UI with fetched data
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch air quality data.');
  }
});

let gauge = null;

function displayAirQuality(data) {
  const observation = data[0]; // Assuming data is an array and you want the first item
  const AQI = observation.AQI;
  const primaryPollutant = observation.ParameterName;
  const quality = observation.Category.Name;
  console.log(observation)
  const gaugeOptions = {
    id: "gaugeContainer",
    value: AQI,
    label: quality,
    min: 0,
    max: 300, 
    gaugeWidthScale: .8,
    counter: true,
    formatNumber: true,
    levelColors: ["#5ee432", "#ffde33", "#ff9933", "#ff3300"],
    levelColorsGradient: false,
    customSectors: [{
      color: "#5ee432", // Green (Good)
      lo: 0,
      hi: 50
    }, {
      color: "#ffde33", // Yellow (Moderate)
      lo: 51,
      hi: 100
    }, {
      color: "#ff9933", // Orange (Unhealthy for Sensitive Groups)
      lo: 101,
      hi: 150
    }, {
      color: "#ff3300", // Red (Unhealthy)
      lo: 151,
      hi: 200
    }, {
      color: "#990099", // Purple (Very Unhealthy)
      lo: 201,
      hi: 300
    }]
  };

  if (!gauge) {
    gauge = new JustGage(gaugeOptions);
  } else {
    gauge.refresh(AQI);
  }
 

  // Check if the quality is Good
  if (quality === 'Good') {
    aqiDiv.textContent = AQI
    // Change background color to green
    aqiDiv.style.backgroundColor = '#5ee432'; // Using the green color defined in your gauge options
  } else if (quality === 'Moderate'){
    aqiDiv.textContent = AQI
    aqiDiv.style.backgroundColor = '#ffde33'; // Using the green color defined in your gauge options

  } else if (quality === 'Unhealthy'){
    aqiDiv.textContent = AQI
    aqiDiv.style.backgroundColor = '#ffde33'; // Using the green color defined in your gauge options

  } else if (quality === 'Moderate'){
    aqiDiv.textContent = AQI
    aqiDiv.style.backgroundColor = '#ffde33'; // Using the green color defined in your gauge options

  } else if (quality === 'Moderate'){
    aqiDiv.textContent = AQI
    aqiDiv.style.backgroundColor = '#ffde33'; // Using the green color defined in your gauge options

  } else if (quality === 'Moderate'){
    aqiDiv.textContent = AQI
    aqiDiv.style.backgroundColor = '#ffde33'; // Using the green color defined in your gauge options

  }

  // Update air quality conditions
  pollutantDiv.textContent = primaryPollutant;
  qualityDiv.textContent = quality;
}

let map;

window.onload = async function initMap(data) {
  const { Map, LatLng } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 }, // Center coordinates (example: San Francisco)
    zoom: 5 // Adjust zoom level as needed
  });

  const tileLayer = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      return `http://localhost:3003/api/air-quality-heatmap/${zoom}/${coord.x}/${coord.y}`;
    },
    tileSize: new google.maps.Size(256, 256),
    name: 'Air Quality Heatmap',
    maxZoom: 16
  });

  map.overlayMapTypes.insertAt(0, tileLayer);
}
