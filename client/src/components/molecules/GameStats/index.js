import React from 'react';
import style from './index.scss';

class GameStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 50,
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  tick() {
    const { time } = this.state;
    const { handleEndTime, updateTime, gameDone } = this.props;
    if (time !== 0) {
      this.setState({ time: time - 1 });
      updateTime(time);
    }
    if (time === 0 || gameDone) {
      const remainingTime = time;
      clearInterval(this.timer);
      handleEndTime(true, remainingTime);
    }
  }

  render() {
    const { score } = this.props;
    const { time } = this.state;

    return (
      <div className={style.stats}>
        <div className={style.timer}>Timer: {time}</div>
        <div className={style.score}>Score: {score}</div>
      </div>
    );
  }
}

export default GameStats;
