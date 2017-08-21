import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview.js'

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
  }

  handleChange(event) {
    const val = event.target.value;
    this.setState(() => ({username: val}));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render() {
    return (
      <form className="column" onSubmit={e => this.handleSubmit(e)}>
        <label className="header">{this.props.label}</label>
        <input
          type="text"
          placeholder="github username"
          autoComplete="off"
          onChange={(evt) => this.handleChange(evt)}/>
        <button className="button" type='submit'>
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }
  }

  handleSubmit(id, username) {
    this.setState(() => {
      const newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] = 'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }

  handleReset(id) {
    this.setState(() => {
      const newState = {};
      newState[id + "Name"] = '';
      newState[id + "Image"] = null;
      return newState;
    });
  }

  render() {
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoImage = this.state.playerTwoImage;

    const match = this.props.match;

    return (
      <div>
        <div className="row">
          {playerOneImage !== null
            ? <PlayerPreview
                avatar={playerOneImage}
                username={playerOneName}>
                <button
                  className="reset"
                  onClick={() => this.handleReset('playerOne')}>
                  Reset
                </button>
              </PlayerPreview>
            : <PlayerInput
                label="Warrior One"
                onSubmit={(id, username) => this.handleSubmit(id, username)}
                id="playerOne"/>}
          {playerTwoImage !== null
            ? <PlayerPreview
                avatar={playerTwoImage}
                username={playerTwoName}>
                <button
                  className="reset"
                  onClick={() => this.handleReset('playerTwo')}>
                  Reset
                </button>
              </PlayerPreview>
            : <PlayerInput
                label="Warrior Two"
                onSubmit={(id, username) => this.handleSubmit(id, username)}
                id="playerTwo"/>}
        </div>
        {playerOneImage && playerTwoImage && playerOneName !== playerTwoName
          ? <Link
              className="button"
              to={{
                pathname: match.url + '/results',
                search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
              }}>
                Battle
            </Link>
          : playerOneImage && playerTwoImage && <p className="err-note">Please enter different warriors</p>}
      </div>
    );
  }
}

export default Battle;
