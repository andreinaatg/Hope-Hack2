const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("Homepage", { extensions: ["html"] }));
app.use(express.static("Datapage", { extensions: ["html"] }));
app.use(express.static("Images"));
app.use(express.static("About_Us", { extensions: ["html"] }));
app.use(express.static("Tony"));
app.use(express.static("Donationpage", { extensions: ["html"] }));

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
