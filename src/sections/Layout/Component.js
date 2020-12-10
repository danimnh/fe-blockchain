import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";

import Content from "sections/Content";
import Copyright from "sections/Copyright";
import Navigation from "sections/Navigation";
import Notifications from "sections/Notifications";

import useStyles from "./styles";
const Layout = () => {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const loggedInUser = localStorage.getItem("user");

    setLoggedIn(loggedIn);
    // setUser(loggedInUser);

    console.log("useEffect is called");
    console.log(loggedInUser);
    setUser(loggedInUser);
    // if (loggedInUser) {
    //   const foundUser = JSON.parse(loggedInUser);
    // setUser(foundUser);
    // setLoggedIn(true);
    // }
  }, []);
  return (
    <>
      <Notifications />
      {isLoggedIn && (
        <Navigation
          handleLogout={() => {
            setLoggedIn(false);
            setUser("");
            localStorage.removeItem("user");
            localStorage.removeItem("isLoggedIn");
          }}
        />
      )}
      <Box component="main" className={classes.wrapper}>
        <Box className={classes.spacer} />
        <Box className={classes.content}>
          <Content
            user={user}
            handleLogin={(user) => {
              setLoggedIn(true);
              setUser(user);
              console.log("handleLogin");
              console.log(user);
              localStorage.setItem("isLoggedIn", true);
            }}
            setSubmitUser-
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
};

export default Layout;
