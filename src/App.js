import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { UserRoute } from "./context/privateRoute";
import { userContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";

import Landing from "./pages/Landing";

import Home from "./pages/user/Home";
import ActivityDetails from "./pages/user/ActivityDetails";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  const [state, dispatch] = useContext(userContext);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");
        if (res.data.data.user.isAdmin) {
          dispatch({
            type: "LOGIN_ADMIN",
            payload: res.data.data.user,
          });
        }
        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };
    loadUser();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <UserRoute exact path="/Home" component={Home} />
        <UserRoute
          exact
          path="/ActivityDetails/:id"
          component={ActivityDetails}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
