import React from 'react'

const PlayerPreview = (props) => {
  return (
    <div>
      <div className="column">
        <img className="avatar" src={props.avatar} alt={`Avatar of ${props.username}`}/>
        <h2 className="username">@{props.username}</h2>
        {props.children}
      </div>
    </div>
  );
}

export default PlayerPreview;
