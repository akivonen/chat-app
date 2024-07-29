import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import { LoginPage, PageNotFound } from '../pages/index';

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);

export default App;
