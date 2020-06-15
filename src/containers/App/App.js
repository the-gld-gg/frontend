import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import customTheme from "./../../configs/customTheme"
import Home from "./../../pages/Home/Home"
import About from "./../../pages/About/About"
import Register from "./../../pages/Register/Register"
import RegisterJourney from "./../../pages/RegisterJourney/RegisterJourney"
import RegisterSuccess from "./../../pages/RegisterSuccess/RegisterSuccess"
import Profile from "./../../pages/Profile/Profile"
import Login from "./../../pages/Login/Login"
import Forgot from "./../../pages/Forgot/Forgot"
import Reset from "./../../pages/Reset/Reset"
import "./base.min.css"


const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        sessionStorage && sessionStorage.getItem('user') ? (
          React.cloneElement(children, { 
            user: JSON.parse(sessionStorage.getItem('user'))
          })
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const App = ({ children }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/register-journey">
            <RegisterJourney />
          </Route>
          <Route path="/register-success">
            <RegisterSuccess />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/forgot">
            <Forgot />
          </Route>
          <Route exact path="/reset">
            <Reset />
          </Route>
          <PrivateRoute exact path="/profile">
            <Profile />
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  )
};

export default App