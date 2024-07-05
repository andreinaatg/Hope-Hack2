const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("Homepage"));
app.use(express.static("Donationpage"));
app.use(express.static("Datapage"));
app.use(express.static("Images"));
app.use(express.static("About_Us"));
app.use(express.static("Tony"));

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

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/Homepage"));
// });

app.post("/news", (req, res) => {
  const email = req.body.donate;
  console.log(req.body.donate);

  const sql = `INSERT INTO newsletter_info(email) VALUES(?)`;
  connection.query(sql, [email], function (err, data) {
    if (err) {
      res.redirect("");
    } else {
      res.redirect("");
    }
  });

  connection.query(
    "SELECT * FROM newsletter_info",
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    }
  );
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
        res.redirect("/form.html");
      } else {
        res.redirect("/form.html");
      }
    }
  );
});

app.listen(3030);
