import React from 'react';
import CustomerList from './components/Customerlist';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";
import Appointments from './components/Appointments';
import Home from './components/Home';
import Training from './components/Training';
import Button from '@material-ui/core/Button';


function App() {
  return (

    <div className="App">
<AppBar position="static">
        <Toolbar>         
          <Typography variant="h6">
            Training scheduler and planner
          </Typography>
        </Toolbar>
      </AppBar>

      <BrowserRouter>
          <div>
            <div className="navbar">
              <div className="container">
                <Link to="home" className="redirects">
                <Button>Home</Button>
                </Link>{" "}
                <Link to="customers" className="redirects">
                <Button>Customers</Button>
                </Link>{" "}
                <Link to="trainings" className="redirects">
                  <Button>Trainings</Button>
                </Link>{" "}
                <Link to="calendar" className="redirects">
                <Button>Calendar</Button>
                </Link>{" "}
              </div>
            </div>
            <Switch>
              <Route path="/customers" component={CustomerList} />
              <Route path="/trainings" component={Training} />
              <Route path="/calendar" component={Appointments} />
              <Route path="/home" component={Home} />
              <Route path="" component={Home} />

              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
      

  );
}

export default App;
