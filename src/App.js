import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom';
import Login from './components/Login.tsx';
import Home from './components/Home.tsx';

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/" />}
      />
    </Routes>
  </BrowserRouter>
  );
}

export default App;