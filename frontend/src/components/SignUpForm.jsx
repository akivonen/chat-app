import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import actions from '../store/slices/actions';
import { signUpSchema } from '../validation';
import getRoute from '../routes';

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const { t } = useTranslation();
  const [signUpFailed, setSignUpfailed] = useState(false);
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async ({ username, password }) => {
      setSignUpfailed(false);
      formik.setSubmitting(true);
      try {
        const response = await axios.post(getRoute.singUpPath(), { username, password });
        dispatch(actions.setCredentials(response.data));
        const { from } = location.state || { from: { pathname: getRoute.chatPagePath() } };
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.code === 'ERR_NETWORK') {
          toast.error(t('notifications.connectionError'));
        } else if (err.isAxiosError && err.response.status === 409) {
          setSignUpfailed(true);
          usernameRef.current.select();
        }
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <Form
      className="w-50"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('signup.title')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          type="text"
          name="username"
          id="username"
          ref={usernameRef}
          autoComplete="username"
          placeholder={t('signup.form.username')}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={(formik.touched.username && formik.errors.username)
            || signUpFailed}
        />
        <Form.Label htmlFor="username">{t('signup.form.username')}</Form.Label>
        <Form.Control.Feedback type="invalid" className="invalid-tooltip">
          {t(formik.errors.username)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          placeholder={t('signup.form.password')}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={(formik.touched.password && formik.errors.password)
            || signUpFailed}
        />
        <Form.Label htmlFor="password">{t('signup.form.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" className="invalid-tooltip">
          {t(formik.errors.password)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          autoComplete="new-password"
          placeholder={t('signup.form.confirmPassword')}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          isInvalid={(formik.touched.confirmPassword && formik.errors.confirmPassword)
            || signUpFailed}
        />
        <Form.Label htmlFor="confirmPassword">{t('signup.form.confirmPassword')}</Form.Label>
        <Form.Control.Feedback type="invalid" className="invalid-tooltip">
          {t(formik.errors.confirmPassword) || t('signup.form.userAlreadyExists')}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        type="submit"
        className="w-100"
        variant="outline-primary"
        disabled={formik.isSubmitting}
      >
        {t('signup.form.submitBtn')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
