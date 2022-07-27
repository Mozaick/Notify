// import logo from './logo.svg';
// import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MenuBar from './components/MenuBar';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
