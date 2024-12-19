import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom';
import { LoginPage } from './components/Login/LoginPage.tsx';
import Home  from './components/Home.tsx';

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/" />}
      />
    </Routes>
  </BrowserRouter>
  );
}

export default App;