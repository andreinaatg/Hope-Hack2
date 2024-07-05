const express = require("express");
const fetch = require('node-fetch');
const path = require("path");
const cors = require('cors');

const app = express();
const PORT = 3003;

const AIR_NOW_API_KEY = '8AB37F18-D5CD-4755-9FA5-4D52BAB5BFD6';
const GOOGLE_API_KEY = 'AIzaSyCO6Mle-P4bJLUeHJzTlLJc05sF-z98OMQ';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Datapage')));

app.get('/api/air-quality/:zipCode', async (req, res) => {
  const { zipCode } = req.params;
  const distance = req.query.distance || 25;
  const url = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zipCode}&distance=${distance}&API_KEY=${AIR_NOW_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from AirNow API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/air-quality-heatmap/:zoom/:x/:y', async (req, res) => {
  const { zoom, x, y } = req.params;
  const url = `https://maps.googleapis.com/maps/v1/airquality/tiles/${zoom}/${x}/${y}?key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch heatmap tile: ${response.status}`);
    }
    response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching heatmap tile from Google Maps API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
