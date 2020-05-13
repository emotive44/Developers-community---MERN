import React, { useEffect } from 'react';
import './ProfileGithubRepos.css';

import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';

import Spinner from '../common/Spinner';


const ProfileGithubRepos = ({ repos, username, getGithubRepos }) => {
  
  useEffect(() => {
    getGithubRepos(username);
  }, []);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github" /> Github Repos
      </h2>
      {repos === null && <Spinner />}
      {repos.map(repo => (
        <div className="repo bg-white p-1 my-1" key={repo.id}>
          <div>
            <h4>
              <a href={repo.html_url} target="_blank"> {repo.name}</a>
            </h4>
            <p>Created at: {repo.created_at.split('T')[0]}</p>
            <p>Usaged language: {repo.language}</p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary flex">Stars: <span>{repo.stargazers_count}</span></li>
              <li className="badge badge-dark flex">Watchers: {repo.watchers}</li>
              <li className="badge badge-light flex">Forks: <span>{repo.forks}</span></li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithubRepos);
