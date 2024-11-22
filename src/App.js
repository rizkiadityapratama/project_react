import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Home';
import Dataguru from './Dataguru';
import Datasiswa from './Datasiswa';
import EditDataguru from './EditDataguru';
import Navbar from './Navbar';  
import TambahDataguru from './TambahDataguru';
import TambahDataSiswa from './TambahDatasiswa'
import EditDatasiswa from './EditDatasiswa';

function App() {
  return (
    <div className="App">
      <Navbar /> 
      <Routes>
        {/* Default Route */}
        {/* <Route path="/" element={<Navigate to="/Dashboard" />} />  */}

        {/* Main Routes */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Dataguru" element={<Dataguru />} />
        <Route path="/Datasiswa" element={<Datasiswa />} />
        <Route path="/EditDataguru/:id" element={<EditDataguru />} />
        <Route path="/TambahDataguru" element={<TambahDataguru />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/TambahDataSiswa" element={<TambahDataSiswa />} />
        <Route path="/EditDatasiswa/:id" element={<EditDatasiswa />} />
        <Route path="/" element={<Navigate to="/Home" />} />
      </Routes>
    </div>
  );
}

export default App;
