import "./index.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AddCompany from "./pages/AddCompany";
import Companies from "./App";
import Container from "./components/commons/Container";
import Footer from "./components/commons/Footer";
import Header from "./components/commons/Header";
import React from "react";
import { render } from "react-dom";

const routing = (
  <Router>
    <Container>
      <Header />
      <Switch>
        <Route exact path="/" component={Companies} />
        <Route exact path="/addCompany" component={AddCompany} />
      </Switch>
      <Footer />
    </Container>
  </Router>
);

render(routing, document.getElementById("root"));
