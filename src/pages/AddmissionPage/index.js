"use client"; // Add this line at the top
import React, { useState, useEffect } from 'react';

const AdmissionList = () => {
  const [session, setSession] = useState('2022');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sessions = ['2022', '2023', '2024', '2025', '2026'];

  // Fetch data based on selected session
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/Admission/admission?admission_year=${session}`);
      const data = await response.json();
      if (response.ok) {
        setStudents(data);
      } else {
        setError(data.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admission Student's List</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="session">Session: </label>
        <select
          id="session"
          value={session}
          onChange={(e) => setSession(e.target.value)}
        >
          {sessions.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Scholar No</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Contact No</th>
              <th>Father Name</th>
              <th>Mother Name</th>
              <th>Class</th>
              <th>Admission Date</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.scholar_no}>
                <td>{student.scholar_no}</td>
                <td>{student.student_name}</td>
                <td>{student.dob}</td>
                <td>{student.gender}</td>
                <td>{student.contact_no}</td>
                <td>{student.father_name}</td>
                <td>{student.mother_name}</td>
                <td>{student.admission_class}</td>
                <td>{student.admission_date}</td>
                <td>{student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdmissionList;
