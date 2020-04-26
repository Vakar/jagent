import "./index.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Companies from "./App";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React from "react";
import ReactDOM from "react-dom";

const routing = (
  <Router>
    <Container>
      <Header />
      <Switch>
        <Route exact path="/" component={Companies} />
      </Switch>
      <Footer />
    </Container>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
