import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.js';
import Navbar from './Components/Navbar';
import LiveLocation from './Pages/LiveLocation.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<LiveLocation />} path='/livelocation' />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
