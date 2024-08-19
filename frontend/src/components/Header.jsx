import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const Header = () => (
  <Navbar expand="lg" bg="white" className="navbar-light shadow-sm">
    <Container>
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      <Button variant="primary" href="/">Выйти</Button>
    </Container>
  </Navbar>
);
export default Header;
