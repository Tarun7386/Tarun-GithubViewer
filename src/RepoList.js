import React from "react";
import Repository from "./Repository";

const RepoList = ({ repositories }) => {
  return (
    <div className="repo-list">
      {repositories.map((repo) => (
        <Repository key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default RepoList;
