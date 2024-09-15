import { actions as authActions } from './authSlice';
import { actions as uiActions } from './uiSlice';

export default {
  ...authActions,
  ...uiActions,
};
