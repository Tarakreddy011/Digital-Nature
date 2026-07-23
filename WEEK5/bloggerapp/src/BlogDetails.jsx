import React from 'react';

function BlogDetails() {
  const blogs = [
    { id: 1, title: 'Understanding React Fiber & Concurrent Mode', author: 'Syed Tech', date: '2026-07-15' },
    { id: 2, title: 'Optimizing Web Performance with Vite', author: 'Ananya S', date: '2026-07-18' },
    { id: 3, title: 'State Management with Context API vs Redux', author: 'Vikram M', date: '2026-07-20' }
  ];

  return (
    <div className="section-card">
      <h2 className="section-title">✍️ Blog Details</h2>
      <p className="section-subtitle">Technical blogs list rendered with unique blog IDs as keys</p>

      <div className="cards-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="item-card blog-item">
            <h3 className="item-name">{blog.title}</h3>
            <div className="blog-meta">
              <span>👤 {blog.author}</span>
              <span>📅 {blog.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogDetails;
