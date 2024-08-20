import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getAuthHeader from '../utils/getAuthHeader';
import { fetchMessages, fetchChannels } from '../http/fetchData.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const header = getAuthHeader();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchMessages(header));
      dispatch(fetchChannels(header));
    };
    fetchData();
  }, [header, dispatch]);

  return (
    <p>{Object.hasOwn(header, 'Authorization') && 'content'}</p>
  );
};

export default ChatPage;
