import sqlite3 from "sqlite3";
import { open } from "sqlite3";

export default async function handler(req, res) {
  var data = {};
  const db = new sqlite3.Database(
    "C:/Users/LENOVO/Desktop/ALL/Projects/bluecode_test/src/pages/api/db.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
        console.log(err + "errors");
        res.status(500).json({ error: "Failed to connect to the database" });
        return;
      }

      const selectQuery = "SELECT * FROM users"; // Retrieve all columns from your_table

      db.all(selectQuery, (err, rows) => {
        if (err) {
          console.error(err.message);
          res
            .status(500)
            .json({ error: "Failed to fetch data from the database" });
          return;
        }
        console.log(rows);
        data = rows;

        res.status(200).json({ data: rows }); // Send fetched data in response
      });

      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
      });
    }
  );

  if (req.method == "POST") {
    var user = req.body;
    const insertQuery =
      "INSERT INTO users (id, firstname, lastname, age,gender,immunization) VALUES (?, ?, ?,?,?,?)";
    var values = [];
    // get all added children
    const existingData = data;
    if (existingData != null || existingData != undefined) {
      console.log(`existingData: ${existingData}`);
      values = [
        existingData.length,
        user.firstName,
        user.lastName,
        user.age,
        user.gender,
        `${user.immunization}`,
      ];
    } else {
      const emptyArray = [];
      emptyArray.push(user);
      values = [
        1,
        user.firstName,
        user.lastName,
        user.age,
        user.gender,
        `${user.immunization}`,
      ];
    }

    db.run(insertQuery, values, function (err) {
      if (err) {
        console.log("Inside insert");
        console.error(err.message);
        res
          .status(500)
          .json({ error: "Failed to insert data into the database" });
        return;
      }

      res.status(200).json({ message: "Data inserted successfully" });
    });

    db.close((err) => {
      if (err) {
        consonse.log("Closing DB");
        console.error(err.message);
      }
    });
  } else if (req.method == "Get" && req.url == "") {
    // add a child
  } else if (req.method == "Get" && req.url == "") {
    // get child by id
  }
}
