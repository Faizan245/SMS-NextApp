// pages/api/admission.js
import sqlite3 from 'sqlite3';
import path from 'path';

// Path to the database file
const dbPath = path.resolve(process.cwd(), 'database.sqlite');
const db = new sqlite3.Database(dbPath);

export default (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;
        const scholarNo = data.scholar_no;

        // Check if scholar_no already exists
        db.get(`SELECT scholar_no FROM admissions WHERE scholar_no = ?`, [scholarNo], (err, row) => {
            if (err) {
                return res.status(500).json({ "error": err.message });
            }

            if (row) {
                // Scholar No. already exists
                return res.status(400).json({ "error": "Scholar No. already exists" });
            }

            // Insert new record
            const sql = `INSERT INTO admissions (scholar_no, student_name, dob, gender, samagra_id, family_id, contact_no, father_name, mother_name, cast, aadhar_number, name_on_aadhar, whatsapp_no, previous_class, admission_under, admission_date, admission_class, address, bank_account, ifsc_code, photo, document)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const params = [
                data.scholar_no, data.student_name, data.dob, data.gender, data.samagra_id, data.family_id, data.contact_no, data.father_name, data.mother_name, data.cast, data.aadhar_number, data.name_on_aadhar, data.whatsapp_no, data.previous_class, data.admission_under, data.admission_date, data.admission_class, data.address, data.bank_account, data.ifsc_code, data.photo, data.document
            ];

            db.run(sql, params, function(err) {
                if (err) {
                    return res.status(500).json({ "error": err.message });
                }
                res.json({
                    "message": "success",
                    "data": data,
                    "id": this.lastID
                });
            });
        });
    } else {
        res.status(405).json({ "error": "Method not allowed" });
    }
};
