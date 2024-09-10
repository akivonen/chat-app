import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsPlusSquare } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import Channel from './Channel';
import { useGetChannelsQuery } from '../../services';
import { actions } from '../../store';

const Channels = () => {
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const openAddChannelModal = () => dispatch(actions.openModal({ type: 'add' }));

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <button onClick={openAddChannelModal} type="button" className="p-0 text-primary btn btn-group-vertical">
          <BsPlusSquare size="20" />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        { channels?.length > 0
        && channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
          />
        )) }
      </ul>
    </div>
  );
};

export default Channels;
