import React, { useState } from "react";

import AppBar from "sections/AppBar";
import Menu from "sections/Menu";
import Notification from "sections/Notification";

function Navigation(handleLogout) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  // const handleLogouts = props.handleLogout;
  // console.log(handleLogout);
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleNotifOpen = () => {
    setIsNotifOpen(true);
  };

  const handleNotifClose = () => {
    setIsNotifOpen(false);
  };
  return (
    <>
      <Notification
        isOpen={isNotifOpen}
        onOpen={handleNotifOpen}
        onClose={handleNotifClose}
      />
      <Menu
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        onOpen={handleMenuOpen}
        props={handleLogout}
      />
      <AppBar
        isMenuOpen={isMenuOpen}
        onMenuOpen={handleMenuOpen}
        onNotifOpen={handleNotifOpen}
        props={handleLogout}
      />
    </>
  );
}

export default Navigation;
