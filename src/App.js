import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Parks, Activities } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/national-parks" exact component={() => <Home />} />
          <Route path="/national-parks/parks" exact component={() => <Parks />} />
          <Route path="/national-parks/activities" exact component={() => <Activities />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
