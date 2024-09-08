import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Channels from '../components/chat/Channels.jsx';
import Messages from '../components/chat/Messages.jsx';
import AddChannel from '../components/modals/AddChannel.jsx';
import RemoveChannel from '../components/modals/RemoveChannel.jsx';
import RenameChannel from '../components/modals/RenameChannel.jsx';

const ChatPage = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Channels />
      <Messages />
      <AddChannel />
      <RemoveChannel />
      <RenameChannel />
    </Row>
  </Container>
);

export default ChatPage;
