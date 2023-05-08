import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Nav from './components/Nav';
import Manufacturers from './components/manufacturers';
import ManufacturerRoute from './components/ManufacturerRoute';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manufacturers" element={<Manufacturers />} />
        <Route path="/manufacturers/:id" element={<ManufacturerRoute />} />
      </Routes>
    </>
  );
}

export default App;
