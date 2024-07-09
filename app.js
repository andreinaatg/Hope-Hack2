const express = require("express");
const app = express();
const mysql = require("mysql2");
const fetch = require('node-fetch');
const cors = require('cors');
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.set("view engine", "ejs");
app.use(express.static("Homepage", { extensions: ["html"] }));
app.use(express.static("Datapage", { extensions: ["html"] }));
app.use(express.static("Images"));
app.use(express.static("About_Us", { extensions: ["html"] }));
app.use(express.static("Tony"));
app.use(express.static("Donationpage", { extensions: ["html"] }));
app.use(cors()); 


const AIR_NOW_API_KEY = '8AB37F18-D5CD-4755-9FA5-4D52BAB5BFD6';
const GOOGLE_API_KEY = 'AIzaSyCO6Mle-P4bJLUeHJzTlLJc05sF-z98OMQ';

// connecting node to sql
const connection = mysql.createConnection({
  host: "sql5.freesqldatabase.com",
  user: "sql5718129",
  password: "tY4U5Ww1NJ",
  database: "sql5718129",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected!!");
});

//get routes
app.get('/api/air-quality/:zipCode', async (req, res) => {
  const { zipCode } = req.params; // Extract the zip code from the URL parameters.
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
  const { zoom, x, y } = req.params; // Extract zoom, x, and y from the URL parameters.
  const mapType = 'US_AQI'; 
  const url = `https://airquality.googleapis.com/v1/mapTypes/${mapType}/heatmapTiles/${zoom}/${x}/${y}?key=${GOOGLE_API_KEY}`;

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


//post routes
app.post("/news", (req, res) => {
  const email = req.body.donate;
  console.log(req.body.donate);

  const sql = `INSERT INTO newsletter_info(email) VALUES(?)`;
  connection.query(sql, [email], function (err, data) {
    if (err) {
      console.log("err");
    } else {
      console.log("success");
    }
  });

  console.log(req.headers.referer);
  const x = req.headers.referer;
  res.redirect(x);
});

app.post("/form", (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const donate = req.body.donate;

  const sql = `INSERT INTO form_info(first_name, last_name, email, donation_amount) VALUES(?, ?, ?, ?)`;
  connection.query(
    sql,
    [firstName, lastName, email, donate],
    function (err, data) {
      if (err) {
        res.redirect("/form");
      } else {
        res.redirect("/form");
      }
    }
  );
});

app.listen(3030);
