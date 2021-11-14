import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Parks, Activities } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <Parks />} />
          <Route path="/contact" exact component={() => <Activities />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
