import channelsApi from './channelsApi';
import messagesApi from './messagesApi';

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useDeleteChannelMutation,
  useUpdateChannelMutation,
} = channelsApi;

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;

export default {
  channelsApi,
  messagesApi,
};
