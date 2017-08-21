import React from 'react';
import PlayerPreview from './PlayerPreview.js';
import queryString from 'query-string';
import api from '../utils/api.js';
import {Link} from 'react-router-dom';
import Loading from './Loading.js'

const Player = (props) => {
  const info = props.profile;
  console.log(props);
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <PlayerPreview avatar={info.avatar_url} username={info.login}>
        {info.name && <li>Name: {info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </PlayerPreview>
    </div>
  );
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: '',
      loser: '',
      loading: true,
      error: '',
      tie: false
    }
  }

  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(players => {
      players === null
      ? this.setState(() => ({
          error: 'Looks like there was an error. Check that both users exist on Github.',
          loading: false
        }))
      : this.setState(() => {
          const newState = {
            winner: players[0],
            loser: players[1],
            loading: false
          }
          newState.tie = players[0].score === players[1].score ? true : false;
          return newState;
        });
    });
  }

  render () {
    const error = this.state.error;
    const loading = this.state.loading;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const tie = this.state.tie;

    if(loading === true) {
      return <Loading></Loading>;
    }

    if(error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      )
    }

    return (
      <div>
        {tie && <h2 className="text-center">This is a tie</h2>}
        <div className="row">
          <Player
            label={res === true ? '' : "Winner"}
            score={winner.score}
            profile={winner.profile}/>
          <Player
            label={res === true ? '' : "Loser"}
            score={loser.score}
            profile={loser.profile}/>
        </div>
      </div>
    )

  }
}

export default Results;
