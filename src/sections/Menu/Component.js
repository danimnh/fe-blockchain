import React from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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
  const [openPending, setOpenPending] = React.useState(false);
  const [openConfirmed, setOpenConfirmed] = React.useState(false);

  const handleClickPending = () => {
    setOpenPending(!openPending);
  };
  const handleClickConfirmed = () => {
    setOpenConfirmed(!openConfirmed);
  };
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
        <StyledMenuItem onClick={handleClickPending}>
          <ListItemText primary="Transaksi Tertunda" />
          {openPending ? <ExpandLess /> : <ExpandMore />}
        </StyledMenuItem>
        <Collapse in={openPending} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              className={classes.nested}
              button
              onClick={onClose}
              component={RouterLink}
              to="/transactions/pending/Inbox"
            >
              <ListItemText primary="Kotak Masuk" />
            </ListItem>
            <ListItem
              className={classes.nested}
              button
              onClick={onClose}
              component={RouterLink}
              to="/transactions/pending/Sent"
            >
              <ListItemText primary="Terkirim" />
            </ListItem>
          </List>
        </Collapse>
        <StyledMenuItem onClick={handleClickConfirmed}>
          <ListItemText primary="Transaksi Terkonfirmasi" />
          {openConfirmed ? <ExpandLess /> : <ExpandMore />}
        </StyledMenuItem>
        <Collapse in={openConfirmed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              className={classes.nested}
              button
              onClick={onClose}
              component={RouterLink}
              to="/transactions/confirmed/Inbox"
            >
              <ListItemText primary="Kotak Masuk" />
            </ListItem>
            <ListItem
              className={classes.nested}
              button
              onClick={onClose}
              component={RouterLink}
              to="/transactions/confirmed/Sent"
            >
              <ListItemText primary="Terkirim" />
            </ListItem>
          </List>
        </Collapse>
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
