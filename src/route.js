import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { BrowserRouter as Router, Route, Switch } 
from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import ProfileScreen from "./Screens/ProfileScreen";

const Routes = () => {
  const user = useSelector(selectUser);

  return (
    <Router>
      {!user ? (
        <LoginScreen />
      ) : (
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route exact path="/profile">
          <ProfileScreen/>
          </Route>
        </Switch>
      )}
    </Router>
  );
};
export default Routes;
