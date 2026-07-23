import axios from 'axios';

class GitClient {
  async getRepositories(userName) {
    try {
      const response = await axios.get(`https://api.github.com/users/${userName}/repos`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching repositories for user ${userName}:`, error);
      throw error;
    }
  }
}

export default GitClient;
