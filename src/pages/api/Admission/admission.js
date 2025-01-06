import sqlite3 from 'sqlite3';
import path from 'path';

// Path to the database file
const dbPath = path.resolve(process.cwd(), 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const getYearColumn = (admissionYear) => {
    switch (admissionYear) {
        case '23-24':
            return 'year_23_24';
        case '24-25':
            return 'year_24_25';
        case '25-26':
            return 'year_25_26';
        case '26-27':
            return 'year_26_27';
        default:
            return null;
    }
};

export default (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;
        const scholarNo = data.scholar_no;

        // Determine the correct year column
        const yearColumn = getYearColumn(data.admission_year);
        if (!yearColumn) {
            return res.status(400).json({ "error": "Invalid admission year" });
        }

        // Set values for all year columns
        const yearColumns = {
            year_23_24: yearColumn === 'year_23_24' ? data.admission_class : '',
            year_24_25: yearColumn === 'year_24_25' ? data.admission_class : '',
            year_25_26: yearColumn === 'year_25_26' ? data.admission_class : '',
            year_26_27: yearColumn === 'year_26_27' ? data.admission_class : '',
        };

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
            const sql = `INSERT INTO admissions (
                scholar_no, student_name, dob, gender, samagra_id, family_id, contact_no, 
                father_name, mother_name, cast, aadhar_number, name_on_aadhar, whatsapp_no, 
                previous_class, admission_under, admission_date, admission_class, address, 
                bank_account, ifsc_code, photo, document, year_23_24, year_24_25, year_25_26, year_26_27
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const params = [
                scholarNo,
                data.student_name,
                data.dob,
                data.gender,
                data.samagra_id,
                data.family_id,
                data.contact_no,
                data.father_name,
                data.mother_name,
                data.cast,
                data.aadhar_number,
                data.name_on_aadhar,
                data.whatsapp_no,
                data.previous_class,
                data.admission_under,
                data.admission_date,
                data.admission_class,
                data.address,
                data.bank_account,
                data.ifsc_code,
                data.photo,
                data.document,
                yearColumns.year_23_24,
                yearColumns.year_24_25,
                yearColumns.year_25_26,
                yearColumns.year_26_27
            ];

            db.run(sql, params, function (err) {
                if (err) {
                    return res.status(500).json({ "error": err.message });
                }
                res.status(200).json({ "message": "Record added successfully", "data": data, id: this.lastID });
            });
        });
    } else if (req.method === 'GET') {
        const scholarNo = req.query.scholar_no;
        if (!scholarNo) {
            return res.status(400).json({ "error": "Scholar No. is required" });
        }

        const sql = `SELECT * FROM admissions WHERE scholar_no = ?`;
        
        db.get(sql, [scholarNo], (err, row) => {
            if (err) {
                return res.status(500).json({ "error": err.message });
            }
            if (!row) {
                return res.status(404).json({ "error": "Record not found" });
            }
            res.status(200).json(row);
        });
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
