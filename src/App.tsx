import "./App.css";
import Generator from "./Pages/Generator";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import NavBar from "./Components/NavBar";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Dashboard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Profile from "./Pages/Profile";

function App() {
  const auth = getAuth();
  const [signedIn, setSignedIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(!!user);
    }
  });

  return (
    <>
      <NavBar signedIn={signedIn} />
      <Router>
        <Switch>
          {signedIn ? (
            <>
              <Route path="/profile">
                <Profile />
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
            </>
          ) : (
            <>
              <Route path="/forgot-password">
                <ForgotPassword />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <LandingPage signedIn={signedIn} />
              </Route>
            </>
          )}
        </Switch>
      </Router>
      {signedIn ? <h1>Logged in</h1> : <h1>Logged out</h1>}
    </>
  );
}

export default App;
