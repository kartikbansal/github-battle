import React from 'react';

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Loading'
    }
  }

  componentDidMount() {
    const stopper = this.state.text + '...';
    this.timerID = setInterval(() => {
      this.state.text === stopper
      ? this.setState((prevState) => ({
          text: 'Loading'
        }))
      : this.setState((prevState) => ({
          text: prevState.text.concat('.')
        }));
    }, 230);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render () {
    return (
      <div>
        <p className="text-center f-s-35">{this.state.text}</p>
      </div>
    )
  }
}

export default Loading;
