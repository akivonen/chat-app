import channelsApi from '../../services/channelsApi';
import socket from '../../socket';
import actions from '../slices/actions';

const deleteActiveChannelMiddleware = (store) => (next) => (action) => {
  if (channelsApi.endpoints.getChannels.matchFulfilled(action)) {
    const listener = ({ id }) => {
      const state = store.getState();
      const { activeChannelId, defaultChannelId } = state.ui.channels;
      if (activeChannelId === id) {
        store.dispatch(actions.setActiveChannel({ id: defaultChannelId }));
      }
    };
    socket.on('removeChannel', listener);
  }
  return next(action);
};

export default deleteActiveChannelMiddleware;
