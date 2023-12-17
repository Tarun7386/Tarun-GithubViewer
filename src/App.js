import "./styles.css";
import GitHubLogo from './github-logo.png';
import React, { useState, useEffect } from "react";

import RepoList from "./RepoList";
import SearchBar from "./SearchBar";

const App = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${searchTerm}`
        );
        if (response.ok) {
          const data = await response.json();
          setRepositories(data.items || []);
          setSelectedRepo(null); 
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setRepositories([]);
        setSelectedRepo(null);
      }
    };

    if (searchTerm) {
      fetchRepositories();
    } else {
      setRepositories([]);
      setSelectedRepo(null);
    }
  }, [searchTerm]);

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
  };

  return (
    <div className="App">
      <header >
        <img class="github-logo" src={GitHubLogo} alt="GitHub Logo" />
        <h1 class="Name"><i>GitHub Repository Viewer</i></h1>
      </header>
      <input
        type="text"
        placeholder="Search repositories"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="repo-list">
        
        {repositories.map((repo) => (
          <div
            key={repo.id}
            className="repository"
            onClick={() => handleRepoClick(repo)}
          >
            <h2>{repo.name}</h2>
          </div>
        ))}
      </div>
      {selectedRepo && (
        <div className="selected-repo-details">
          <h1>Repository information</h1>
          <h2><i>Name : {selectedRepo.name}</i></h2>
          <p>Owner: {selectedRepo.owner.login}</p>
          <p>Description: {selectedRepo.description}</p>
          <p>Stars: {selectedRepo.stargazers_count}</p>
          <p>Forks: {selectedRepo.forks_count}</p>
          <p>Language: {selectedRepo.language}</p>
        </div>
      )}
    </div>
  );
};

export default App;
