import sqlite3 from "sqlite3";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const db = new sqlite3.Database(
      "C:/Users/LENOVO/Desktop/ALL/Projects/bluecode_test/src/pages/api/db.db",
      (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: "Database connection error" });
        }
      }
    );
    var user = req.body;
    var data = [];
    const insertQuery =
      "INSERT INTO users (id, firstname, lastname, age,gender,immunization) VALUES (?, ?, ?,?,?,?)";
    var values = [];
    // Query to fetch data from the 'users' table
    const sql = "SELECT * FROM users";

    // Execute the query
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error fetching data from database" });
      } else {
        // Close the database connection

        // Send fetched data as JSON response
        data = rows;
        const formattedUsers = data.map((user) => ({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          age: user.age,
          gender: user.gender,
          immunization: user.immunization,
        }));
        // res.status(200).json({ users: formattedUsers });
        console.log(`formattedUsers: ${formattedUsers.length}`);
        // get all added children
        const existingData = data;
        const newId = formattedUsers.length ?? 0;

        values = [
          newId,
          req.body.firstName,
          req.body.lastName,
          user.age,
          user.gender,
          `${user.immunization}`,
        ];
        console.log(values);
        console.log(`req.body: ${req.body.firstname}`);

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
      }
    });
  } else if (req.method == "GET") {
    const db = new sqlite3.Database(
      "C:/Users/LENOVO/Desktop/ALL/Projects/bluecode_test/src/pages/api/db.db",
      (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: "Database connection error" });
        }
      }
    );

    // Query to fetch data from the 'users' table
    const sql = "SELECT * FROM users";

    // Execute the query
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error fetching data from database" });
      } else {
        // Close the database connection
        db.close((err) => {
          if (err) {
            console.error(err.message);
          }
        });

        // Send fetched data as JSON response
        console.log(`users: ${rows}`);
        const formattedUsers = rows.map((user) => ({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          age: user.age,
          gender: user.age,
          immunization: user.immunization,
        }));
        res.status(200).json({ users: formattedUsers });
        console.log(`formattedUsers: ${formattedUsers}`);
      }
    });
  }
}
