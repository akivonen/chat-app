import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../store/slices/actions.js';

const Header = () => {
  const { t } = useTranslation();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = () => dispatch(actions.removeCredentials());

  return (
    <Navbar expand="lg" bg="white" className="navbar-light shadow-sm">
      <Container>
        <Navbar.Brand href="/">{t('navBar.title')}</Navbar.Brand>
        {authState.token
          && <Button onClick={logOut} variant="primary" href="/">{t('navBar.logout')}</Button>}
      </Container>
    </Navbar>
  );
};
export default Header;
