import React from 'react';
import pageNotFoundImg from '../assets/404.svg';

const PageNotFound = () => (
  <div className="text-center">
    <img alt="Страница не найдена" className="img-fluid w-25" src={pageNotFoundImg} />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      <a href="/">на главную страницу</a>
    </p>
  </div>
);

export default PageNotFound;
