import React from 'react';
import { Link } from 'react-router-dom';
import style from './index.scss';

const GameOver = (props) => {
  const { finalScore, remainingTime, hasCompleted } = props;

  const calculateScore = (score, time, completed) => {
    if (completed) {
      return (score + (time * 30));
    }
    return score;
  };

  return (
    <div className={style.overlay}>
      <div className={style.scoreCard}>
        <div className={style.gameOver}>{hasCompleted ? 'CONGRATULATIONS!' : 'GAME OVER!'}</div>
        <div className={style.label}>Your Final Score: </div>
        <div className={style.score}>{calculateScore(finalScore, remainingTime, hasCompleted)}</div>
        <Link className={style.link} to="/">
          <button className={style.button} type="button">New Game</button>
        </Link>
      </div>
    </div>
  );
};

export default GameOver;
