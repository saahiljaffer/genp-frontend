import "./App.css";
import Generator from "./Pages/Generator";
import Login from "./Pages/Login";
import NavBar from "./Components/NavBar";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Generator />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
