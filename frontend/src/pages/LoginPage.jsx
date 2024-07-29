import React from 'react';
import {
  Container, Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import loginImg from '../assets/login.jpg';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
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
                      autoComplete="username"
                      placeholder="Ваш ник"
                      required
                      onChange={formik.handleChange}
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
                      autoComplete="current-password"
                      placeholder="Пароль"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
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
