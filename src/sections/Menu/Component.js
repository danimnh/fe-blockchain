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

function Menu({ isOpen, onClose, onOpen, props }) {
  const classes = useStyles({
    isOpen,
    isMobile,
  });

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      swipeAreaWidth={30}
      disableBackdropTransition={true}
    >
      <List className={classes.list}>
        <div className={classes.toolbar} />
        <StyledMenuItem onClick={onClose} component={RouterLink} to="/">
          {/* <ListItemIcon>
            <WelcomeIcon />
          </ListItemIcon> */}
          <ListItemText primary="Halaman Utama" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={onClose}
          component={RouterLink}
          to="/create_transaction"
        >
          <ListItemText primary="Tambah Transaksi" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={onClose}
          component={RouterLink}
          to="/read_pending_transaction"
        >
          <ListItemText primary="Lihat Transaksi Masuk" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={(onClose, props.handleLogout)}
          component={RouterLink}
          to="/"
        >
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </List>
    </SwipeableDrawer>
  );
}

export default Menu;
