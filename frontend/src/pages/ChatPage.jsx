import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Channels from '../components/chat/Channels.jsx';
import Messages from '../components/chat/Messages.jsx';
import ChannelModal from '../components/modals/Modal.jsx';
import {
  useAddChannelMutation,
  useAddMessageMutation,
  useDeleteChannelMutation,
  useGetChannelsQuery,
  useGetMessagesQuery,
  useUpdateChannelMutation,
} from '../services/index.js';
import Spinner from '../components/Spinner.jsx';

const ChatPage = () => {
  const { isLoading: isGettingChannels } = useGetChannelsQuery();
  const { isLoading: isGettingMessages } = useGetMessagesQuery();
  const [{ isLoading: isAddingChannel }] = useAddChannelMutation();
  const [{ isLoading: isAddingMessages }] = useAddMessageMutation();
  const [{ isLoading: isRemovingChannel }] = useDeleteChannelMutation();
  const [{ isLoading: isRenamingChannel }] = useUpdateChannelMutation();

  const isLoading = [
    isGettingChannels,
    isGettingMessages,
    isAddingChannel,
    isRemovingChannel,
    isRenamingChannel,
    isAddingMessages].some(Boolean);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
      <ChannelModal />
    </>
  );
};

export default ChatPage;
