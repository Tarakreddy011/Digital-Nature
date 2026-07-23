import React, { useState } from 'react';
import BookDetails from './BookDetails';
import BlogDetails from './BlogDetails';
import CourseDetails from './CourseDetails';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Blogger & Knowledge Hub</h1>
        <p className="subtitle">Demonstrating Multiple Component Rendering, Lists, & <code>key</code> Props</p>
        
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} 
            onClick={() => setActiveTab('all')}
          >
            🌟 All Sections
          </button>
          <button 
            className={`tab-btn ${activeTab === 'books' ? 'active' : ''}`} 
            onClick={() => setActiveTab('books')}
          >
            📚 Books
          </button>
          <button 
            className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`} 
            onClick={() => setActiveTab('blogs')}
          >
            ✍️ Blogs
          </button>
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`} 
            onClick={() => setActiveTab('courses')}
          >
            🎓 Courses
          </button>
        </div>
      </header>

      <main className="app-main">
        {(activeTab === 'all' || activeTab === 'books') && <BookDetails />}
        {(activeTab === 'all' || activeTab === 'blogs') && <BlogDetails />}
        {(activeTab === 'all' || activeTab === 'courses') && <CourseDetails />}
      </main>

      <footer className="app-footer">
        <p>© 2026 Blogger App. Multiple Components & Keys Demonstration.</p>
      </footer>
    </div>
  );
}

export default App;
