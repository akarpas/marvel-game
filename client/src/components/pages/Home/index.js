import React from 'react';
import Heroes from '../../../../data/heroes';
import Layout from '../../organisms/Layout';
import style from './index.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroesSelected: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, hero) {
    e.preventDefault();
    const { heroesSelected } = this.state;
    const index = heroesSelected.indexOf(hero);
    if (index > -1) {
      heroesSelected.splice(index, 1);
      this.setState({ heroesSelected });
    } else if (heroesSelected.length < 8) {
      heroesSelected.push(hero);
      this.setState({ heroesSelected });
    }
  }

  render() {
    const { heroesSelected } = this.state;
    const allHeroesSelected = heroesSelected.length === 8;

    return (
      <Layout>
        <div className={style.content}>
          <h3 className={style.description}> A fun memory game with your favorite Marvel superheroes! </h3>
          <h2 className={style.title}>Pick your 8 Heroes:</h2>
          <div className={style.options}>
            {Heroes.map((hero) => {
              const isHeroSelected = heroesSelected.indexOf(hero) !== -1;
              return (
                <button
                  type="button"
                  onClick={e => this.handleClick(e, hero)}
                  className={isHeroSelected ? style.buttonSelected : style.button}
                  key={hero}
                  id={hero}
                >
                  {hero}
                </button>
              );
            })}
          </div>
          <button id="shuffle" className={style.actionButton} type="button">Shuffle!</button>
          <button id="play" className={style.actionButton} type="button" disabled={!allHeroesSelected}>Play!</button>
        </div>
      </Layout>
    );
  }
}

export default Home;
