import React from 'react';

function CourseDetails() {
  const courses = [
    { id: 201, cname: 'Full Stack Java & React Development', duration: '12 Weeks', level: 'Advanced' },
    { id: 202, cname: 'Cloud Native Microservices Architecture', duration: '8 Weeks', level: 'Intermediate' },
    { id: 203, cname: 'UI/UX Design Systems & CSS Mastery', duration: '6 Weeks', level: 'Beginner' }
  ];

  return (
    <div className="section-card">
      <h2 className="section-title">🎓 Course Details</h2>
      <p className="section-subtitle">Featured courses list with unique course IDs as keys</p>

      <div className="cards-grid">
        {courses.map((course) => (
          <div key={course.id} className="item-card course-item">
            <h3 className="item-name">{course.cname}</h3>
            <div className="course-tags">
              <span className="tag-duration">⏳ {course.duration}</span>
              <span className="tag-level">📊 {course.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetails;
