// Step 4: Create a class-based component named Posts in a Posts.js file.
import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  // Step 5: Use the constructor to initialize the component with a list of Post items in its state.
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
      error: null
    };
  }

  // Step 6: Create a loadPosts() method that uses the Fetch API to get posts from jsonplaceholder and assigns them to the component state.
  loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        // Map the API data into Post class instances
        const postObjects = data.slice(0, 20).map(
          (item) => new Post(item.id, item.title, item.body)
        );
        this.setState({ posts: postObjects, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, isLoading: false });
      });
  }

  // Step 7: Implement the componentDidMount() hook to make calls to loadPosts().
  componentDidMount() {
    this.loadPosts();
  }

  // Step 9: Define a componentDidCatch() method to display any errors occurring in the component as alert messages.
  componentDidCatch(error, info) {
    alert('An error occurred in the Posts component: ' + error.message);
  }

  // Step 8: Implement the render() method to display the post titles as headings and post bodies as paragraphs.
  render() {
    const { posts, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching blog posts from API...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <h2>⚠️ Error Loading Posts</h2>
          <p>{error}</p>
        </div>
      );
    }

    return (
      <div className="posts-container">
        <h2 className="section-title">📝 Latest Blog Posts</h2>
        <p className="section-subtitle">Fetched via componentDidMount() lifecycle hook using the Fetch API</p>
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <span className="post-id">#{post.id}</span>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }
}

export default Posts;
