import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/styles.css';
import AppointmentUI from './components/AppointmentUI'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppointmentUI/>} />
      </Routes>
    </Router>
  );
}

export default App;
