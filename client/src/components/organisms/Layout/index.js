import React from 'react';
import { withRouter } from 'react-router-dom';

import style from './index.scss';

const Layout = ({ children }) => (
  <div className={style.container}>
    <header className={style.header}>MARVEL SUPERHEROES</header>
    <div className={style.content}>
      {children}
    </div>
    <footer className={style.footer} />
  </div>
);

export default withRouter(Layout);
