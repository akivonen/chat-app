import React, { useEffect, useRef } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { actions } from '../../store';
import Spinner from '../Spinner';
import { useUpdateChannelMutation, useGetChannelsQuery } from '../../services';

const channelsSchema = (channelNames, t) => Yup.object({
  name: Yup.string()
    .trim()
    .required(t('validation.required'))
    .min(3, t('validation.minmax'))
    .max(20, t('validation.minmax'))
    .notOneOf(channelNames, t('validation.channelAlreadyExists')),
});

const RenameChannel = () => {
  const { data: channels, isLoading: isGettingChannels } = useGetChannelsQuery();
  const channelNames = channels ? channels.map((c) => c.name) : [];
  const { modalIsOpened, modalType, channelId } = useSelector((state) => state.ui);
  const selectedChannel = channels ? channels.find(({ id }) => id === channelId) : null;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const handleShow = modalIsOpened && modalType === 'renameChannel';
  const handleHide = () => dispatch(actions.closeModal());
  const [renameChannel, { error: addChannelError }] = useUpdateChannelMutation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedChannel ? selectedChannel.name : '',
    },
    validationSchema: channelsSchema(channelNames, t),
    onSubmit: async ({ name }) => {
      try {
        const renamedChannel = { ...selectedChannel, name };
        renameChannel(renamedChannel);
        handleHide();
      } catch (error) {
        console.log(error);
        console.log(addChannelError);
      }
    },
  });
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);
  if (isGettingChannels) {
    return <Spinner />;
  }

  return (
    <Modal show={handleShow} onHide={handleHide}>
      <Modal.Header closeButton={handleHide}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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
                {formik.errors.name}
              </Form.Control.Feedback>
              <div className="d-flex justify-content-end">
                <Button onClick={handleHide} variant="secondary" className="me-2">{t('modals.cancel')}</Button>
                <Button variant="primary" type="submit">{t('modals.send')}</Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  );
};

export default RenameChannel;
