import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store';
import { useDeleteChannelMutation } from '../../services';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const { modalIsOpened, modalType, channelId } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const show = modalIsOpened && modalType === 'removeChannel';
  const handleHide = () => dispatch(actions.closeModal());
  const [removeChannel] = useDeleteChannelMutation();
  const handleRemove = () => removeChannel(channelId);

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRemove}>
          <Form.Group>
            <p className="lead">{t('modals.areYouSure')}</p>
            <div className="d-flex justify-content-end">
              <Button onClick={handleHide} variant="secondary" className="me-2">{t('modals.cancel')}</Button>
              <Button variant="danger" type="submit">{t('modals.remove')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
