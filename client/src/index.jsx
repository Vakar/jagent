import "./index.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";

import AddVacancy from "./pages/AddVacancy";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Provider } from "react-redux";
import React from "react";
import SystemMessage from "./containers/SystemMassage";
import Vacancies from "./pages/Vacancies";
import reducer from "./reducers";
import { render } from "react-dom";
import thunk from "redux-thunk";

const middleWares = [thunk];
const store = createStore(reducer, applyMiddleware(...middleWares));

const routing = (
  <Provider store={store}>
    <Router>
      <Container>
        <Header />
        <Switch>
          <Route exact path="/index.html" component={Vacancies} />
          <Route exact path="/addVacancy" component={AddVacancy} />
        </Switch>
        <SystemMessage />
        <Footer />
      </Container>
    </Router>
  </Provider>
);

render(routing, document.getElementById("root"));
