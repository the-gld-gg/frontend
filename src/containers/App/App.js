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
import RegisterSuccess from "./../../pages/RegisterSuccess/RegisterSuccess"
import Login from "./../../pages/Login/Login"
import Forgot from "./../../pages/Forgot/Forgot"
import Reset from "./../../pages/Reset/Reset"
import "./base.min.css"


const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage && localStorage.getItem('user') ? (
          children
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

const App = ({ children }) => (
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
        <PrivateRoute exact path="/private-route">
          Test for PrivateRoute
        </PrivateRoute>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App