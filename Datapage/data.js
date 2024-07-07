// Global variables
let aqiDiv = document.getElementById('aqi');
let pollutantDiv = document.getElementById('primaryPollutant');
let qualityDiv = document.getElementById('quality');
let gaugeGraph = document.querySelector('.graph-container');
let inputGraphDiv = document.getElementById('input-graph');

document.getElementById('airQualityForm').addEventListener('submit', async (event) => {
  event.preventDefault(); 
  const zipCode = document.getElementById('zipCode').value;

  try {
      // Fetch air quality data and update UI
      const response = await fetch(`/api/air-quality/${zipCode}`);
      if (!response.ok) {
          throw new Error(`Failed to fetch air quality data: ${response.status}`);
      }
      const airNowData = await response.json();
      displayAirQuality(airNowData); 
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch air quality data.');
  }
});

let gauge = null;

function displayAirQuality(data) {
  const observation = data[0]; 
  const AQI = observation.AQI;
  const primaryPollutant = observation.ParameterName;
  const quality = observation.Category.Name;

  const gaugeOptions = {
    id: "gaugeContainer",
    value: AQI,
    min: 0,
    max: 300,
    gaugeWidthScale: 0.6,
    counter: true,
    formatNumber: true,
    levelColors: ["#5ee432", "#ffde33", "#ff9933", "#ff3300", "#990099"],
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
    gauge = new JustGage({
      ...gaugeOptions,
      parentNode: document.getElementById('gaugeContainer')
    });
  } else {
    gauge.refresh(AQI);
  }

  gaugeGraph.style.display = 'flex'; // Show the graph container

  let bgColor;
  switch (quality) {
    case 'Good':
      bgColor = '#5ee432';
      break;
    case 'Moderate':
      bgColor = '#ffde33';
      break;
    case 'Unhealthy for Sensitive Groups':
      bgColor = '#ff9933';
      break;
    case 'Unhealthy':
      bgColor = '#ff3300';
      break;
    case 'Very Unhealthy':
      bgColor = '#990099';
      break;
    default:
      bgColor = '#fff';
  }

  aqiDiv.textContent = AQI;
  aqiDiv.style.backgroundColor = bgColor;

  pollutantDiv.textContent = primaryPollutant;
  qualityDiv.textContent = quality;
}

window.addEventListener('resize', () => {
  if (gauge) {
    gauge.refresh(); // This ensures the gauge is re-rendered to fit the new container size
  }
});

let map;

window.onload = async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 35.2271, lng: -80.8431 }, // Center coordinates for Charlotte, NC
    zoom: 8 
  });

  const tileLayer = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      return `/api/air-quality-heatmap/${zoom}/${coord.x}/${coord.y}`;
    },
    tileSize: new google.maps.Size(256, 256),
    name: 'Air Quality Heatmap',
    maxZoom: 16,
    opacity: 0.6 
  });

  map.overlayMapTypes.insertAt(0, tileLayer);
}


window.aichatbotApiKey = "dfa2910e-2ef2-42a2-b2ef-5dbec8fd78dd";
window.aichatbotProviderId = "f9e9c5e4-6d1a-4b8c-8d3f-3f9e9c5e46d1";
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://script.chatlab.com/aichatbot.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'dfa2910e-2ef2-42a2-b2ef-5dbec8fd78dd'));