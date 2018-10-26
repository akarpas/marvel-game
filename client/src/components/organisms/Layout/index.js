import React from 'react';
import { withRouter } from 'react-router-dom';

import style from './index.scss';

const Layout = ({ children }) => (
  <div className={style.container}>
    <header className={style.header}>Header</header>
    <div className={style.content}>
      {children}
    </div>
    <footer className={style.footer}>Footer</footer>
  </div>
);

export default withRouter(Layout);
