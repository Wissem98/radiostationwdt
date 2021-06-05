import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Home from './Station/Station';


function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/"/>    

      </Router>
    </div>
  );
}

export default App;
