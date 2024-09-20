import React, { useEffect, useRef } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useAddChannelMutation, useGetChannelsQuery } from '../../services';
import actions from '../../store/slices/actions';
import { getChannelSchema } from '../../validation';

const AddChannel = () => {
  const isOpened = useSelector((state) => state.ui.modals.isOpened);
  const dispatch = useDispatch();
  const handleHide = () => dispatch(actions.closeModal());
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels ? channels.map((c) => c.name) : [];
  const { t } = useTranslation();
  const [addChannel] = useAddChannelMutation();
  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getChannelSchema(channelNames),
    onSubmit: async ({ name }) => {
      formik.setSubmitting = true;
      const filteredName = leoProfanity.clean(name);
      if (channelNames.includes(filteredName)) {
        formik.setFieldError('name', t('validation.channelAlreadyExists'));
        formik.setSubmitting = false;
        return;
      }
      try {
        await addChannel({ name: filteredName }).unwrap();
        formik.resetForm();
        handleHide();
        toast.success(t('notifications.channelCreated'));
      } catch (err) {
        if (err.status === 'FETCH_ERROR') {
          toast.error(t('notifications.connectionError'));
          return;
        }
        toast.error(err.status);
      } finally {
        formik.setSubmitting = false;
      }
    },
  });
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <Modal show={isOpened} onHide={handleHide}>
      <Modal.Header closeButton={handleHide}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              onChange={formik.handleChange}
              ref={inputRef}
              type="text"
              name="name"
              id="name"
              className="mb-2"
              required
              value={formik.values.name}
              isInvalid={formik.errors.name}
            />
            <Form.Label htmlFor="name" className="visually-hidden">
              {t('modals.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={handleHide} variant="secondary" className="me-2">{t('modals.cancel')}</Button>
              <Button variant="primary" type="submit">{t('modals.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
