import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import customTheme from './../../configs/customTheme'
import Home from './../../pages/Home/Home'
import Register from './../../pages/Register/Register'
import About from './../../pages/About/About'
import './base.min.css'

const App = ({
  children,
}) => (
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
      </Switch>
    </Router>
  </ThemeProvider>
)

export default App