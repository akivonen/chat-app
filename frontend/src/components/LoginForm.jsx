import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import getRoute from '../routes';
import actions from '../store/slices/actions';
import { loginSchema } from '../validation';
import authFormHandler from '../helpers/authFormHandler';

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
  const redirect = () => {
    const { from } = location.state;
    navigate(from);
  };
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit:
    (values) => authFormHandler(
      values,
      setAuthFailed,
      formik,
      getRoute.loginPath(),
      dispatch,
      usernameRef,
      t,
      actions.setCredentials,
      redirect,
      '401',
    ),
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
