import React, { useEffect } from "react";
import axios from "axios";

import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";

import Content from "sections/Content";
import Copyright from "sections/Copyright";
import Navigation from "sections/Navigation";
import Notifications from "sections/Notifications";

import useStyles from "./styles";
const Layout = () => {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = React.useState(true);
  const [user, setUser] = React.useState();
  const history = useHistory();
  useEffect(() => {}, []);
  return (
    <>
      <Notifications />
      {isLoggedIn && (
        <Navigation
          handleLogout={() => {
            setLoggedIn(false);
            setUser("");
            axios
              .get("logout", user)
              .then((res) => {
                console.log(res.data);
                alert(JSON.stringify(res.data.message));
                history.push("/");
                localStorage.removeItem("token");
              })
              .catch((err) => {
                alert(err);
                history.replace("/");
              });

            history.replace("/");
          }}
        />
      )}
      <Box component="main" className={classes.wrapper}>
        <Box className={classes.spacer} />
        <Box className={classes.content}>
          <Content
            user={user}
            handleLogin={(user) => {
              axios
                .post("login", user)
                .then((res) => {
                  console.log(res.data);
                  // alert("Berhasil Login!");
                  history.push("/");
                  localStorage.setItem("token", res.data.token);
                })
                .catch((err) => {
                  alert(err);
                  history.replace("/");
                });
              // setLoggedIn(true);
              // setUser(user);
              // console.log("handleLogin");
              // console.log(user);
              // localStorage.setItem("isLoggedIn", true);
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
