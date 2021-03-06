const express = require("express");
const mysql = require("mysql");
const {v4 : uuidv4} = require('uuid')
//import { validate as uuidValidate } from 'uuid';
//const UUID = require('uuid-int');

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adi01521307723",
  database: "studentdb2",
});

const router = express.Router();

router.get("/", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM student INNER JOIN registration ON  student.student_id = registration.student_id;",
    (err, rows, fields) => {
      if (!err) {
        //console.log(rows);
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const regx = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i ;
  if (regx.test(id) != true || id == "#") {
    res.send("Invalid id");
  } else {
    mysqlConnection.query(
      "SELECT * FROM student INNER JOIN registration ON  student.student_id = registration.student_id WHERE student.student_id = ?",
      [id],
      (err, rows, fields) => {
        if (!err) {
          //console.log(rows);
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }
});

router.post("/create", (req, res) => {
  const student_id = uuidv4() ;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const gender = req.body.gender;
  const age = req.body.age;
  const address = req.body.address;
  //let email = req.body.email;
  mysqlConnection.query(
    "INSERT INTO student (student_id,fname ,lname,gender,age, address) VALUES (?,?,?,?,?,?)",
    //   `INSERT INTO registration (student_id) VALUES (${student_id})`,
    [student_id, fname, lname, gender, age, address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("value Inserted");
      }
    }
  );
  mysqlConnection.query(
    "INSERT INTO registration (student_id) VALUES (?)",
    [student_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("regvalue Inserted");
      }
    }
  );
});

router.patch("/update/:id", (req, res) => {
    //const student_id = req.body.student_id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const gender = req.body.gender;
    const age = req.body.age;
    const address = req.body.address;
    const id = req.params.id ;
    //let email = req.body.email;
    mysqlConnection.query(
        "UPDATE student SET fname = ? ,lname = ? ,gender = ? ,age = ? , address =? WHERE student_id = ?",
        [fname, lname, gender, age, address,id ],
        (err, rows, fields) => {
          if (!err) {
            //console.log(rows);
            res.send("updated SUCESSFULLY");
          } else {
            console.log(err);
          }
        }
      );
    // mysqlConnection.query(
    //   "INSERT INTO registration (student_id) VALUES (?)",
    //   [student_id],
    //   (err, result) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("regvalue Inserted");
    //     }
    //   }
    // );
  });

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const regx = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i ;
    if (regx.test(id) !=true ) {
      res.send("Invalid id");
    } else {
      mysqlConnection.query(
        // "DELETE FROM student registration INNER JOIN registration ON  student.student_id = registration.student_id WHERE student.student_id = ?",
        "DELETE FROM student WHERE student_id = ?",
        [id],
        (err, rows, fields) => {
          if (!err) {
            //console.log(rows);
            res.send("DELETED SUCESSFULLY");
          } else {
            console.log(err);
          }
        }
      );
      mysqlConnection.query(
        // "DELETE FROM student registration INNER JOIN registration ON  student.student_id = registration.student_id WHERE student.student_id = ?",
        "DELETE FROM registration WHERE student_id = ?",
        [id],
        (err, rows, fields) => {
          if (!err) {
            //console.log(rows);
            res.send("REG DELETED SUCESSFULLY");
          } else {
            console.log(err);
          }
        }
      )
    }
  });

module.exports = router;
