import React, { useEffect } from "react";
import axios from "axios";

import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";

import Content from "sections/Content";
import Copyright from "sections/Copyright";
import Navigation from "sections/Navigation";
import Notifications from "sections/Notifications";

import useStyles from "./styles";
const Layout = () => {
  const localLoggedIn = localStorage.getItem("isLoggedIn");
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(localLoggedIn);
  const [user, setUser] = React.useState([]);
  const history = useHistory();

  const handleLogin = async (user) => {
    setIsLoading(true);
    try {
      const resp = await axios.post("login", user);
      // localStorage.setItem("User", resp.data.nama);
      await console.log(resp);
      await setIsLoading(false);
      await setLoggedIn(true);
      await alert("Berhasil Login!");
      await history.push("/");
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("isLoggedIn", true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      history.replace("/");
    }
  };

  const handleLogout = async (user) => {
    try {
      const resp = await axios.get("logout", user);
      await console.log(resp);
      localStorage.removeItem("token");
      setLoggedIn(false);
      setUser([]);
      localStorage.setItem("isLoggedIn", false);
      await alert(JSON.stringify(resp.data.message));
      await history.replace("/");
    } catch (err) {
      alert(err);
      history.replace("/");
    }
  };

  const getUser = async () => {
    // console.log("getuser is called");
    setIsLoading(true);
    if (localStorage.getItem("token") == null) {
      setLoggedIn(false);
      setIsLoading(false);
      return;
    }
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      // console.log(config);
      const resp = await axios.get("user", config);
      console.log("Berhasil login sebagai " + resp.data.data.memberType);
      localStorage.setItem("memberType", resp.data.data.memberType);
      await setIsLoading(false);
      await setLoggedIn(true);
      await localStorage.setItem("isLoggedIn", true);
      await setUser(resp.data.data);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setUser([]);
      setLoggedIn(false);
      localStorage.setItem("isLoggedIn", false);
      localStorage.removeItem("memberType");
      localStorage.removeItem("token");
    }
  };

  const refreshLayout = () => {
    getUser();
  };
  useEffect(() => {}, []);
  return (
    <>
      {isLoading && (
        <>
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        </>
      )}
      <Notifications />
      {isLoggedIn && <Navigation handleLogout={handleLogout} />}
      <Box component="main" className={classes.wrapper}>
        <Box className={classes.spacer} />
        <Box className={classes.content}>
          <Content
            user={user}
            isLoggedIn={isLoggedIn}
            refreshLayout={refreshLayout}
            handleLogin={handleLogin}
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
