import React, { useState } from "react";

import AppBar from "sections/AppBar";
import Menu from "sections/Menu";
import Notification from "sections/Notification";

function Navigation(handleLogout, dialogLogout) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (index) => {
    handleMenuClose();
    setSelectedIndex(index);
  };

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
        selectedIndex={selectedIndex}
        handleListItemClick={handleListItemClick}
        dialogLogout={dialogLogout}
        onClose={handleMenuClose}
        onOpen={handleMenuOpen}
        props={handleLogout}
      />
      <AppBar
        isMenuOpen={isMenuOpen}
        selectedIndex={selectedIndex}
        onMenuOpen={handleMenuOpen}
        onNotifOpen={handleNotifOpen}
        handleListItemClick={handleListItemClick}
        props={handleLogout}
      />
    </>
  );
}

export default Navigation;
