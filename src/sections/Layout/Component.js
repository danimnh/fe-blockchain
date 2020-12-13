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
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState();
  const history = useHistory();

  const handleLogin = async (user) => {
    setIsLoading(true);
    axios
      .post("login", user)
      .then((res) => {
        setIsLoading(false);
        alert("Berhasil Login!");
        history.push("/");
        console.log(res);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
        history.replace("/");
      });
  };

  const handleLogout = async (user) => {
    setLoggedIn(false);
    setUser("");
    axios
      .get("logout", user)
      .then((res) => {
        console.log(res.data);
        alert(JSON.stringify(res.data.message));
        history.push("/");
        localStorage.removeItem("token");
        setLoggedIn(false);
        setUser(null);
      })
      .catch((err) => {
        alert(err);
        history.replace("/");
      });

    history.replace("/");
  };
  const getUser = async () => {
    console.log("getuser is called");
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      console.log(config);
      const resp = await axios.get("user", config);
      // localStorage.setItem("User", resp.data.nama);
      console.log(resp);
      setLoggedIn(true);
      setUser(resp.data.data.nama);
    } catch (err) {
      console.log(err);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
