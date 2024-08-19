import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import Header from './Header';
import { LoginPage, PageNotFound, PrivatePage } from '../pages/index';
import store from '../services/store';

const PrivateRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    authState.token
      ? children
      : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <PrivatePage />
                </PrivateRoute>
              )}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  </div>
);

export default App;
