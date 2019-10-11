import React from 'react';
import './App.css';
import Three from './components/three';
import Settings from './components/settings';

function App() {
  return (
    <div>
      <div className="splitWindow">
        <Three></Three>
        <Settings></Settings>
      </div>
    </div>
    );
  }

export default App;
