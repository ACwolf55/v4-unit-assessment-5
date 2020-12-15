import React from 'react';
import './App.css';
import routes from './routes'
import nav from './Components/Nav'


function App() {
  return (
    <div className='App'>
  <Nav/>
  {routes}
  </div>
  
  )
};

export default App;
