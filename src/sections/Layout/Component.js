import React, { useEffect } from "react";
import axios from "axios";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";

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
  const [logoutVisible, setLogoutVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(localLoggedIn);
  const [user, setUser] = React.useState([]);
  const history = useHistory();

  const handleLogin = async (user) => {
    setIsLoading(true);
    console.log(user);
    try {
      const resp = await axios.post("login", user);
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

  const handleSignUp = async (value) => {
    setIsLoading(true);
    try {
      const resp = await axios.post("register", value);
      await console.log(resp);
      await setIsLoading(false);

      localStorage.setItem("token", resp.message.token);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const dialogLogout = async () => {
    setLogoutVisible(true);
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
      setLogoutVisible(false);
    } catch (err) {
      alert(err);
      history.replace("/");
      setLogoutVisible(false);
    }
  };

  const getUser = async () => {
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
      const resp = await axios.get("user", config);
      console.log("Berhasil login sebagai " + resp.data.data.orgName);
      localStorage.setItem("orgName", resp.data.data.orgName);
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
      localStorage.removeItem("orgName");
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
      {isLoggedIn && (
        <Navigation
          handleLogout={handleLogout}
          dialogLogout={dialogLogout}
          user={user}
        />
      )}
      <Box component="main" className={classes.wrapper}>
        <Box className={classes.spacer} />
        <Box className={classes.content}>
          <Content
            user={user}
            isLoggedIn={isLoggedIn}
            refreshLayout={refreshLayout}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
          />
          <Copyright />
        </Box>
      </Box>

      <Dialog
        open={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Keluar dari Sistem Rantai Pasok?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Keluar dari Sistem Rantai Pasok?
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button variant="outlined" onClick={() => setLogoutVisible(false)}>
            Batal
          </Button>
          <Button variant="outlined" onClick={() => handleLogout()} autoFocus>
            Keluar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Layout;
