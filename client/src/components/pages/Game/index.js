import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../../organisms/Layout';

import style from './index.scss';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allAvatars: ([
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/40/5274137e3e2cd.jpg', hero: 'Thanos' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg', hero: 'Captain America' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg', hero: 'Spider-man' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/d/50/50febb79985ee.jpg', hero: 'Daredevil' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/3/b0/5261a7e53f827.jpg', hero: 'Magneto' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/3/00/539a06a64b262.jpg', hero: 'Odin' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/40/526963dad214d.jpg', hero: 'Storm' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg', hero: 'Iron Man' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/40/5274137e3e2cd.jpg', hero: 'Thanos' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg', hero: 'Captain America' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg', hero: 'Spider-man' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/d/50/50febb79985ee.jpg', hero: 'Daredevil' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/3/b0/5261a7e53f827.jpg', hero: 'Magneto' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/3/00/539a06a64b262.jpg', hero: 'Odin' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/40/526963dad214d.jpg', hero: 'Storm' },
        { image: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg', hero: 'Iron Man' },
      ]),
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
    // TODO: change timeout to 4000 - 5000
    setTimeout(() => {
      this.setState({ hideAll: true, gameStarted: true });
    }, 1000);
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
    const { hideAll, firstCard, secondCard, revealedCards, score, allAvatars } = this.state;

    return (
      <Layout>
        <div className={style.cards}>
          {allAvatars && allAvatars.map((avatar, index) => {
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

export default withRouter(connect(null)(Game));
