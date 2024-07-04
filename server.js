const express = require("express");
const fetch = require ('node-fetch');

const app = express();
const PORT = 3003;
const API_KEY = '8AB37F18-D5CD-4755-9FA5-4D52BAB5BFD6'; // replace with your actual API key

app.use(express.json());

app.get('/api/air-quality/:zipCode', async (req, res) => {
  const { zipCode } = req.params;
  const distance = req.query.distance || 25;
  const url = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zipCode}&distance=${distance}&API_KEY=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from AirNow API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
