import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container, Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import getRoute from '../http/routes';
import loginImg from '../assets/login.jpg';
import { setCredentials } from '../store/slices/authSlice';

const setToken = (data) => {
  localStorage.setItem('userId', JSON.stringify(data));
};

const LoginPage = () => {
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
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(getRoute.loginPath(), values);
        setToken(response.data);
        dispatch(setCredentials(response.data));
        redirect();
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          usernameRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <Container fluid className="h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img alt="login" className="rounded-circle" src={loginImg} />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <FloatingLabel label="Ваш ник">
                    <Form.Control
                      type="text"
                      name="username"
                      id="username"
                      ref={usernameRef}
                      isInvalid={authFailed}
                      autoComplete="username"
                      placeholder="Ваш ник"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <FloatingLabel label="Пароль">
                    <Form.Control
                      type="password"
                      name="password"
                      id="password"
                      isInvalid={authFailed}
                      autoComplete="current-password"
                      placeholder="Пароль"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      Неверные имя пользователя или пароль
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button type="submit" className="w-100 mb-3" variant="outline-primary">Войти</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </Container>
  );
};
export default LoginPage;
