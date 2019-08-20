import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Login from './components/login/login.js';
import Details from './components/details/details.js';

function App() {
  return (
    <BrowserRouter>      
      <Switch>      
        <Route path="/" component={Login} />   
        <Route path="/details" component={Details} />      
        {/* <Redirect to="/login"  /> */}
      </Switch>        
    </BrowserRouter>    
  );
}


export default App;