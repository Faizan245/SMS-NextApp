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
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `, function(err) {
    if (err) {
      console.error('Error creating admin table:', err);
    } else {
      console.log('Admin table created.');
    }

    // Check if the admin credentials already exist
    db.get(`SELECT * FROM admin WHERE username = 'admin'`, function(err, row) {
      if (err) {
        console.error('Error querying admin credentials:', err);
      } else if (!row) {
        // Insert admin credentials if not already inserted
        db.run(`
          INSERT INTO admin (username, password)
          VALUES ('admin', 'password')
        `, function(err) {
          if (err) {
            console.error('Error inserting admin credentials:', err);
          } else {
            console.log('Admin credentials inserted.');
          }
        });
      } else {
        console.log('Admin credentials already exist.');
      }
    });
  });

  // Create admissions table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS admissions (
      scholar_no TEXT PRIMARY KEY,
      student_name TEXT,
      dob DATE,
      gender TEXT,
      samagra_id TEXT,
      family_id TEXT,
      contact_no TEXT,
      father_name TEXT,
      mother_name TEXT,
      cast TEXT,
      aadhar_number TEXT,
      name_on_aadhar TEXT,
      whatsapp_no TEXT,
      previous_class TEXT,
      admission_under TEXT,
      admission_date DATE,
      admission_class TEXT,
      address TEXT,
      bank_account TEXT,
      ifsc_code TEXT,
      photo TEXT,
      document TEXT,
      year_23_24 TEXT,
      year_24_25 TEXT,
      year_25_26 TEXT,
      year_26_27 TEXT
    )
  `, function(err) {
    if (err) {
      console.error('Error creating admissions table:', err);
    } else {
      console.log('Admissions table created.');
    }
    db.close();
  });
});
