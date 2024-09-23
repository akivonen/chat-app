import React from 'react';
import { useTranslation } from 'react-i18next';
import pageNotFoundImg from '../assets/404.svg';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img alt={t('pageNotFound.title')} className="img-fluid w-25" src={pageNotFoundImg} />
      <h1 className="h4 text-muted">{t('pageNotFound.title')}</h1>
      <p className="text-muted">
        {`${t('pageNotFound.message')} `}
        <a href="/">{t('pageNotFound.linkHome')}</a>
      </p>
    </div>
  );
};

export default PageNotFound;
