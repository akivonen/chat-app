import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Card } from 'react-bootstrap';
import signupImg from '../assets/signup.jpg';
import SignUpForm from '../components/SignUpForm';

const SignUpPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img alt={t('signup.altSignupImg')} className="rounded-circle" src={signupImg} />
              </div>
              <SignUpForm />
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};
export default SignUpPage;
