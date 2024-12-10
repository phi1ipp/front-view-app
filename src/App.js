import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom';
import Login from './components/Login.tsx';
import Dashboard from './components/Dashboard.tsx';

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />
    </Routes>
  </BrowserRouter>
  );
}

export default App;