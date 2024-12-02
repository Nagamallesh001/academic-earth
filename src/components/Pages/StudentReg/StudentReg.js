import React, { useState, useEffect } from 'react';
import '../StudentReg/StudentReg.css'; // Import CSS for styling

const StudentRegistrations = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });
  const [nextId, setNextId] = useState(1); // New state to track the next available ID

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students'));
    if (savedStudents) {
      setStudents(savedStudents);

      const highestId = savedStudents.length > 0 ? Math.max(...savedStudents.map(student => student.id)) : 0;
      setNextId(highestId + 1); // Next ID will be one higher than the highest ID
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.course) {
      alert('Please fill out all fields.');
      return;
    }

    const newStudent = { id: nextId, ...formData };
    setStudents([...students, newStudent]);
    setFormData({ name: '', email: '', course: '' });
    setNextId(nextId + 1); 
    alert('Student registered successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  return (
    <div className="student-registrations-container">
      <header className="registrations-header">
        <h1>Student Registrations</h1>
        <p>Register students and manage their details here.</p>
      </header>

      {/* Registration Form */}
      <form className="registration-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <select
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          required
        >
          <option value="" disabled>
            Select a Course
          </option>
          <option value="React for Beginners">React for Beginners</option>
          <option value="Advanced JavaScript">Advanced JavaScript</option>
          <option value="Python Programming">Python Programming</option>
          <option value="Full-Stack Web Development">Full-Stack Web Development</option>
          <option value="Data Structures and Algorithms">Data Structures and Algorithms</option>
          <option value="Machine Learning Basics">Machine Learning Basics</option>
          <option value="SQL for Data Analysis">SQL for Data Analysis</option>
          <option value="Mobile App Development">Mobile App Development</option>
          <option value="Cloud Computing with AWS">Cloud Computing with AWS</option>
        </select>
        <button type="submit">Register</button>
      </form>

      {/* Registered Students Table */}
      <div className="students-list">
        {students.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>
                    <button className="delete-button"
                      onClick={() => handleDelete(student.id)}  > Delete </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-registrations-message">No registrations yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentRegistrations;
