const express = require("express");
const mysql = require("mysql");
// const expres = require("express");
const routes = require("./routes/router.js");
var app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(express.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adi01521307723",
  database: "studentdb2",
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connection established");
  } else {
    console.log(
      "DB connection failed \n Error :" + JSON.stringify(err, undefined, 2)
    );
  }
});


app.use('/students' , routes)

app.use('/students/:id' , routes)

app.use('/students/create' ,routes )

app.delete('/delete/:id' , routes)

app.patch('/update/:id' , routes)

app.listen(3000, () => console.log("Express server is running on port : 3000"));
