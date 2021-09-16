import "./App.css";
import Generator from "./Pages/Generator";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import NavBar from "./Components/NavBar";
import { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Dashboard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Profile from "./Pages/Profile";

function ProtectedRoute(props: { children: React.ReactNode; path: string }) {
  if (localStorage.getItem("uid")) {
    return <Redirect to="/" />;
  } else {
    return <Route path={props.path}>{props.children}</Route>;
  }
}
function App() {
  const auth = getAuth();
  const [signedIn, setSignedIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(!!user);
    }
  });
  if (signedIn) {
    return (
      <>
        <NavBar signedIn={signedIn} />
        {signedIn}
        <Router>
          <Switch>
            <Route path="/profile">
              <Profile signedIn={signedIn} />
            </Route>
            <Route path="/design">
              <Generator />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/">
              <LandingPage signedIn={signedIn} />
            </Route>
            {/* <Redirect to="/" /> */}
          </Switch>
        </Router>
      </>
    );
  } else {
    return (
      <>
        <NavBar signedIn={signedIn} />
        {signedIn}
        <Router>
          <Switch>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <LandingPage signedIn={signedIn} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
