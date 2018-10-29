import React from 'react';
import style from './index.scss';

class GameStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
    };
  }

  render() {
    const { score } = this.props;
    const { timer } = this.state;

    return (
      <div className={style.stats}>
        <div className={style.timer}>Timer: {timer}</div>
        <div className={style.score}>Score: {score}</div>
      </div>
    );
  }
}

export default GameStats;
