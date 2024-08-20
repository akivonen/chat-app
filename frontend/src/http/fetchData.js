import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from './routes';

const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (headers) => {
    const response = await axios.get(routes.channelsPath(), { headers });
    return response.data;
  },
);
const fetchMessages = createAsyncThunk(
  'channels/fetchMessages',
  async (headers) => {
    const response = await axios.get(routes.channelsPath(), { headers });
    return response.data;
  },
);

export { fetchChannels, fetchMessages };
