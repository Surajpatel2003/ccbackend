const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "dbrds.cchjjdsbqie2.ap-southeast-2.rds.amazonaws.com", // ip address of server running mysql
  user: "admin", // user name to your mysql database
  password: "surajpatel", // corresponding password
  database: "sample", // use the specified database
});

// make to connection to the database.
con.connect(function (err) {
  if (err) throw err;
  // if connection is successful
  console.log("connection successful");
});

app.get("/", (req, res) => {
  res.json("OK");
});

// app.post("/", (req, res) => {
//   var { name, rollno } = req.body;
//   var records = [[req.body.name, req.body.rollno]];
//   if (records[0][0] != null) {
//     con.query(
//       "INSERT into students (name,rollno) VALUES ?",
//       [records],
//       function (err, res, fields) {
//         if (err) throw err;

//         console.log(res);
//       }
//     );
//   }
//   res.json("Form recieved");
// });

app.post("/", (req, res) => {
  var { name, rollno } = req.body;
  console.log(req.body);
  var records = [
    [
      req.body.name,
      req.body.email,
      req.body.busnumber,
      req.body.picklocation,
      req.body.destination,
      req.body.expiredate,
    ],
  ];

  console.log(records);
  if (records[0][0] != null) {
    con.query(
      "INSERT into customer (name,email,busnumber,picklocation,destination,expiredate) VALUES ?",
      [records],
      function (err, res, fields) {
        if (err) throw err;

        console.log(res);
      }
    );
  }
  res.json("Form recieved");
  console.log("form recieved");
});

app.listen(3001, () => {
  console.log("Port 3001");
});
