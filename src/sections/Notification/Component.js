import React from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

// import { FaHome as WelcomeIcon } from "react-icons/fa";

import { isMobile } from "utils";

import useStyles from "./styles";

const StyledMenuItem = withStyles({ root: { width: "100%" } })((props) => (
  <MenuItem {...props} />
));

function Notification({ isOpen, onClose, onOpen, notif }) {
  const classes = useStyles({
    isOpen,
    isMobile,
  });
  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      swipeAreaWidth={30}
      disableBackdropTransition={true}
    >
      <List className={classes.list}>
        <div className={classes.toolbar} />
        <StyledMenuItem
          disabled
          onClick={() => console.log(notif)}
          component={RouterLink}
        >
          <ListItemText primary="Notifikasi" />
        </StyledMenuItem>

        <StyledMenuItem
          dense
          gutters
          className={classes.notifCardNew}
          onClick={onClose}
          component={RouterLink}
        >
          <ListItemText primary="Pengiriman dari #123456" />
          <ListItemText secondary="12/10/2020 13:56" />
          {/* <ListItemText primary="lihat detail >>" /> */}
        </StyledMenuItem>
      </List>
    </SwipeableDrawer>
  );
}

export default Notification;
