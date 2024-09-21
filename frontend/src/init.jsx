import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App';
import resources from './locales/index.js';
import store from './store/index';

const rollbarConfig = {
  accessToken: 'c01132175b194df485745d94d6433c54',
  environment: 'testenv',
};
function TestError() {
  const a = null;
  return a.hello();
}

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <RollbarProvider rollbarConfig={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </BrowserRouter>
        </Provider>
        <TestError />
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
