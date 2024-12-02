import React, { useState } from 'react';
import '../Course/Course.css'; // Import CSS for styling

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const courses = [
    { id: 1, title: 'React for Beginners', description: 'Learn React from scratch in this beginner-friendly course.' },
    { id: 2, title: 'Advanced JavaScript', description: 'Master the advanced concepts of JavaScript for modern web development.' },
    { id: 3, title: 'Python Programming', description: 'Explore Python programming for data science, AI, and web development.' },
    { id: 4, title: 'Full-Stack Web Development', description: 'Become a full-stack web developer with hands-on projects and real-world skills.' },
    { id: 5, title: 'Data Structures and Algorithms', description: 'Build a strong foundation in computer science concepts and problem-solving.' },
    { id: 6, title: 'Machine Learning Basics', description: 'Dive into machine learning concepts and build predictive models using Python.' },
    { id: 7, title: 'UI/UX Design Fundamentals', description: 'Learn the basics of user interface and user experience design.' },
    { id: 8, title: 'Cybersecurity Essentials', description: 'Understand the principles of cybersecurity and protect digital systems.' },
    { id: 9, title: 'Cloud Computing with AWS', description: 'Master cloud computing with Amazon Web Services and deploy scalable applications.' },
    { id: 10, title: 'Mobile App Development', description: 'Learn to build Android and iOS apps using React Native or Flutter.' },
    { id: 11, title: 'SQL for Data Analysis', description: 'Analyze and visualize data using SQL and database management systems.' },
    { id: 12, title: 'Blockchain Fundamentals', description: 'Explore blockchain technology and its applications in various industries.' },
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEnroll = (courseTitle) => {
    alert(`You have successfully enrolled in the "${courseTitle}" course!`);
  };

  return (
    <div className="courses-container">
      <header className="courses-header">
        <h1>Explore Our Courses</h1>
        <p>Find the perfect course to enhance your skills and knowledge.</p>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div className="course-card" key={course.id}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <button className="enroll-button"  onClick={() => handleEnroll(course.title)}>Enroll Now</button>
            </div>
          ))
        ) : (
          <p className="no-courses-message">No courses found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
