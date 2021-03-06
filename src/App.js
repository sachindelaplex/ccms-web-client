import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/login/login.js';
import Details from './components/details/details.js';
import Dashboard from './components/Dashboard/Dashboard';
import View from './components/ViewDetail/View';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />         
        <Route key="addDetails" exact path="/addDetails" component={Details} />   
        <Route key="details/:_id" exact path="/details/:_id" component={Details} />      
        <Route exact path="/dashboard" component={Dashboard} />  
        <Route exact path="/view/:_id" component={View} />  
      </Switch>
    </div>
  </BrowserRouter>
  );
}


export default App;