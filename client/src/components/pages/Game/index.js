import React from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../../organisms/Layout';
import style from './index.scss';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location } = this.props;
    const { query } = location;
    const heroesSelected = query;

    return (
      <Layout>
        <div className={style.content}> {heroesSelected.map(hero => <div key={hero}>{hero}</div>)} </div>
      </Layout>
    );
  }
}

export default withRouter(Game);
