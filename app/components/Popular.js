import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api.js';
import Loading from './Loading.js'

const SelectLanguage = (props) => {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <div>
      <ul className="languages">
        {languages.map((lang) => {
          return (
            <li
              onClick={() => props.onSelect(lang)}
              style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
              key={lang}>
              {lang}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

SelectLanguage.propTypes = {
  onSelect: PropTypes.func.isRequired
}

const RepoGrid = (props) => {
  return (
    <div>
      <ul className="repos">
        {props.repos.map((repo, index) => {
          return (
            <li key={repo.name} className="repo-item">
              <ul>
                <li className="repo-rank">#{index+1}</li>
                <li>
                  <img className="avatar"
                    src={repo.owner.avatar_url}
                    alt={`Avatar for ${repo.owner.login}`}
                  />
                </li>
                <li className="repo-name"><a href={repo.html_url}>{repo.name}</a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object)
}

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then(repos => {
        this.setState(() => ({
          repos: repos
        }));
      });
  }

  render () {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={(lang) => this.updateLanguage(lang)}
        />
        {!this.state.repos
          ? <Loading />
          : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

export default Popular;
