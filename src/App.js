import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/login/login.js';
import Details from './components/details/details.js';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />   
        <Route exact path="/details/:_id?" component={Details} />      
        <Route exact path="/dashboard" component={Dashboard} />   
      </Switch>
    </div>
  </BrowserRouter>
  );
}


export default App;