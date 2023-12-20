import sqlite3 from "sqlite3";
export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;
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
  const sql = `SELECT * FROM users where id='${id}'`;

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

      res.status(200).json({ user: rows });
      console.log(`formattedUsers: ${formattedUsers}`);
    }
  });
}
