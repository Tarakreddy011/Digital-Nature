import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import GitClient from './GitClient';

vi.mock('axios');

describe('Git Client Tests', () => {
  it('should return repository names for techiesyed', async () => {
    const mockData = {
      data: [
        { id: 1, name: 'react-hands-on', description: 'React labs repository', html_url: 'https://github.com/techiesyed/react-hands-on', stargazers_count: 42, language: 'JavaScript' },
        { id: 2, name: 'spring-boot-demo', description: 'Spring Boot REST APIs', html_url: 'https://github.com/techiesyed/spring-boot-demo', stargazers_count: 18, language: 'Java' },
        { id: 3, name: 'microservices-hub', description: 'Microservices architecture setup', html_url: 'https://github.com/techiesyed/microservices-hub', stargazers_count: 35, language: 'Java' }
      ]
    };

    axios.get.mockResolvedValue(mockData);

    const client = new GitClient();
    const repos = await client.getRepositories('techiesyed');

    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/techiesyed/repos');
    expect(repos).toEqual(mockData.data);
    expect(repos.length).toBe(3);
    expect(repos[0].name).toBe('react-hands-on');
    expect(repos[1].name).toBe('spring-boot-demo');
    expect(repos[2].name).toBe('microservices-hub');
  });
});
