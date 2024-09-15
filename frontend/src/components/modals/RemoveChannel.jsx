import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteChannelMutation } from '../../services';
import actions from '../../store/slices/actions';

const RemoveChannel = () => {
  const { isOpened, channelId } = useSelector((state) => state.ui.modals);
  const dispatch = useDispatch();
  const handleHide = () => dispatch(actions.closeModal());
  const { t } = useTranslation();
  const [removeChannel] = useDeleteChannelMutation();
  const handleRemove = (e) => {
    e.preventDefault();
    removeChannel(channelId);
    handleHide();
  };

  return (
    <Modal show={isOpened} onHide={handleHide}>
      <Modal.Header closeButton={handleHide}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleRemove(e)}>
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
