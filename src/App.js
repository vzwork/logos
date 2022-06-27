import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guide from './components/guide/Guide';
import Hub from './components/hub/Hub';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Guide />}/>
        <Route exact path='/hub' element={<Hub />}/>
      </Routes>
    </BrowserRouter>
  );
}
