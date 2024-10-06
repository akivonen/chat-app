import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App';
import resources from './locales/index.js';
import store from './store/index';
import rollbarConfig from './rollbarConfig.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
