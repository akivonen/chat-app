import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Message from './Message';
import MessageForm from './MessageForm';
import { useGetChannelsQuery, useGetMessagesQuery } from '../../services';
import Spinner from '../Spinner';

const Messages = () => {
  const { t } = useTranslation();
  const { data: channelsList } = useGetChannelsQuery();
  const { data: messageList } = useGetMessagesQuery();
  const activeChannelId = useSelector((state) => state.ui.channels.activeChannelId);
  const messagesContainer = useRef(null);
  const activeChannel = channelsList
    ?.find((c) => c.id === activeChannelId);
  const activeChannelMsgs = messageList
    ?.filter((m) => m.channelId === activeChannelId);

  useEffect(() => {
    messagesContainer.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChannelMsgs]);
  if (!activeChannel || !activeChannelMsgs) {
    return <Spinner />;
  }

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${activeChannel?.name}`}</b></p>
          <span className="text-muted">{t('messages.messages', { count: activeChannelMsgs.length || 0 })}</span>
        </div>
        <div ref={messagesContainer} id="messages-box" className="chat-messages overflow-auto px-5 ">
          { activeChannelMsgs.length > 0
            && activeChannelMsgs.map((m) => (
              <Message key={m.id} message={m} />
            )) }
        </div>
        <MessageForm activeChannelId={activeChannelId} />
      </div>
    </div>
  );
};

export default Messages;
