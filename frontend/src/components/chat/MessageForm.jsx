import React, { useEffect, useRef } from 'react';
import { BsArrowRightSquare } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useAddMessageMutation } from '../../services';
import { messageSchema } from '../../validation';

const MessageForm = ({ activeChannelId }) => {
  const { t } = useTranslation();
  const { username } = useSelector((state) => state.auth);
  const [addMessage] = useAddMessageMutation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: messageSchema,
    onSubmit: async ({ body }, { setSubmitting }) => {
      setSubmitting(true);
      const filteredMessage = leoProfanity.clean(body);
      const newMessage = {
        username,
        body: filteredMessage,
        channelId: activeChannelId,
      };
      try {
        await addMessage(newMessage).unwrap();
        formik.resetForm();
      } catch (err) {
        toast.error(t('notifications.connectionError'));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            onBlur={formik.handleBlur}
            autoFocus
            ref={inputRef}
            name="body"
            id="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            value={formik.values.body}
          />
          <Button
            variant="group-vertical"
            type="submit"
            disabled=""
            aria-label={t('message.send')}
          >
            <BsArrowRightSquare size="20" />
            <span className="visually-hidden">{t('messages.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
