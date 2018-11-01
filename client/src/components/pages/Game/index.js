import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../../organisms/Layout';
import GameStats from '../../molecules/GameStats';
import GameOver from '../../molecules/GameOver';
import * as marvelActions from '../../../actions/marvel';
import style from './index.scss';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      gameFinished: false,
      hideAll: false,
      clicks: 0,
      firstCard: '',
      secondCard: '',
      revealedCards: [],
      score: 50,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    marvelActions.clearAvatars(dispatch);
  }

  componentDidMount() {
    const { location, dispatch, history, heroesSelected } = this.props;
    const { query } = location;
    const heroes = query || heroesSelected;
    if (heroes === undefined) {
      history.push('/');
    } else {
      marvelActions.fetchAvatars(dispatch, heroes);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { avatars, avatarsLoading } = nextProps;
    if (avatars.length === 16 && !avatarsLoading) {
      setTimeout(() => {
        this.setState({ hideAll: true, gameStarted: true });
      }, 4000);
    } else if (avatars.length === 0 && !avatarsLoading) {
      history.push('/');
    }
  }

  handleClick(e) {
    e.preventDefault();
    const { id } = e.target;
    const { clicks, firstCard, revealedCards, score, gameStarted } = this.state;

    if (!(id === '') && clicks < 2) {
      if (gameStarted) this.setState({ clicks: clicks + 1 });
      if (id && clicks < 2) {
        if (clicks === 0) this.setState({ firstCard: id });
        if (clicks === 1) this.setState({ secondCard: id });
      }
      if (firstCard) {
        if (firstCard.split('-')[0] === id.split('-')[0]) {
          revealedCards.push(firstCard);
          revealedCards.push(id);
          this.setState({ revealedCards, clicks: 0, firstCard: '', secondCard: '', score: score + 50 });
        } else {
          this.setState({ secondCard: id, score: score > 0 ? score - 10 : score });
          setTimeout(() => {
            this.setState({ clicks: 0, firstCard: '', secondCard: '' });
          }, 800);
        }
      }
    }
  }

  handleTime(done, remainingTime) {
    if (done) this.setState({ gameFinished: true, remainingTime }); // eslint-disable-line
  }

  updateTime(time) {
    this.setState({ time });
  }

  render() {
    const {
      hideAll,
      firstCard,
      secondCard,
      revealedCards,
      score,
      gameStarted,
      gameFinished,
      time,
    } = this.state;
    const { avatars, avatarsLoading } = this.props;
    const completed = revealedCards.length === 16;
    const remainingTime = completed && time;

    return (
      <Layout>
        <div>
          <div className={style.cards}>
            {avatarsLoading && <div className={style.loading}>Cards are being loaded...</div>}
            {avatars && avatars.map((avatar, index) => {
              const id = `${avatar.hero}-${index}`;
              const buttonKey = `${avatar.hero}${index}`;
              const showCard = hideAll && firstCard !== id && secondCard !== id;
              const cardFound = revealedCards.indexOf(id) !== -1;
              return (
                <button type="button" className={style.card} id={id} key={buttonKey} onClick={e => this.handleClick(e)}>
                  <img
                    style={showCard && !cardFound ? { visibility: 'hidden', opacity: 0 } : {}}
                    className={cardFound ? style.avatarFound : style.avatar}
                    src={avatar.image}
                    alt={avatar.hero}
                  />
                </button>
              );
            })}
          </div>
          {gameStarted
            && (
              <GameStats
                score={score}
                gameDone={completed}
                handleEndTime={this.handleTime}
                updateTime={this.updateTime}
              />)}
          {(gameFinished || completed)
            && <GameOver finalScore={score} remainingTime={remainingTime} hasCompleted={completed} />}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ marvel }) => ({ ...marvel });

export default withRouter(connect(mapStateToProps)(Game));
