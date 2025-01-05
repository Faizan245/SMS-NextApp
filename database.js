const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the database file
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database opening error:', err);
  } else {
    console.log('Database connected.');
  }
});

db.serialize(() => {
  // Create admin table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `, function(err) {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Admin table created');
    }

    // Insert admin credentials if not already inserted
    db.run(`
      INSERT INTO admin (username, password)
      VALUES ('admin', 'password')
    `, function(err) {
      if (err) {
        console.error('Error inserting admin credentials:', err);
      } else {
        console.log('Admin credentials inserted or already exist.');
      }
      db.close();
    });
  });
});
