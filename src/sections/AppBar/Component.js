import React from "react";

import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DividerMU from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

import { FaRedo as RedoIcon, FaBars as MenuIcon } from "react-icons/fa";

import Link from "components/Link";

import useSW from "store/sw";

import { title } from "config";

import useStyles from "./styles";

const Divider = withStyles({
  root: {
    "margin-left": 7,
    "margin-right": 7,
  },
})((props) => <DividerMU flexItem orientation="vertical" {...props} />);

function AppBar_({ onMenuOpen, handleListItemClick }) {
  const classes = useStyles();
  const [swState, swActions] = useSW();

  function handleAppUpdate() {
    swActions.update();
  }

  return (
    <AppBar
      position="absolute"
      className={classes.appBar}
      color="transparent"
      elevation={1}
    >
      <Toolbar className={classes.toolbar}>
        <Box display="flex" className={classes.main}>
          <IconButton edge="start" aria-label="open menu" onClick={onMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Button
              onClick={() => {
                handleListItemClick(0);
              }}
              aria-label="go to home"
              className={classes.title}
            >
              {title}
            </Button>
          </Link>
        </Box>
        <Box display="flex">
          {swState.isUpdated && (
            <>
              <Tooltip
                title="The application has newer version; press to update"
                arrow
              >
                <IconButton
                  aria-label="update the application"
                  color="secondary"
                  onClick={handleAppUpdate}
                >
                  <RedoIcon />
                </IconButton>
              </Tooltip>
              <Divider />
            </>
          )}

          <Divider />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppBar_;
