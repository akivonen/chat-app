import React from 'react';
import { useSelector } from 'react-redux';
import getModal from '.';

const ChannelModal = () => {
  const type = useSelector((state) => state.ui.modals.type);
  const CurrentModal = getModal(type);

  return (
    CurrentModal && <CurrentModal />
  );
};

export default ChannelModal;
