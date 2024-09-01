import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/index';

const Channel = ({ channel, isActive }) => {
  const { name, id } = channel;
  const dispatch = useDispatch();
  const handleChangeChannel = () => (
    dispatch(actions.setActiveChannel({ id }))
  );
  return (
    <li className="nav-item w-100">
      <Button
        onClick={handleChangeChannel}
        variant={isActive ? 'secondary' : 'light'}
        type="button"
        className="w-100 rounded-0 text-start"
      >
        <span className="me-1">#</span>
        {name}
      </Button>
    </li>
  );
};

export default Channel;
