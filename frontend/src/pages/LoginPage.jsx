import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Card } from 'react-bootstrap';
import loginImg from '../assets/login.jpg';
import LoginPageForm from '../components/LoginForm';
import getRoute from '../routes';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img alt="login" className="rounded-circle" src={loginImg} />
              </div>
              <LoginPageForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{`${t('login.noAccount')} `}</span>
                <a href={getRoute.singUpPath()}>{t('login.registration')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </Container>
  );
};
export default LoginPage;
