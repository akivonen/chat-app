import React, { useEffect, useRef } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery, useUpdateChannelMutation } from '../../services';
import { actions } from '../../store';
import getChannelSchema from '../../validation';

const RenameChannel = () => {
  const isOpened = useSelector((state) => state.ui.modals.isOpened);
  const dispatch = useDispatch();
  const handleHide = () => dispatch(actions.closeModal());
  const channelId = useSelector((state) => state.ui.modals.channelId);
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels ? channels.map((c) => c.name) : [];
  const selectedChannel = channels ? channels.find(({ id }) => id === channelId) : null;
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [renameChannel] = useUpdateChannelMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedChannel ? selectedChannel.name : '',
    },
    validationSchema: getChannelSchema(channelNames),
    onSubmit: async ({ name }) => {
      try {
        const renamedChannel = { ...selectedChannel, name };
        renameChannel(renamedChannel);
        handleHide();
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  return (
    <Modal show={isOpened} onHide={handleHide}>
      <Modal.Header closeButton={handleHide}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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

export default RenameChannel;
