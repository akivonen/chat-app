/* eslint-disable no-param-reassign */
import axios from 'axios';
import { toast } from 'react-toastify';

const authFormHandler = async (
  { username, password },
  setAuthFailed,
  { setSubmitting },
  route,
  dispatch,
  usernameRef,
  t,
  setCredentials,
  redirect,
  errResponseCode,
) => {
  setAuthFailed(false);
  setSubmitting(true);
  try {
    const response = await axios.post(route, { username, password });
    dispatch(setCredentials(response.data));
    redirect();
  } catch (err) {
    if (err.isAxiosError && err.code === 'ERR_NETWORK') {
      toast.error(t('notifications.connectionError'));
    } else if (err.isAxiosError && err.response.status === errResponseCode) {
      setAuthFailed(true);
      usernameRef.current.select();
    }
  } finally {
    setSubmitting(false);
  }
};

export default authFormHandler;
