import "./index.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AddVacancy from "./pages/AddVacancy";
import Container from "./components/commons/Container";
import Footer from "./components/commons/Footer";
import Header from "./components/commons/Header";
import React from "react";
import Vacancies from "./App";
import { render } from "react-dom";

const routing = (
  <Router>
    <Container>
      <Header />
      <Switch>
        <Route exact path="/" component={Vacancies} />
        <Route exact path="/addVacancy" component={AddVacancy} />
      </Switch>
      <Footer />
    </Container>
  </Router>
);

render(routing, document.getElementById("root"));
