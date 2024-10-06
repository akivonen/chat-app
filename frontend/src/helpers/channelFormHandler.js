/* eslint-disable no-param-reassign */
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';

const channelFormHandler = async (
  { name },
  { setSubmitting, setFieldError, resetForm },
  channelNames,
  mutation,
  handleHide,
  t,
  notification,
  selectedChannel = null,
) => {
  setSubmitting = true;
  const filteredName = leoProfanity.clean(name);
  if (channelNames.includes(filteredName)) {
    setFieldError('name', t('validation.channelAlreadyExists'));
    setSubmitting = false;
    return;
  }
  try {
    await mutation({ ...selectedChannel, name: filteredName }).unwrap();
    resetForm();
    handleHide();
    toast.success(t(notification));
  } catch (err) {
    if (err.status === 'FETCH_ERROR') {
      toast.error(t('notifications.connectionError'));
      return;
    }
    toast.error(err.status);
  } finally {
    // eslint-disable-next-line no-unused-vars
    setSubmitting = false;
  }
};

export default channelFormHandler;
