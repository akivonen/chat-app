import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import getRoute from '../routes';

import actions from '../store/slices/actions';
import { loginSchema } from '../validation';

const LoginForm = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  const redirect = () => {
    const { from } = location.state;
    navigate(from);
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
      formik.setSubmitting(true);
      try {
        const response = await axios.post(getRoute.loginPath(), { username, password });
        dispatch(actions.setCredentials(response.data));
        redirect();
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          usernameRef.current.select();
          return;
        }
        throw err;
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
        <FloatingLabel label={t('login.form.username')}>
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
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <FloatingLabel label={t('login.form.password')}>
          <Form.Control
            type="password"
            name="password"
            id="password"
            isInvalid={authFailed}
            autoComplete="current-password"
            placeholder={t('login.form.password')}
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <Form.Control.Feedback type="invalid">
            {t('login.invalidUsernameOrPW')}
          </Form.Control.Feedback>
        </FloatingLabel>
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
