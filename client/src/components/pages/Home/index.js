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
    return (
      <Layout>
        <div className={style.content}>
          <h3 className={style.description}> A fun memory game with your favorite Marvel superheroes! </h3>
          <h2 className={style.title}>Pick your 8 Heroes:</h2>
          <div className={style.options}>
            {Heroes.map(hero => (
              <button
                type="button"
                onClick={e => this.handleClick(e, hero)}
                className={heroesSelected.indexOf(hero) !== -1 ? style.buttonSelected : style.button}
                key={hero}
                id={hero}
              >
                {hero}
              </button>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
