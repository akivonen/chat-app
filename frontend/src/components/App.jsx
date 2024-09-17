import {
  Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import {
  LoginPage, PageNotFound, ChatPage, SignUpPage,
} from '../pages/index';
import Spinner from './Spinner';

const PrivateRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const location = useLocation();
  if (authState === undefined) {
    return <Spinner />;
  }

  return (
    authState.token
      ? children
      : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
    <ToastContainer position="top-right" />
  </div>
);

export default App;
