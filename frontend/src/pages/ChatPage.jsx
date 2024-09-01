import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Channels from '../components/chat/Channels.jsx';
import Messages from '../components/chat/Messages.jsx';

const ChatPage = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Channels />
      <Messages />
    </Row>
  </Container>
);

export default ChatPage;
