
import React, { useState, useEffect } from 'react';
import '../CourseType/CourseType.css'

function CourseTypes() {
  const [courseTypes, setCourseTypes] = useState([]); // List of course types
  const [formData, setFormData] = useState({ name: '', description: '' }); // Form state
  const [isEditing, setIsEditing] = useState(false); // Edit mode flag
  const [editId, setEditId] = useState(null); // ID of the course type being edited

  useEffect(() => {
    fetch('https://eleven-60f19-default-rtdb.firebaseio.com/course-types.json')
      .then((response) => response.json())
      .then((data) => {
        const loadedCourseTypes = [];
        for (let id in data) {
          loadedCourseTypes.push({ id: id, ...data[id] }); // Store the Firebase key as id
        }
        setCourseTypes(loadedCourseTypes);
      })
      .catch((error) => console.error('Error loading course types:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `https://eleven-60f19-default-rtdb.firebaseio.com/course-types/${editId}.json`
      : 'https://eleven-60f19-default-rtdb.firebaseio.com/course-types.json';     
      
      // this data has saved in ( firebase )
 
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (isEditing) {
          setCourseTypes(
            courseTypes.map((type) => (type.id === editId ? { ...type, ...formData } : type))
          );
          setIsEditing(false);
          setEditId(1+1);
        } 
        else {
          const newId = courseTypes.length ? Math.max(...courseTypes.map((type) => parseInt(type.id))) + 1 : 1;
          const newType = { id: newId, ...formData }; 
          setCourseTypes([...courseTypes, newType]);
        }
        setFormData({ name: '', description: '' }); 
      })
      .catch((error) => console.error('Error submitting course type:', error));
  };

  const handleEdit = (type) => {
    setFormData({ name: type.name, description: type.description });
    setEditId(type.id); 
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course type?')) {
      const url = `https://eleven-60f19-default-rtdb.firebaseio.com/course-types/${id}.json`;
      fetch(url, { method: 'DELETE' })
        .then(() => {
          setCourseTypes(courseTypes.filter((type) => type.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting course type:', error);
        });
    }
  };

  return (
    <div>
      <h1>Course Types</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        ></textarea>
        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseTypes.map((type) => (
            <tr key={type.id}>
              <td>{type.id}</td> {/* Display the sequential ID */}
              <td>{type.name}</td>
              <td>{type.description}</td>
              <td>
                <button onClick={() => handleEdit(type)}>Edit</button>
                <button onClick={() => handleDelete(type.id)}>Delete</button> {/* Delete Button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTypes;
