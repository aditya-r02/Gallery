import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Navbar from './Pages/Navbar';
import PhotoPage from './Pages/PhotoPage';
import Upload from './Pages/Upload';
import { useState } from 'react';
import Loading from './Pages/Loading';

function App() {

  return (
    <div className='w-screen min-h-screen flex flex-col items-center bg-background h-fit'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/photo/:id' element={<PhotoPage />} />
        <Route path='/addPhoto' element={<Upload />} />
      </Routes>
    </div>
  );
}

export default App;
