import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../../organisms/Layout';
import fetchAvatars from '../../../actions/marvel';

import style from './index.scss';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      hideAll: false,
      clicks: 0,
      firstCard: '',
      secondCard: '',
      revealedCards: [],
      score: 50,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // TODO: change timeout to 4000 - 5000 - only for dev purposes
    const { location, dispatch, history } = this.props;
    const { query } = location;
    const heroesSelected = query;
    if (heroesSelected === undefined) {
      history.push('/');
    } else {
      // TODO: use heroes selected for restarting game
      this.setState({ heroesSelected }); // eslint-disable-line
      fetchAvatars(dispatch, heroesSelected);
    }
    // TODO: Remove || only for dev purposes
    // || ['Thanos', 'Captain America', 'Spider-man', 'Daredevil', 'Magneto', 'Odin', 'Storm', 'Iron Man'];
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { avatars, avatarsLoading } = nextProps;
    if (avatars.length === 16 && !avatarsLoading) {
      setTimeout(() => {
        this.setState({ hideAll: true, gameStarted: true });
      }, 3000);
    } else if (avatars.length < 16 && !avatarsLoading) {
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
          }, 1000);
        }
      }
    }
  }

  render() {
    const { hideAll, firstCard, secondCard, revealedCards, score } = this.state;
    const { avatars } = this.props;

    return (
      <Layout>
        <div className={style.cards}>
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
        <div className={style.score}>{score}</div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ marvel }) => ({ ...marvel });

export default withRouter(connect(mapStateToProps)(Game));
