import { Spinner as SpinnerBS } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Spinner = () => {
  const { t } = useTranslation();

  return (
    <SpinnerBS variant="primary" animation="border" role="status">
      <span className="visually-hidden">
        {`${t('status.loading')}...`}
      </span>
    </SpinnerBS>
  );
};

export default Spinner;
