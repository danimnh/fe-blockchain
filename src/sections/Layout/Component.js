import React from "react";

import Box from "@material-ui/core/Box";

import Content from "sections/Content";
import Copyright from "sections/Copyright";
import Navigation from "sections/Navigation";
import Notifications from "sections/Notifications";

import useStyles from "./styles";

function Layout() {
  const classes = useStyles();
  //debug appbar TO-DO : memoize user
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({ name: "" });
  return (
    <>
      <Notifications />
      {isLoggedIn && (
        <Navigation
          handleLogout={() => {
            setLoggedIn(false);
            setUser("");
          }}
        />
      )}
      <Box component="main" className={classes.wrapper}>
        <Box className={classes.spacer} />
        <Box className={classes.content}>
          <Content
            user={user}
            setUser={() => {
              setUser("Petani A");
            }}
            handleLogin={(user) => {
              setLoggedIn(true);
              setUser(user);
            }}
            isLoggedIn={isLoggedIn}
            handleSignUp={() => {
              console.log("handleSignUp is called");
            }}
          />
          <Copyright />
        </Box>
      </Box>
    </>
  );
}

export default Layout;
