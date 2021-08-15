import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Homepage} from "../../Pages";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Homepage></Homepage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
