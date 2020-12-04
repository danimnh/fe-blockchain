import React from "react";
import WelcomePage from "pages/Welcome";
import LoginPage from "pages/Login";
import Page from "components/Page";

import { Switch, Route } from "react-router-dom";

// import routes from "routes";

function Content({ user, handleLogin, isLoggedIn }) {
  return (
    <Page>
      <Switch>
        {/* {routes.map((route) => (
          <Route {...route} key={route.path || "#"} handleLogin={handleLogin} />
        ))} */}
        <Route
          exact
          path="/"
          render={() => <WelcomePage isLoggedIn={isLoggedIn} user={user} />}
        />
        <Route
          exact
          path="/login"
          render={() => <LoginPage handleLogin={handleLogin} />}
        />
      </Switch>
    </Page>
  );
}

export default Content;
