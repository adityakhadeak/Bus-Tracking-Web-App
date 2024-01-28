import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.js';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Home />} path='/' />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
