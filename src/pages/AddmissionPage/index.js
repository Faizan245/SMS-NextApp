"use client"; 
import React, { useState, useEffect } from 'react';

const AdmissionPage = () => {
  const [session, setSession] = useState('2022');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('YearwiseList');
  const [searchScholarNo, setSearchScholarNo] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);

  const sessions = ['2022', '2023', '2024', '2025', '2026'];

  // Fetch data for year-wise admission list
  const fetchYearWiseData = async () => {
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

  // Fetch student details by scholar number
  const fetchStudentDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/Admission/admission?scholar_no=${searchScholarNo}`);
      const data = await response.json();
      if (response.ok) {
        setStudentDetails(data);
      } else {
        setError(data.error || 'Student not found');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'YearwiseList') fetchYearWiseData();
  }, [session, activeTab]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header/Navbar */}
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('AdmissionForm')}>Admission Form</button>
        <button onClick={() => setActiveTab('EditAdmission')}>Edit Student's Admission Details</button>
        <button onClick={() => setActiveTab('YearwiseList')}>Year wise Admission List</button>
      </nav>

      {/* Admission Form */}
      {activeTab === 'AdmissionForm' && (
        <div>
          <h1>Admission Form</h1>
          <p>Admission form component will go here.</p>
        </div>
      )}

      {/* Edit Admission Details */}
      {activeTab === 'EditAdmission' && (
        <div>
          <h1>Edit Student's Admission Details</h1>
          <input
            type="text"
            placeholder="Enter Scholar No"
            value={searchScholarNo}
            onChange={(e) => setSearchScholarNo(e.target.value)}
          />
          <button onClick={fetchStudentDetails}>Search</button>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {studentDetails && (
            <div>
              <h2>Student Details</h2>
              <p>Name: {studentDetails.student_name}</p>
              <p>Class: {studentDetails.admission_class}</p>
              <p>Father Name: {studentDetails.father_name}</p>
              <p>Mother Name: {studentDetails.mother_name}</p>
              <button>Update Details</button>
            </div>
          )}
        </div>
      )}

      {/* Year-wise Admission List */}
      {activeTab === 'YearwiseList' && (
        <div>
          <h1>Year-wise Admission List</h1>
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
      )}
    </div>
  );
};

export default AdmissionPage;
