import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import getRoute from '../routes';
import actions from '../store/slices/actions';
import { loginSchema } from '../validation';

const initialValues = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    usernameRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
      formik.setSubmitting(true);
      try {
        const response = await axios.post(getRoute.loginPath(), { username, password });
        dispatch(actions.setCredentials(response.data));
        const { from } = location.state;
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.code === 'ERR_NETWORK') {
          toast.error(t('notifications.connectionError'));
        } else if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          usernameRef.current.select();
        }
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('login.title')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          type="text"
          name="username"
          id="username"
          ref={usernameRef}
          isInvalid={authFailed}
          autoComplete="username"
          placeholder={t('login.form.username')}
          required
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <Form.Label htmlFor="username">{t('login.form.username')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          name="password"
          id="password"
          isInvalid={authFailed}
          autoComplete="current-password"
          placeholder={t('login.form.password')}
          required
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Form.Label htmlFor="password">{t('login.form.password')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {t('login.invalidUsernameOrPW')}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        type="submit"
        className="w-100"
        variant="outline-primary"
        disabled={formik.isSubmitting}
      >
        {t('login.submit')}
      </Button>
    </Form>
  );
};

export default LoginForm;
