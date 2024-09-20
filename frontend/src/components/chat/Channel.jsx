import React from 'react';
import {
  Button, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import actions from '../../store/slices/actions';

const ChannelButton = ({ name, handleChangeChannel, isActiveChannel }) => (
  <Button
    onClick={handleChangeChannel}
    variant={isActiveChannel ? 'secondary' : 'light'}
    type="button"
    className="w-100 rounded-0 text-start text-truncate"
  >
    <span className="me-1"># </span>
    {name}
  </Button>
);

const Channel = ({ channel }) => {
  const { t } = useTranslation();
  const { name, id, removable } = channel;
  const activeChannelId = useSelector((state) => state.ui.channels.activeChannelId);
  const isActiveChannel = activeChannelId === id;
  const dispatch = useDispatch();
  const handleChangeChannel = () => (
    dispatch(actions.setActiveChannel({ id }))
  );
  const openRemoveChannelModal = () => (
    dispatch(actions.openModal({ type: 'remove', id })));
  const openRenameChannelModal = () => (
    dispatch(actions.openModal({ type: 'rename', id })));
  return (
    <Nav.Item className="w-100" as="li">
      {
        removable
          ? (
            <Dropdown className="d-flex" as={ButtonGroup}>
              <ChannelButton
                name={name}
                handleChangeChannel={handleChangeChannel}
                isActiveChannel={isActiveChannel}
              />
              <Dropdown.Toggle variant={id === isActiveChannel ? 'secondary' : 'light'} className="flex-grow-0 dropdown-toggle-split">
                <span className="visually-hidden">{t('channels.channelControl')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={openRemoveChannelModal}>{t('channels.remove')}</Dropdown.Item>
                <Dropdown.Item onClick={openRenameChannelModal}>{t('channels.rename')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
          : (
            <ChannelButton
              name={name}
              handleChangeChannel={handleChangeChannel}
              isActiveChannel={isActiveChannel}
            />
          )
      }
    </Nav.Item>
  );
};

export default Channel;
