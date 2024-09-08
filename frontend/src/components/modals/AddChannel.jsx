import React, { useEffect, useRef } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { actions } from '../../store';
import Spinner from '../Spinner';
import { useAddChannelMutation, useGetChannelsQuery } from '../../services';

const channelsSchema = (channelNames, t) => Yup.object({
  name: Yup.string()
    .trim()
    .required(t('validation.required'))
    .min(3, t('validation.minmax'))
    .max(20, t('validation.minmax'))
    .notOneOf(channelNames, t('validation.channelAlreadyExists')),
});

const AddChannel = () => {
  const { data: channels, isLoading: isGettingChannels } = useGetChannelsQuery();
  const channelNames = channels ? channels.map((c) => c.name) : [];
  const { t } = useTranslation();
  const { modalIsOpened, modalType } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const handleShow = modalIsOpened && modalType === 'addChannel';
  const handleHide = () => dispatch(actions.closeModal());
  const [addChannel, { error: addChannelError }] = useAddChannelMutation();
  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelsSchema(channelNames, t),
    onSubmit: async ({ name }) => {
      try {
        const newChannel = { name };
        addChannel(newChannel);
        formik.resetForm();
        handleHide();
      } catch (error) {
        console.log(error);
        console.log(addChannelError);
      }
    },
  });
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  if (isGettingChannels) {
    return <Spinner />;
  }
  return (
    <Modal show={handleShow} onHide={handleHide}>
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
    </Modal>
  );
};

export default AddChannel;
