import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.js';
import LiveLocation from './Pages/LiveLocation.js';
import RootLayout from './Layouts/RootLayout.js';
import TimeTable from './Pages/TimeTable.js';
import { FetchAllContextProvider } from './Context/fetchAllContext.js';
import { SocketContextProvider } from './Context/socketContext.js';
function App() {
  return (
    <>
      <SocketContextProvider>
        <FetchAllContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<RootLayout />}>
                <Route element={<Home />} index />
                <Route element={<LiveLocation />} path='/livelocation' />
                <Route element={<TimeTable />} path='/timetable' />
              </Route>
            </Routes>
          </BrowserRouter>
        </FetchAllContextProvider>
      </SocketContextProvider>
    </>
  );
}

export default App;
