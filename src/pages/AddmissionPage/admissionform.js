// AdmissionForm.js
import React, { useState } from 'react';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    scholar_no: '',
    student_name: '',
    dob: '',
    gender: '',
    samagra_id: '',
    family_id: '',
    contact_no: '',
    father_name: '',
    mother_name: '',
    cast: '',
    aadhar_number: '',
    name_on_aadhar: '',
    whatsapp_no: '',
    previous_class: '',
    admission_under: '',
    admission_date: '',
    admission_year: '',
    admission_class: '',
    address: '',
    bank_account: '',
    ifsc_code: '',
    photo: null,
    document: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Log all the form data to the console
//     console.log('Form Data Submitted:', formData);
//   };
  
const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form Data Submitted:', formData);
    
    try {
      const response = await fetch('/api/Admission/admission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // send the form data as JSON
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Form submitted successfully:', data);
      } else {
        console.error('Error submitting form:', data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission
//     console.log('Form Data Submitted:', formData);
//     try {
//       // Create FormData object to send data including files
//       const formDataToSend = new FormData();
//       for (const key in formData) {
//         formDataToSend.append(key, formData[key]);
//       }

//       // Make a POST request to your API
//       const response = await fetch('/api/Admission/admission', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert('Admission successful!');
//         console.log(result); // You can log the response data if needed
//       } else {
//         const error = await response.json();
//         alert(`Error: ${error.error}`);
//       }
//     } catch (error) {
//       alert('Error while submitting the form');
//       console.error(error);
//     }
//   };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Admission Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label>Scholar No:</label>
            <input
              type="text"
              name="scholar_no"
              value={formData.scholar_no}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Student Name:</label>
            <input
              type="text"
              name="student_name"
              value={formData.student_name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label>Samagra ID:</label>
            <input
              type="text"
              name="samagra_id"
              value={formData.samagra_id}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Family ID:</label>
            <input
              type="text"
              name="family_id"
              value={formData.family_id}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Contact No:</label>
            <input
              type="tel"
              name="contact_no"
              value={formData.contact_no}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Father's Name:</label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Mother's Name:</label>
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Caste:</label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Aadhar Number:</label>
            <input
              type="text"
              name="aadhar_number"
              value={formData.aadhar_number}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Name on Aadhar:</label>
            <input
              type="text"
              name="name_on_aadhar"
              value={formData.name_on_aadhar}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Whatsapp No:</label>
            <input
              type="tel"
              name="whatsapp_no"
              value={formData.whatsapp_no}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Previous Class:</label>
            <input
              type="text"
              name="previous_class"
              value={formData.previous_class}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Admission Under:</label>
            <input
              type="text"
              name="admission_under"
              value={formData.admission_under}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Admission Date:</label>
            <input
              type="date"
              name="admission_date"
              value={formData.admission_date}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Admission Year:</label>
            <select
            name="admission_year"
            value={formData.admission_year}
            onChange={handleChange}
            style={inputStyle}
            >
            <option value="">Select Admission Year</option>
            <option value="year_23_24">23-24</option>
            <option value="year_24_25">24-25</option>
            <option value="year_25_26">25-26</option>
            <option value="year_26_27">26-27</option>
            </select>

          </div>

          <div>
            <label>Admission Class:</label>
            <input
              type="text"
              name="admission_class"
              value={formData.admission_class}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={{ ...inputStyle, height: '100px' }}
            />
          </div>

          <div>
            <label>Bank Account No:</label>
            <input
              type="text"
              name="bank_account"
              value={formData.bank_account}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>IFSC Code:</label>
            <input
              type="text"
              name="ifsc_code"
              value={formData.ifsc_code}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Right Side Section for Photo and Document */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '20px' }}>
            <div>
              <label>Photo:</label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label>Document:</label>
              <input
                type="file"
                name="document"
                onChange={handleFileChange}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '14px',
};

export default AdmissionForm;
