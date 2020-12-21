import React from "react";
import WelcomePage from "pages/Welcome";
import LoginPage from "pages/Login";
import SignUpPage from "pages/Sign_Up";
import ProductPage from "pages/Product_Page";
import ProductDetailPage from "pages/Product_Details_Page";
import AddTrx from "pages/Add_Trx_Page";
import TransactionList from "pages/TransactionList";
import PendingList from "pages/Pending_Trx_Page";
// import ConfirmedList from "pages/Confirmed_Trx_Page";

import Page from "components/Page";

import { Switch, Route } from "react-router-dom";

// import routes from "routes";

function Content({
  user,
  handleLogin,
  isLoggedIn,
  handleSignUp,
  refreshLayout,
}) {
  return (
    <Page>
      <Switch>
        {/* {routes.map((route) => (
          <Route {...route} key={route.path || "#"} handleLogin={handleLogin} />
        ))} */}
        <Route
          exact
          path="/"
          render={() => (
            <WelcomePage
              isLoggedIn={isLoggedIn}
              user={user}
              refreshLayout={refreshLayout}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => <LoginPage handleLogin={handleLogin} />}
        />
        <Route
          exact
          path="/daftar"
          render={() => <SignUpPage handleSignUp={handleSignUp} />}
        />
        <Route
          exact
          path="/product/:batchId"
          render={(props) => <ProductPage {...props} />}
        />
        <Route
          exact
          path="/product/:batchId/details/:trxID"
          render={(props) => <ProductDetailPage {...props} />}
        />
        <Route
          exact
          path="/create_transaction"
          render={() => <AddTrx refreshLayout={refreshLayout} user={user} />}
        />
        <Route
          exact
          path="/transactions/pending/:listType"
          render={(props) => (
            <PendingList refreshLayout={refreshLayout} user={user} {...props} />
          )}
        />
      </Switch>
    </Page>
  );
}

export default Content;
